import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addon-list',
  templateUrl: './addon-list.component.html',
  styleUrls: ['./addon-list.component.css']
})
export class AddonListComponent implements OnInit {

  nestedCategory : any = []
  category_list : any = [];
  searchText : any;
  isloading:any;

  constructor(
    public adminService: AdminServiceService,
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.adminService.getItemaddons().subscribe((response : {success : number, message: string, categories:[]}) => {
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
          .deleteItemAddon(category_ID)
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
