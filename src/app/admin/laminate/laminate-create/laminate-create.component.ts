import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminServiceService } from "src/app/admin-service.service";
import { environment } from "src/environments/environment";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";

@Component({
  selector: "app-laminate-create",
  templateUrl: "./laminate-create.component.html",
  styleUrls: ["./laminate-create.component.css"],
})
export class LaminateCreateComponent implements OnInit {
  createLaminateForm: FormGroup;

  laminateObj: any = {
    laminate: "",
    description: "",
    brand_ID: "",
    color: "",
    size: "",
    stock: "",
    laminate_code: "",
    finishes: "",
    thickness: "",
    price: "",
    status: "",
    image: "",
  };

  laminate_ID = "";

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

  public isLoading:boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public adminService: AdminServiceService
  ) {}

  ngOnInit() {
    this.getLaminateId();
    this.laminateDetail();
  }

  public onChange({ editor }: ChangeEvent) {
    this.laminateObj.description = editor.getData();
  }

  handleInputChange(event) {
    this.laminateObj.image = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.laminateObj.image_view = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getLaminateId() {
    this.laminate_ID = this.route.snapshot.params["laminate_ID"]
      ? this.route.snapshot.params["laminate_ID"]
      : "";
  }

  laminateDetail() {
    if(this.laminate_ID){
      this.adminService
        .laminateDetail(this.laminate_ID)
        .subscribe(
          (response: { success: number; message: string; laminate: [] }) => {
            if (response.success == 1) {
              this.laminateObj = response.laminate;
            }
          }
        );
    }
  }

  submitLaminate() {
    if (this.isLoading == false) {
      this.isLoading = true;
      let formData = new FormData();
      formData.append("apiId", environment.apiId);
      formData.append("from_app", "true");
      formData.append("laminate", this.laminateObj.laminate);
      formData.append("description", this.laminateObj.description);
      formData.append("brand_ID", this.laminateObj.brand_ID);
      formData.append("color", this.laminateObj.color);
      formData.append("size", this.laminateObj.size);
      formData.append("stock", this.laminateObj.stock);
      formData.append("laminate_code", this.laminateObj.laminate_code);
      formData.append("finishes", this.laminateObj.finishes);
      formData.append("thickness", this.laminateObj.thickness);
      formData.append("price", this.laminateObj.price);
      formData.append("status", this.laminateObj.status);
      formData.append(
        "image",
        this.laminateObj.image,
      );
      if (this.laminate_ID) {
        formData.append("laminate_ID", this.laminate_ID);
        this.adminService
          .updateLaminate(formData)
          .subscribe((response: { success: number; message: string }) => {
            if (response.success == 1) {
              this.router.navigate(["admin/laminates"]);
            }
            this.isLoading = false;

          });
      } else {
        this.adminService
          .createLaminate(formData)
          .subscribe((response: { success: number; message: string }) => {
            if (response.success == 1) {
              this.router.navigate(["admin/laminates"]);
            }
            this.isLoading = false;

          });
      }
    }
  }
}
