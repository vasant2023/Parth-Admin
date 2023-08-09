import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminServiceService } from '../../../admin-service.service';
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

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
    fromDate: "",
    toDate: ""
  }

  handleStatus:boolean = false;
  followUpForm: FormGroup;

  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }

  constructor(
    public adminService: AdminServiceService,
  ) { }

  ngOnInit() {
    this.getLeads();
    this.getStatus();
  }


  // Date range 

  rangeClicked(range) {
    if (range.startDate) {
      this.leadsObj.fromDate = range.startDate.format("YYYY-MM-DD");
    } else {
      this.leadsObj.fromDate = "";
    }

    if (range.startDate) {
      this.leadsObj.toDate = range.endDate.format("YYYY-MM-DD");
    } else {
      this.leadsObj.toDate = "";
    }
    console.log(this.leadsObj.fromDate, this.leadsObj.toDate)
    // this.getLeads();
  }

  datesUpdated(range) {
    if (range.startDate) {
      this.leadsObj.fromDate = range.startDate.format("YYYY-MM-DD");
    } else {
      this.leadsObj.fromDate = "";
    }

    if (range.startDate) {
      this.leadsObj.toDate = range.endDate.format("YYYY-MM-DD");
    } else {
      this.leadsObj.toDate = "";
    }
    console.log(this.leadsObj.fromDate, this.leadsObj.toDate)

    this.getLeads();
  }

  // Date range ended



  leadsList:any = {};
  statusList:any = [];

  getLeads(){
    this.adminService.getLeads(this.leadsObj).subscribe((response : {success:number, message:string, data:[]}) => {
      if(response.success == 1){
        this.leadsList = response.data;
      }
    })
  }

  getStatus(){
    this.adminService.getStatus().subscribe((response: {success:number, message: string, data:[]}) => {
      if(response.success == 1){
        this.statusList = response.data;
        console.log(this.statusList)
      }
    })
  }

  statusFilter(id){
    console.log(id);
    this.leadsObj.status_id = id;
    this.getLeads()
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
