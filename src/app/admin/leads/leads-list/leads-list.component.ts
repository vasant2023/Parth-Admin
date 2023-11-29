import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminServiceService } from '../../../admin-service.service';
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import {ExcelService} from '../../../_services/excel.service';
import { environment } from 'src/environments/environment';

import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css']
})
export class LeadsListComponent implements OnInit {

  searchText : any;
  public isloading = false;
  leadFlag = false;
  statusId = "";
  readMore = false;
  p:number = 1;

  leadsObj:any = {
    status_id: "",
    followup_comments:"",
    next_followup_date: "",
    lead_ID :"",
    fromDate: "",
    toDate: "",
    type:""
  }

  schedule_date:"";

  leads_file: "";

  detailObj:any={
    lead_ID: ""
  }

  handleStatus:boolean = false;
  followUpForm: FormGroup;
  uploadForm:FormGroup;

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
    private excelService: ExcelService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getLeads();
    this.getStatus();
  }

  readMoreDetails(){
    this.readMore = !this.readMore;
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
    if(this.leadsObj.fromDate && this.leadsObj.toDate){
      this.getLeads();
    }
    //
  }

  // Date range ended

  leadsList:any = [];
  statusList:any = [];

  getLeads(){
    this.isloading = true;
    this.adminService.getLeads(this.leadsObj).subscribe((response : {success:number, message:string, data:[]}) => {
      if(response.success == 1){
        this.leadsList = response.data;
      }
      this.isloading = false
    });
  }

  getDetails(id){
    this.adminService.getDetails(id).subscribe((response : {success:number, message:string, data:any}) => {
      if(response.success == 1){
        this.leadFlag = true
        this.detailObj = response.data;
        console.log(this.detailObj);
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

  statusFilter(){
    this.leadsObj.status_id = this.statusId;
    this.getLeads();
  }

  handleChange(lead_ID){
    this.handleStatus = !this.handleStatus;
    this.leadsObj.lead_ID = lead_ID;
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
          this.leadsObj.status_id = "";
          this.getLeads();
          this.getDetails(this.detailObj.lead_ID);
        }
        this.isloading = false;
      })
    }
    
  }

  hidePopup() {
    this.handleStatus = false;
  }

  public is_excel_loading = false;


  exportAsXLSX():void {
    this.is_excel_loading = true;
    // this.leadsObj.page = 0;
    // this.leadsObj.limit = 50000;

    this.adminService.getLeads(this.leadsObj).subscribe((response: any) => {
      var responseData = JSON.parse(JSON.stringify(response));

      if(responseData.success){
        var i = 1;

        var exportData = responseData.data.map( function (a) {
          return {
            "Sr.no" : i++,
            "NAME	" : a["name"],
            "COMPANY NAME" : a["company_name"],
            "STATUS" : a["status"],
            "COLLECTION" : a["collection"],
            "EMAIL" : a["email"],
            "MESSAGE" : a["message"],
            "PHONE NUMBER" : a["phone"],
            "ROOMS" : a["rooms"],
            "COUNTRY" : a["country"],
            "STATE" : a["state"],
            "CITY" : a["city"],
            "ZIP CODE" : a["zip_code"],
            "PROPERTY CODE" : a["property_code"],
            "TIME" : a["timestemp"],
          }
        });

        this.excelService.exportAsExcelFile(exportData, "Leads List");
        this.is_excel_loading = false;
      }

    })

  }

  handleInputChange(event){
    this.leads_file = event.target.files[0]
  }

  leadUploadStatus = false;
  handleLeadsUploadStatus(){
    this.leadUploadStatus = true;
  }

  uploadLeads(){
    let formData = new FormData();
    formData.append("apiId", environment.apiId);
    formData.append("leads_file", this.leads_file)

    this.adminService.uploadLeads(formData).subscribe((response:{success:number,message:string}) => {
      if(response.success == 1){
        this.router.navigate(['admin/leads']);
        this.leadUploadStatus = false
      }
    })
  }

  filterLeadType(){
    this.getLeads();
  }

}
