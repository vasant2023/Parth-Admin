import { Component, OnInit } from '@angular/core';
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
} from "@angular/router";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AdminServiceService } from "src/app/admin-service.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private loaderService: Ng4LoadingSpinnerService
  ) { }

  userObj:any = {
    first_name:"",
    last_name:"",
    email:"",
    user_id:"",
    profile_pic:""
  }

  isLoading = false
  updateUserform: FormGroup;


  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails(){
    this.adminService.getLoggedInUser().subscribe((response) => {
      this.userObj = response;
      // console.log(this.userObj, "Checking response")
    });
  }

  handleInputChange(event){
    this.userObj.profile_pic = event.target.files[0];
  }

  updateProfile(){
    this.isLoading = false;
    if(this.isLoading == false){
      this.isLoading = true;
      let formData = new FormData();
      formData.append("apiId", environment.apiId);
      formData.append("first_name", this.userObj.first_name);
      formData.append("last_name", this.userObj.last_name);
      formData.append("email", this.userObj.email);
      formData.append("user_id", this.userObj.user_id);
      formData.append("profile_pic", this.userObj.profile_pic);

      this.adminService.updateProfile(formData).subscribe((response: {success:number, message:string}) => {
        if(response.success == 1){
          this.adminService.setObjservableUser(JSON.stringify(this.userObj));
          this.toastr.success(response.message, "success", {});
          this.router.navigate(['admin']);
        } else {
          this.toastr.error(response.message, "error", {});
        }
        this.isLoading = false;

      })
    }
    
  }

}
