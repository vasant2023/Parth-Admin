import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})
export class ListBlogsComponent implements OnInit {

  searchText = "";
  public isLoading:boolean = false;

  p:number = 1;

  constructor(
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private loaderService: Ng4LoadingSpinnerService,
    private dragulaService: DragulaService
  ) { }

  ngOnInit() {
    this.getBlogs();
  }

  blog_List: any = [];

  getBlogs() {
    this.isLoading = true;
    this.loaderService.show();
    this.adminService
      .getBlogs()
      .subscribe(
        (response: { success: number; message: string; blogs: [] }) => {
          if (response.success == 1) {
            this.blog_List = response.blogs;
            console.log(this.blog_List);
            
            this.loaderService.hide();
          } else {
            this.toastr.error(response.message, "Error", {});
            this.loaderService.hide();
          }

          this.isLoading = false
        }
      );
  }

  deleteBlog(blog_ID) {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        this.adminService
          .deleteBlog(blog_ID)
          .pipe()
          .subscribe(
            (res) => {
              var responseData = JSON.parse(JSON.stringify(res));
              if (responseData.success) {
                Swal.fire("Deleted!", responseData.message, "success");
                this.getBlogs();
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
