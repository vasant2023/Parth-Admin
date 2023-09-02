import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: "app-brand-list",
  templateUrl: "./brand-list.component.html",
  styleUrls: ["./brand-list.component.css"],
})
export class BrandListComponent implements OnInit {
  searchText = "";
  isloading: boolean;
  p:number = 1;
  
  constructor(
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private loaderService: Ng4LoadingSpinnerService,
    private dragulaService: DragulaService
  ) {}

  ngOnInit() {
    this.getBrands();
  }

  brand_List: any = [];

  getBrands() {
    this.isloading = true;
    this.loaderService.show();
    this.adminService
      .getBrands()
      .subscribe(
        (response: { success: number; message: string; brands: [] }) => {
          if (response.success == 1) {
            this.brand_List = response.brands;
            this.loaderService.hide();
          } else {
            this.toastr.error(response.message, "Error", {});
            this.loaderService.hide();
          }
        }
      );
  }

  deleteBrand(brand_ID) {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        this.adminService
          .deleteBrand(brand_ID)
          .pipe()
          .subscribe(
            (res) => {
              var responseData = JSON.parse(JSON.stringify(res));
              if (responseData.success) {
                Swal.fire("Deleted!", responseData.message, "success");
                this.getBrands();
              } else {
                console.log(responseData.message);
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
  }
}
