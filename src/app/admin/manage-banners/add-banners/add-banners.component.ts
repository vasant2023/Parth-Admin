import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminServiceService } from "src/app/admin-service.service";
import { environment } from "src/environments/environment";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";

@Component({
  selector: 'app-add-banners',
  templateUrl: './add-banners.component.html',
  styleUrls: ['./add-banners.component.css']
})
export class AddBannersComponent implements OnInit {

  bannerObj: any = {
    status: "",
    mainImage_file: "",
    mobileImage_file: "",
    sort_order: "",
    link:""
  };

  banner_id = "";
  public isLoading:boolean = false;

  createBannerForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public adminService: AdminServiceService
  ) { }

  ngOnInit() {
    this.getBannerId();
    this.getBannerDetails();
  }

  getBannerId() {
    this.banner_id = this.route.snapshot.params["banner_id"]
      ? this.route.snapshot.params["banner_id"]
      : "";
  }

  getBannerDetails(){
    this.adminService.getBannerDetails(this.banner_id).subscribe((response:any) => {
      if(response.success == 1){
        this.bannerObj = response.banner;
        console.log(this.bannerObj);
        
      }
    })
  }

  addBanner(){
    if(this.isLoading == false){
      this.isLoading = true;
      let formData = new FormData();
      
      formData.append("apiId", environment.apiId);
      formData.append("from_app", "true");
      formData.append("status", this.bannerObj.status);
      formData.append("sort_order", this.bannerObj.sort_order);
      formData.append("link", this.bannerObj.link);
      formData.append("mainImage_file", this.bannerObj.mainImage_file);
      formData.append("mobileImage_file", this.bannerObj.mobileImage_file);

      if(this.banner_id){
        formData.append("banner_id", this.banner_id);
      }

      this.adminService.addBanner(formData).subscribe((response:any) => {
        if (response.success == 1) {
          this.router.navigate(["admin/banners"]);
        }
        this.isLoading = false;
      })

    }
  }

  handleWebBanner(event) {
    this.bannerObj.mainImage_file = event.target.files[0];
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.bannerObj.mainImage = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  handleMobileBanner(event){
    this.bannerObj.mobileImage_file = event.target.files[0];
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.bannerObj.mobileImage = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
