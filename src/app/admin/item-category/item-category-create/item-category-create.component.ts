import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
} from "@angular/router";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { resolve } from "url";
import { environment } from "src/environments/environment";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";

@Component({
  selector: "app-item-category-create",
  templateUrl: "./item-category-create.component.html",
  styleUrls: ["./item-category-create.component.css"],
})
export class ItemCategoryCreateComponent implements OnInit {
  categoryObj: any = {
    category: "",
    title: "",
    sub_title: "",
    short_description: "",
    description: "",
    tagList: [],
    meta_description: "",
    meta_keywords: "",
    parent_category: "",
    sort_order: "",
    status: "",
    category_icon_file: (File = null),
    category_banner_file: (File = null),
    category_ID: "",
  };

  nestedCategory: any = [];
  category_ID = "";
  public isLoading:boolean = false;

  createCategoryForm: FormGroup;

  configEditor = {
    removeButtons:
      "Print,Preview,NewPage,Source,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,ImageButton,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About,FontSize,Image",
    toolbarGroups: [
      { name: "document", groups: ["mode", "document", "doctools"] },
      {
        name: "editing",
        groups: ["find", "selection", "spellchecker", "editing"],
      },
      { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
      { name: "styles", groups: ["styles"] },
      { name: "paragraph", groups: ["list", "indent", "blocks"] },
      "/",
      { name: "clipboard", groups: ["clipboard", "undo"] },
      { name: "paragraph", groups: ["align", "bidi", "paragraph"] },
      { name: "forms", groups: ["forms"] },
      { name: "links", groups: ["links"] },
      { name: "colors", groups: ["colors"] },
      { name: "insert", groups: ["insert"] },
      "/",
      { name: "tools", groups: ["tools"] },
      { name: "others", groups: ["others"] },
      { name: "about", groups: ["about"] },
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public adminService: AdminServiceService
  ) {}

  ngOnInit() {
    this.getCategoryId();
    this.categoryDetails();
    this.nestedItemList();
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
    this.category_ID = this.route.snapshot.params["category_ID"]
      ? this.route.snapshot.params["category_ID"]
      : "";
  }

  nestedItemList() {
    this.adminService
      .nestedItemList()
      .subscribe(
        (response: { success: number; message: string; categories: [] }) => {
          if (response.success == 1) {
            this.nestedCategory = response.categories;
            console.log(this.nestedCategory);
          }
        }
      );
  }

  categoryDetails() {
    this.adminService
      .categoryDetails(this.category_ID)
      .subscribe(
        (response: { success: number; message: string; category: any }) => {
          if (response.success == 1) {
            this.categoryObj = response.category;
            this.categoryObj.parent_category = response.category.parent_category
            this.categoryObj.tagList = [];

          if (this.categoryObj.tags && this.categoryObj.tags.length > 0) { 
            this.categoryObj.tags.forEach(word => { 
              this.categoryObj.tagList.push({ 'display': word, 'value': word }); 
            }); 
          }
            
          } else {
            // alert(response.message);
          }
        }
      );
  }

  submitCategory() {
    if (this.isLoading == false) {
      this.isLoading = true;
      let formData = new FormData();
      formData.append("apiId", environment.apiId);
      formData.append("from_app", "true");
      formData.append("category", this.categoryObj.category);
      formData.append("title", this.categoryObj.title);
      formData.append("sub_title", this.categoryObj.sub_title);
      formData.append("short_description", this.categoryObj.short_description);
      formData.append("description", this.categoryObj.description);
      formData.append("meta_description", this.categoryObj.meta_description);
      var tags = [];
      this.categoryObj.tagList.forEach((singletag) => {
        // console.log(singletag)
        tags.push(singletag.value);
        // console.log(tags)
      })
      formData.append('tags', JSON.stringify(tags));
      formData.append("meta_keywords", this.categoryObj.meta_keywords);
      formData.append("parent_category", this.categoryObj.parent_category);
      formData.append("sort_order", this.categoryObj.sort_order);
      formData.append("status", this.categoryObj.status);
      formData.append("category_ID", this.category_ID);
      formData.append(
        "category_icon_file",
        this.categoryObj.category_icon_file
      );
      formData.append(
        "category_banner_file",
        this.categoryObj.category_banner_file
      );
      formData.append("type", "item");

      if (this.category_ID) {
        formData.append("category_ID", this.category_ID);
        this.adminService
          .updateCategory(formData)
          .subscribe((response: { success: number; message: string }) => {
            if (response.success == 1) {
              this.router.navigate(["admin/item-category"]);
            }
            this.isLoading = false;

          });
      } else {
        // console.log(formData)
        this.adminService
          .createCategory(formData)
          .subscribe(
            (response: { success: number; message: string; category: [] }) => {
              if (response.success == 1) {
                this.router.navigate(["admin/item-category"]);
              }
              this.isLoading = false;

            }
          );
      }
    }
  }

  setKeywords() {
    var keyword_string = [];
    if (this.categoryObj.tagList) {
      this.categoryObj.tagList.forEach(word => {
        keyword_string.push(word.display);
      });
    }
    console.log(keyword_string);
  }

}
