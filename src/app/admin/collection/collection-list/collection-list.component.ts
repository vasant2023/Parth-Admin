import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  searchText = "";

  public isloading: boolean = false;
  p: number = 1;

  constructor(
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private loaderService: Ng4LoadingSpinnerService,
    private dragulaService: DragulaService
  ) { }

  ngOnInit() {
    this.getCollection();
  }

  collectionList: any = [];

  getCollection() {
    this.isloading = true;
    this.loaderService.show();
    this.adminService
      .getCollection()
      .subscribe(
        (response: { success: number; message: string; collections: [] }) => {
          if (response.success == 1) {
            this.collectionList = response.collections;
            this.loaderService.hide();
          } else {
            this.toastr.error(response.message, "Error", {});
            this.loaderService.hide();
          }
          this.isloading = false;
        }
      );
  }

  deleteCollection(collection_ID) {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        this.adminService
          .deleteCollection(collection_ID)
          .pipe()
          .subscribe(
            (res) => {
              var responseData = JSON.parse(JSON.stringify(res));
              if (responseData.success) {
                Swal.fire("Deleted!", responseData.message, "success");
                this.getCollection();
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
