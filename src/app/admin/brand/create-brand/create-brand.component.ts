import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminServiceService } from "src/app/admin-service.service";
import { environment } from "src/environments/environment";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";

@Component({
  selector: "app-create-brand",
  templateUrl: "./create-brand.component.html",
  styleUrls: ["./create-brand.component.css"],
})
export class CreateBrandComponent implements OnInit {
  brandObj: any = {
    brand: "",
    description: "",
    logo: "",
    status: "",
  };

  brand_ID = "";
  isLoading = false;

  createBrandForm: FormGroup;

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
    this.getBrandId();
    this.brandDetails();
  }

  public onChange({ editor }: ChangeEvent) {
    this.brandObj.description = editor.getData();
  }

  handleInputChange(event) {
    this.brandObj.logo = event.target.files[0];
  }

  getBrandId() {
    this.brand_ID = this.route.snapshot.params["brand_ID"]
      ? this.route.snapshot.params["brand_ID"]
      : "";
  }

  brandDetails() {
    this.adminService
      .brandDetails(this.brand_ID)
      .subscribe(
        (response: { success: number; message: string; brand: [] }) => {
          if (response.success == 1) {
            this.brandObj = response.brand;
          }
        }
      );
  }

  submitBrand() {
    if (this.isLoading == false) {
      this.isLoading = true;

      if (this.brand_ID) {
        let formData = new FormData();
        formData.append("apiId", environment.apiId);
        formData.append("from_app", "true");
        formData.append("brand", this.brandObj.brand);
        formData.append("description", this.brandObj.description);
        formData.append("status", this.brandObj.status);
        formData.append("logo", this.brandObj.logo);
        formData.append("brand_ID", this.brand_ID);
        this.adminService
          .updateBrand(formData)
          .subscribe((response: { success: number; message: string }) => {
            if (response.success == 1) {
              this.router.navigate(["admin/brand"]);
            }
            this.isLoading = false;

          });
      } else {
        let formData = new FormData();
        formData.append("apiId", environment.apiId);
        formData.append("from_app", "true");
        formData.append("brand", this.brandObj.brand);
        formData.append("description", this.brandObj.description);
        formData.append("status", this.brandObj.status);
        formData.append("logo", this.brandObj.logo, this.brandObj.logo.name);
        this.adminService
          .createBrand(formData)
          .subscribe((response: { success: number; message: string }) => {
            if (response.success == 1) {
              this.router.navigate(["admin/brand"]);
            }
            this.isLoading = false;

          });
      }
    }
  }
}
