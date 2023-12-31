import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminServiceService } from '../../../admin-service.service';
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-hardware-category-list',
  templateUrl: './hardware-category-list.component.html',
  styleUrls: ['./hardware-category-list.component.css']
})
export class HardwareCategoryListComponent implements OnInit {

  nestedCategory : any = []
  category_list : any = [];
  searchText : any;
  p:number = 1;
  isloading:any;

  constructor(
    public adminService: AdminServiceService,
  ) { }

  ngOnInit(
  ) {
    this.getCategories();
    this.nestedCategoryList();
  }

  nestedCategoryList(){
    this.adminService.nestedCategoryList().subscribe((response : {success: number, message: string, categories:[]}) => {
      if(response.success == 1){
        this.nestedCategory = response.categories;
      }
    })
  }

  getCategories(){
    this.adminService.getHardwarecategories().subscribe((response : {success : number, message: string, categories:[]}) => {
      if(response.success == 1){
        this.category_list = response.categories;
      } else {
        alert(response.message)
      }
    })
  }

  deleteCategory(category_ID){
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        this.adminService
          .deleteHardwareCategory(category_ID)
          .pipe()
          .subscribe(
            (res) => {
              var responseData = JSON.parse(JSON.stringify(res));
              if (responseData.success) {
                Swal.fire("Deleted!", responseData.message, "success");
                this.getCategories();
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
