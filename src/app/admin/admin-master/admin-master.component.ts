import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-master',
  templateUrl: './admin-master.component.html',
  styleUrls: ['./admin-master.component.css']
})
export class AdminMasterComponent implements OnInit {

  constructor() { }

  product:boolean = false;

  public activeNav = "";

  ngOnInit() {
  }
  changeActiveTab(tab){
    this.activeNav = tab;
  }

}
