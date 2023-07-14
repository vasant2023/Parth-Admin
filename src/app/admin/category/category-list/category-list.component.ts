import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminServiceService } from '../../../admin-service.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {


  nestedCategory : any = []

  constructor(
    public adminService: AdminServiceService,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.nestedCategoryList();
  }

  category_list : any = [];

  nestedCategoryList(){
    this.adminService.nestedCategoryList().subscribe((response : {success: number, message: string, categories:[]}) => {
      if(response.success == 1){
        this.nestedCategory = response.categories;
      }
    })
  }

  getCategories(){
    this.adminService.getCategories().subscribe((response : {success : number, message: string, categories:[]}) => {
      if(response.success == 1){
        this.category_list = response.categories;
      } else {
        alert(response.message)
      }
    })
  }

  deleteCategory(category_ID){
    this.adminService.deleteCategory(category_ID).subscribe((response : {success : number, message: string}) => {
      if(response.success == 1){
        this.getCategories();
      } else {
        alert(response.message);
      }
    })
  }

}
