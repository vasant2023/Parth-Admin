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
} from "@angular/router";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AdminServiceService } from "src/app/admin-service.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

@Component({
  selector: "app-adminlogin",
  templateUrl: "./adminlogin.component.html",
  styleUrls: ["./adminlogin.component.css"],
})
export class AdminloginComponent implements OnInit {
  loginForm: FormGroup;
  forgotForm: FormGroup;
  submitted: boolean = false;
  toggleFormFlag: boolean = true;
  invalidLogin: boolean = false;
  loginReponse: {};
  isLoading = false;

  readonly apiUrl = environment.apiUrl;
  readonly apiId = environment.apiId;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private loaderService: Ng4LoadingSpinnerService
  ) {
    // if(localStorage.getItem('AdminLoggedInId')){
    //   this.router.navigate(['admin']);
    // }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        ),
      ]),
      password: ["", Validators.required],
    });

    this.forgotForm = this.formBuilder.group({
      email: ["", Validators.required],
    });
  }

  toggleForm() {
    if (this.toggleFormFlag) {
      this.toggleFormFlag = false;
    } else {
      this.toggleFormFlag = true;
    }
  }
  public loginObj = {
    email: "",
    password: "",
  };

  submitLogin() {
    if (this.isLoading == false) {
      this.isLoading = true;
      this.loaderService.show();
      this.adminService
        .adminSignIn(this.loginObj)
        .subscribe(
          (response: { success: number; message: string; user: [] }) => {
            if (response.success == 1) {
              this.adminService.setObjservableUser(
                JSON.stringify(response.user)
              );
              this.router.navigate(["/admin"]);
              this.loaderService.hide();
              this.toastr.success(response.message, "success", {});
            } else {
              this.toastr.error(response.message, "error", {});
              this.loaderService.hide();
            }
            this.isLoading = false;
          }
        );

    }
  }

  passwordForm(data2) {
    console.log(data2);
  }
}
