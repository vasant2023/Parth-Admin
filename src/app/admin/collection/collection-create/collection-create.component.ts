import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
// import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { Router, ActivatedRoute } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpEventType,
} from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { ToastrService } from "ngx-toastr";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { Observable } from "rxjs";
import { map, catchError, tap, ignoreElements } from "rxjs/operators";
import { Response } from "selenium-webdriver/http";
// import { element } from '@angular/core/src/render3';
import { environment } from "../../../../environments/environment";
import swal from "sweetalert2";
import { DragulaService } from "ng2-dragula";


@Component({
  selector: 'app-collection-create',
  templateUrl: './collection-create.component.html',
  styleUrls: ['./collection-create.component.css']
})
export class CollectionCreateComponent implements OnInit {

  collectionObj:any = {
    collection: "",
    title: "",
    tags: "",
    price: "",
    sale_price: "",
    label: "",
    label_from: "",
    label_to: "",
    description: "",
    short_description: "",
    items: [],
    warranty_detail: "",
    meta_description: "",
    meta_keywords: "",
    banner_image: (File = null),
    banner_image_mobile: (File = null),
    brochure: (File = null),
    collection_images: (File = null),
    sort_order: "",
    status: "",
    warranty_time: "",
    tag_line : "",
    warranty_duration : "",
    category_ID: ""
  }
  collection_ID = "";


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private http: HttpClient,
    private dragulaService: DragulaService
  ) { }

  collectionForm : FormGroup;

  isLoading = false;
  itemList :any = []

  ngOnInit() {
    this.getCollectionID();
    this.collectionDetails();
    this.getAllItems();
  }

  handleInputChangeBannerImage(event) {
    this.collectionObj.banner_image = event.target.files[0];
  }

  handleInputChangeMobileImage(event){
    this.collectionObj.banner_image_mobile = event.target.files[0];
  }

  item_images(event){
    this.collectionObj.collection_images = event.target.files[0];
  }

  brochure(event){
    this.collectionObj.brochure = event.target.files[0];
  }

  getCollectionID(){
    this.collection_ID = this.route.snapshot.params["collection_ID"]
      ? this.route.snapshot.params["collection_ID"]
      : "";

  }

  getAllItems(){
    this.adminService.getItems().subscribe((response :{success: number, message: string, items:[]}) => {
      if(response.success == 1) {
        this.itemList = response.items;
      }
    })
  }

  collectionDetails(){
    this.adminService
      .collectionDetails(this.collection_ID)
      .subscribe(
        (response: { success: number; message: string; collection: [] }) => {
          if (response.success == 1) {
            this.collectionObj = response.collection;
          }
        }
      );
  }

  saveCollection(){
    let formData = new FormData();
    formData.append("apiId", environment.apiId);
    formData.append("from_app", "true");
    formData.append("collection", this.collectionObj.collection);
    formData.append("title", this.collectionObj.title);
    formData.append("tags", this.collectionObj.tags);
    formData.append("price", this.collectionObj.price);
    formData.append("sale_price", this.collectionObj.sale_price);
    formData.append("label", this.collectionObj.label);
    formData.append("label_from", this.collectionObj.label_from);
    formData.append("label_to", this.collectionObj.label_to);
    formData.append("description", this.collectionObj.description);
    formData.append("short_description", this.collectionObj.short_description);
    formData.append("items", JSON.stringify(this.collectionObj.items));
    formData.append("warranty_detail", this.collectionObj.warranty_detail);
    formData.append("meta_description", this.collectionObj.meta_description);
    formData.append("meta_keywords", this.collectionObj.meta_keywords);
    formData.append("banner_image", this.collectionObj.banner_image);
    formData.append("banner_image_mobile", this.collectionObj.banner_image_mobile);
    formData.append("brochure", this.collectionObj.brochure);
    formData.append("collection_images", this.collectionObj.collection_images);
    formData.append("image_alttext", this.collectionObj.image_alttext);
    formData.append("sort_order", this.collectionObj.sort_order);
    formData.append("tag_line", this.collectionObj.tag_line);
    formData.append("status", this.collectionObj.status);
    formData.append("warranty_time", this.collectionObj.warranty_time);
    formData.append("warranty_duration", this.collectionObj.warranty_duration);
    formData.append("category_ID", this.collectionObj.category_ID);

    if (this.collection_ID) {
      formData.append("collection_ID", this.collection_ID);
      this.adminService
        .updateCollection(formData)
        .subscribe((response: { success: number; message: string }) => {
          if (response.success == 1) {
            this.router.navigate(["admin/collections"]);
          }
        });
    } else {
      this.adminService
        .createCollection(formData)
        .subscribe((response: { success: number; message: string }) => {
          if (response.success == 1) {
            this.router.navigate(["admin/collections"]);
          }
        });
    }
  }

  


}
