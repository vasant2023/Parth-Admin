import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from 'src/app/admin-service.service';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  configEditor = {
    removeButtons: 'Print,Preview,NewPage,Source,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,ImageButton,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About,FontSize,Image',
    toolbarGroups: [
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'styles', groups: ['styles'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks'] },
      '/',
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'paragraph', groups: ['align', 'bidi', 'paragraph'] },
      { name: 'forms', groups: ['forms'] },
      { name: 'links', groups: ['links'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'insert', groups: ['insert'] },
      '/',
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'about', groups: ['about'] }
    ]
  }

  userObj:any={
    first_name:"",
    last_name:"",
    email:"",
    status:"",
    type:"",
    password:"",
    profile_pic:"",
  }

  isLoading = false

  user_id:"";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public adminService: AdminServiceService,
  ) { }

  createUserform: FormGroup;
  groupList:any = [];

  ngOnInit() {
    this.getuserID();
    this.getUserDetails();
    this.getAllgrouptypes();
  }

  getuserID() {
    this.user_id = this.route.snapshot.params['user_id'] ? this.route.snapshot.params['user_id'] : "";
  }

  handleInputChange(event) {
    this.userObj.profile_pic = event.target.files[0];
  }

  getAllgrouptypes(){
    this.adminService.getAllgrouptypes().subscribe((response : {success:number, message:string, users_group:[]}) => {
      if(response.success == 1){
        this.groupList = response.users_group;
        console.log(this.groupList);
      }
    })
  }

  getUserDetails(){
    this.adminService.userDetails(this.user_id).subscribe((response: {success:number, message : string, user : {}}) => {
      if(response.success == 1) {
        this.userObj = response.user;
        // this.userObj.type = this.userObj.type;
        console.log(this.userObj)
      } else {
        console.log(response.message)
      }
    })
  }

  addUser(){
    if(this.isLoading == false){
      this.isLoading = true;

      let formData = new FormData();
      formData.append('apiId', environment.apiId);
      formData.append('first_name', this.userObj.first_name);
      formData.append('last_name', this.userObj.last_name);
      formData.append('email', this.userObj.email);
      formData.append('password', this.userObj.password);
      formData.append('type', this.userObj.type);
      formData.append('status', this.userObj.status);
      formData.append('profile_pic', this.userObj.profile_pic);

      if(this.user_id){
        formData.append('user_id', this.user_id);
        this.adminService.updateUser(formData).subscribe((response:{success:number, message:string}) => {
          if(response.success == 1){
            this.router.navigate(['admin/user']);
          }
          this.isLoading = false;
        })
      } else {
        this.adminService.createUser(formData).subscribe((response:{success:number, message:string}) => {
          if(response.success == 1){
            this.router.navigate(['admin/user']);
          }
          this.isLoading = false;
        })
      }
    }
  }

}
