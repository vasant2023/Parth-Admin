import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AdminServiceService } from '../../../admin-service.service';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-colletion-category-create',
  templateUrl: './colletion-category-create.component.html',
  styleUrls: ['./colletion-category-create.component.css']
})
export class ColletionCategoryCreateComponent implements OnInit {

  categoryObj: any = {
    category: "",
    title: "",
    sub_title: "",
    short_description: "",
    description: "",
    tags: "",
    meta_description: "",
    meta_keywords: "",
    parent_category: "",
    sort_order: "",
    status: "",
    category_icon_file: File = null,
    category_banner_file: File = null,
    category_ID: ""
  }

  nestedCollectionCategory: any = []
  category_ID = "";
  isLoading = false;

  createCategoryForm: FormGroup;

  configEditor = {
    removeButtons: 'Print,Preview,NewPage,Source,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,ImageButton,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About,FontSize,Image',
    toolbarGroups: [
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'styles', groups: ['styles'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks'] },
      '/',
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'paragraph', groups: ['align', 'bidi', 'paragraph'] },
      { name: 'forms', groups: ['forms'] },
      { name: 'links', groups: ['links'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'insert', groups: ['insert'] },
      '/',
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'about', groups: ['about'] }
    ]
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public adminService: AdminServiceService,
  ) { }

  ngOnInit() {
    this.getCategoryId();
    this.categoryDetails();
    this.nestedCollectionCategoryList();
  }

  public onChange({ editor }: ChangeEvent) {
    this.categoryObj.description = editor.getData();
  }

  handleInputChange(event) {
    this.categoryObj.category_icon_file = event.target.files[0];
  }

  handleInputChangeBanner(event) {
    this.categoryObj.category_banner_file = event.target.files[0];
  }

  getCategoryId() {
    this.category_ID = this.route.snapshot.params['category_ID'] ? this.route.snapshot.params['category_ID'] : "";
  }

  nestedCollectionCategoryList() {
    this.adminService.nestedCategoryList().subscribe((response: { success: number, message: string, categories: [] }) => {
      if (response.success == 1) {
        this.nestedCollectionCategory = response.categories;
        console.log(this.nestedCollectionCategory)
      }
    })
  }

  categoryDetails() {
    this.adminService.categoryDetails(this.category_ID).subscribe((response: { success: number, message: string, category: any }) => {
      if (response.success == 1) {
        this.categoryObj = response.category;
        this.categoryObj.parent_category = response.category.parent_category;
      } else {
        // alert(response.message);
      }
    })
  }

  submitCategory() {
    if (this.isLoading == false) {
      this.isLoading = true;

      let formData = new FormData();
      formData.append('apiId', environment.apiId);
      formData.append('from_app', "true");
      formData.append('category', this.categoryObj.category);
      formData.append('title', this.categoryObj.title);
      formData.append('sub_title', this.categoryObj.sub_title);
      formData.append('short_description', this.categoryObj.short_description);
      formData.append('description', this.categoryObj.description);
      formData.append('meta_description', this.categoryObj.meta_description);
      formData.append('tags', this.categoryObj.tags);
      formData.append('meta_keywords', this.categoryObj.meta_keywords);
      formData.append('parent_category', this.categoryObj.parent_category);
      formData.append('sort_order', this.categoryObj.sort_order);
      formData.append('status', this.categoryObj.status);
      formData.append('category_ID', this.category_ID);
      formData.append('category_icon_file', this.categoryObj.category_icon_file);
      formData.append('category_banner_file', this.categoryObj.category_banner_file);
      formData.append('type', 'collection');

      if (this.category_ID) {
        formData.append('category_ID', this.category_ID);
        this.adminService.updateCategory(formData).subscribe((response: { success: number, message: string }) => {
          if (response.success == 1) {
            this.router.navigate(['admin/collections-category']);
          }
          this.isLoading = false;

        })
      } else {
        // console.log(formData)
        this.adminService.createCategory(formData).subscribe((response: { success: number, message: string, category: [] }) => {
          if (response.success == 1) {
            this.router.navigate(['admin/collections-category']);
          }
          this.isLoading = false;

        })
      }
    }

  }

}
