import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from 'src/app/admin-service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-laminate-create',
  templateUrl: './laminate-create.component.html',
  styleUrls: ['./laminate-create.component.css']
})
export class LaminateCreateComponent implements OnInit {

  createLaminateForm : FormGroup

  laminateObj :any = {
    laminate : "",
    description : "",
    brand_ID : "",
    color : "",
    size : "",
    stock : "",
    laminate_code : "",
    finishes : "",
    thickness : "",
    price : "",
    status : "",
    image : "",
  }

  laminate_ID = "";

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private http: HttpClient,
    public adminService: AdminServiceService,
  ) { }

  ngOnInit() {
    this.getLaminateId();
    this.laminateDetail();
  }


  handleInputChange(event) {
    this.laminateObj.image = event.target.files[0];
  }

  getLaminateId(){
    this.laminate_ID = this.route.snapshot.params['laminate_ID'] ? this.route.snapshot.params['laminate_ID'] : "";
  }

  laminateDetail(){
    this.adminService.laminateDetail(this.laminate_ID).subscribe((response : {success: number, message: string, laminate : []}) => {
      if(response.success == 1) {
        this.laminateObj = response.laminate;
      }
    })
  }

  submitLaminate(){
    let formData = new FormData();
      formData.append('apiId', environment.apiId);
      formData.append('from_app', "true");
      formData.append('laminate', this.laminateObj.laminate);
      formData.append('description', this.laminateObj.description);
      formData.append('brand_ID', this.laminateObj.brand_ID);
      formData.append('color', this.laminateObj.color);
      formData.append('size', this.laminateObj.size);
      formData.append('stock', this.laminateObj.stock);
      formData.append('laminate_code', this.laminateObj.laminate_code);
      formData.append('finishes', this.laminateObj.finishes);
      formData.append('thickness', this.laminateObj.thickness);
      formData.append('price', this.laminateObj.price);
      formData.append('status', this.laminateObj.status);
      formData.append('image', this.laminateObj.image, this.laminateObj.image.name);
    if(this.laminate_ID){
      formData.append('laminate_ID', this.laminate_ID);
      this.adminService.updateLaminate(formData).subscribe((response : {success: number, message: string}) => {
        if(response.success == 1){
          this.router.navigate(['admin/laminates']);
        }
      })
    } else {
      this.adminService.createLaminate(formData).subscribe((response : {success: number, message: string}) => {
        if(response.success == 1){
          this.router.navigate(['admin/laminates']);
        }
      })
    }
  }

}
