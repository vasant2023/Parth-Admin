import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from 'src/app/admin-service.service';
import { environment } from 'src/environments/environment';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-user-group-add',
  templateUrl: './user-group-add.component.html',
  styleUrls: ['./user-group-add.component.css']
})
export class UserGroupAddComponent implements OnInit {

  groupObj:any ={
    name:"",
    roleIDs:[],
    app_roles:[],
    sort_order:"",
    status:""
  }

  isLoading = false

  group_ID:"";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public adminService: AdminServiceService,
  ) { }

  createUserGroupform: FormGroup;
  roles:any = [];

  ngOnInit() {
    this.getGroupID();
    this.getGroupDetails();
    this.getUserRoles();
  }

  getGroupID() {
    this.group_ID = this.route.snapshot.params['group_ID'] ? this.route.snapshot.params['group_ID'] : "";
  }

  getUserRoles(){
    this.adminService.getUserRoles().subscribe((response: {success:number, message:string, users_roles:[]}) => {
      if(response.success == 1){
        this.roles = response.users_roles;
        // console.log(this.roles);
      }
    })
  }

  getGroupDetails(){
    this.isLoading = true;
    this.adminService.getGroupDetails(this.group_ID).subscribe((response: {success:number, message:string, users_group:{}}) => {
      if(response.success == 1) {
        this.groupObj = response.users_group;
        this.groupObj.roleIDs = [];

        this.groupObj.roles.forEach((role) => {
          this.groupObj.roleIDs.push(parseInt(role))
        })
      } else {
        console.log(response.message)
      }
    })
  }

  addUserGroup(){
    this.isLoading = false;
    if(this.isLoading == false){
      this.isLoading = true;
      let formData = new FormData();
      formData.append('apiId', environment.apiId);
      formData.append('name', this.groupObj.name);
      formData.append('roles', this.groupObj.roleIDs);
      formData.append('app_roles', this.groupObj.app_roles);
      formData.append('sort_order', this.groupObj.sort_order);
      formData.append('status', this.groupObj.status);

      if(this.group_ID){
        formData.append('group_ID', this.group_ID);
        this.adminService.updateGroup(formData).subscribe((response) => {
          if(response.success == 1){
            this.router.navigate(['admin/user-group']);
          }
          this.isLoading = false
        })
      } else {
        this.adminService.createGroup(formData).subscribe((response) => {
          if(response.success == 1){
            this.router.navigate(['admin/user-group']);
          }
          this.isLoading = false

        })
      }
      
    }
  }

}
