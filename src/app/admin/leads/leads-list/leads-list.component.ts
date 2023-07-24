import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminServiceService } from '../../../admin-service.service';
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css']
})
export class LeadsListComponent implements OnInit {

  searchText : any;
  isloading = false;

  leadsObj:any = {
    status_id: "",
    followup_comments:"",
    next_followup_date: "",
    lead_ID :"",
  }

  handleStatus:boolean = false;
  followUpForm: FormGroup;

  constructor(
    public adminService: AdminServiceService,
  ) { }

  ngOnInit() {
    this.getLeads();
    this.getStatus();
  }

  leadsList:any = {};
  statusList:any = [];

  getLeads(){
    this.adminService.getLeads().subscribe((response : {success:number, message:string, data:[]}) => {
      if(response.success == 1){
        this.leadsList = response.data;
      }
    })
  }

  getStatus(){
    this.adminService.getStatus().subscribe((response: {success:number, message: string, data:[]}) => {
      if(response.success == 1){
        this.statusList = response.data;
      }
    })
  }

  handleChange(lead_ID){
    this.handleStatus = !this.handleStatus;
    this.leadsObj.lead_ID = lead_ID;
    console.log(this.leadsObj.lead_ID)
  }

  submitFollowUp(){
    if(this.isloading == false){
      const dateToConvert = new Date(this.leadsObj.next_followup_date);
      dateToConvert.setHours(0, 0, 0, 0);
      const timestamp = Math.floor(dateToConvert.getTime() / 1000);
      this.leadsObj.next_followup_date = timestamp;

      
      this.isloading = true;
      this.adminService.followUp(this.leadsObj).subscribe((response: {success:number, message:string, }) => {
        if(response.success == 1){
          this.handleStatus = false;
          this.getLeads();
        }
        this.isloading = false;
      })
    }
    
  }

  hidePopup() {
    this.handleStatus = false;
  }

}
