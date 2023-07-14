import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from 'src/app/admin-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {

  brandObj:any = {
    brand: "",
    description: "",
    logo: "",
    status: ""
  }

  brand_ID = "";

  createBrandForm : FormGroup;

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private http: HttpClient,
    public adminService: AdminServiceService,
  ) { }

  ngOnInit() {
    this.getBrandId();
    this.brandDetails();
  }

  handleInputChange(event) {
    this.brandObj.logo = event.target.files[0];
  }

  getBrandId(){
    this.brand_ID = this.route.snapshot.params['brand_ID'] ? this.route.snapshot.params['brand_ID'] : "";
  }

  brandDetails(){
    this.adminService.brandDetails(this.brand_ID).subscribe((response : {success: number, message: string, brand : []}) => {
      if(response.success == 1) {
        this.brandObj = response.brand;
      }
    })
  }

  submitBrand(){
    if(this.brand_ID){
      let formData = new FormData();
      formData.append('apiId', environment.apiId);
      formData.append('from_app', "true");
      formData.append('brand', this.brandObj.brand);
      formData.append('description', this.brandObj.description);
      formData.append('status', this.brandObj.status);
      formData.append('logo', this.brandObj.logo);
      formData.append('brand_ID', this.brand_ID);
      this.adminService.updateBrand(formData).subscribe((response : {success: number, message: string}) => {
        if(response.success == 1){
          this.router.navigate(['admin/brand']);
        }
      })
    } else {
      let formData = new FormData();
      formData.append('apiId', environment.apiId);
      formData.append('from_app', "true");
      formData.append('brand', this.brandObj.brand);
      formData.append('description', this.brandObj.description);
      formData.append('status', this.brandObj.status);
      formData.append('logo', this.brandObj.logo, this.brandObj.logo.name);
      this.adminService.createBrand(formData).subscribe((response : {success: number, message: string}) => {
        if(response.success == 1){
          this.router.navigate(['admin/brand']);
        }
      })
    }
  }
}
