import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminServiceService } from "src/app/admin-service.service";
import { environment } from "src/environments/environment";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";

@Component({
  selector: 'app-add-blogs',
  templateUrl: './add-blogs.component.html',
  styleUrls: ['./add-blogs.component.css']
})
export class AddBlogsComponent implements OnInit {

  blogObj: any = {
    title: "",
    description: "",
    meta_title: "",
    meta_description: "",
    meta_keywords:"",
    sort_order:"",
    status:"",
    banner_image:"",
    blog_image:""
  };

  blog_ID = "";
  
  public isLoading:boolean = false;

  createBlogForm: FormGroup;

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
  ) { }

  ngOnInit() {
    this.getBlogId();
    this.blogDetails();
  }

  public onChange({ editor }: ChangeEvent) {
    this.blogObj.description = editor.getData();
  }

  getBlogId() {
    this.blog_ID = this.route.snapshot.params["blog_ID"]
      ? this.route.snapshot.params["blog_ID"]
      : "";
  }

  blogDetails() {
    if(this.blog_ID){
      this.adminService
      .blogDetails(this.blog_ID)
      .subscribe(
        (response: { success: number; message: string; blog: {} }) => {
          if (response.success == 1) {
            this.blogObj = response.blog;
            if(this.blogObj.banner_image){
              this.blogObj.banner_view = this.blogObj.banner_image;
            }

            if(this.blogObj.blog_image){
              this.blogObj.blog_image_view = this.blogObj.blog_image;
            }
          }
        }
      );
    }
  }

  submitBlog(){
    if(this.isLoading == false){
      this.isLoading = true;
      
      let formData = new FormData();
      formData.append("apiId", environment.apiId);
      formData.append("from_app", "true");
      formData.append("title", this.blogObj.title);
      formData.append("description", this.blogObj.description);
      formData.append("meta_title", this.blogObj.meta_title);
      formData.append("meta_description", this.blogObj.meta_description);
      formData.append("meta_keywords", this.blogObj.meta_keywords);
      formData.append("sort_order", this.blogObj.sort_order);
      formData.append("status", this.blogObj.status);
      formData.append("banner_image", this.blogObj.banner_image);
      formData.append("blog_image", this.blogObj.blog_image);

      if(this.blog_ID){
        formData.append("blog_ID", this.blog_ID);
      }

      this.adminService.createBlog(formData).subscribe((response:{success:number, message:string}) => {
        if (response.success == 1) {
          this.router.navigate(["admin/blogs"]);
        }
        this.isLoading = false;
      })
    }
  }

  handleBannerImage(event){
    this.blogObj.banner_image = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.blogObj.banner_view = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  handleBlogImage(event){
    this.blogObj.blog_image = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.blogObj.blog_image_view = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
