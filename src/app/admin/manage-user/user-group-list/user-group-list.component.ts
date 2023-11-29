import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-group-list',
  templateUrl: './user-group-list.component.html',
  styleUrls: ['./user-group-list.component.css']
})
export class UserGroupListComponent implements OnInit {

  searchText = "";
  isLoading: boolean;
  p:number = 1

  constructor(
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private loaderService: Ng4LoadingSpinnerService,
    private dragulaService: DragulaService
  ) { }

  userGroupList:any = [];


  ngOnInit() {
    this.getUserGroup();
  }
  
  getUserGroup(){
    this.isLoading = true
    this.adminService.getAllgrouptypes().subscribe((response: {success:number, message:string,users_group:[]}) => {
      if(response.success == 1){
        this.userGroupList = response.users_group;
        console.log(this.userGroupList)
        this.isLoading =false;
      } else {
        this.toastr.error(response.message, "Error", {});
        this.isLoading = false
      }
    })
  }

  deleteUserGroup(group_ID){
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        this.adminService
          .deleteUserGroup(group_ID)
          .pipe()
          .subscribe(
            (res) => {
              var responseData = JSON.parse(JSON.stringify(res));
              if (responseData.success) {
                Swal.fire("Deleted!", responseData.message, "success");
                this.getUserGroup();
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
