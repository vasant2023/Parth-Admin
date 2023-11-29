import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-banners',
  templateUrl: './list-banners.component.html',
  styleUrls: ['./list-banners.component.css']
})
export class ListBannersComponent implements OnInit {

  searchText = "";
  public isLoading: boolean = false;
  p:number = 1;

  constructor(
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private loaderService: Ng4LoadingSpinnerService,
    private dragulaService: DragulaService
  ) { }

  ngOnInit() {
    this.getBanners();
  }

  bannerList:any = [];

  getBanners(){
    this.isLoading = true;
    this.loaderService.show();
    this.adminService.getBanners().subscribe((response:any) => {
      if(response.success == 1){
        this.bannerList = response.banners;
        console.log(this.bannerList);
        
      }
      this.isLoading = false
    })
  }

  deleteBanner(banner_id){
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        this.adminService
          .deleteBanner(banner_id)
          .pipe()
          .subscribe(
            (res) => {
              var responseData = JSON.parse(JSON.stringify(res));
              if (responseData.success) {
                Swal.fire("Deleted!", responseData.message, "success");
                this.getBanners();
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
