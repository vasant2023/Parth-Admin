import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {


  searchText = "";
  isloading: boolean;

  constructor(
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private loaderService: Ng4LoadingSpinnerService,
  ) { }

  item_list: any = [];

  item = {
    marginOption : "Percentage"
  }

  ngOnInit() {
    this.getItems();
  }

  isProposal = false;

  proposalRequest() {
    this.isProposal = true;
  }

  proposalObj: any = {
  }

  proposal: any = [];

  universalMarginOption = 'Percentage';
  itemMarginOption = 'Percentage';
  commonMargin = 0;

  hidePopup(){
    this.isProposal = false
  }

  applyUniversalMargin() {
    for (const item of this.proposal) {
      if (this.universalMarginOption === 'Percentage') {
        item.marginOption = 'Percentage';
        item.margin = this.commonMargin;
      } else if (this.universalMarginOption === 'Rupees') {
        item.marginOption = 'Rupees';
        item.margin = this.commonMargin;
      }
      this.calculateFinalPrice(item);
    }
  }

  items : any ={
    marginOption : "Percentage"
  }

  calculateFinalPrice(item: any) {
    const price = parseFloat(item.price);
    const margin = parseFloat(item.margin);
    const marginOption = this.item.marginOption;

    if (marginOption === 'Rupees') {
      item.finalPrice = price + margin;
    } else if (marginOption === 'Percentage') {
      item.finalPrice = price + (price * (margin / 100));
    } else {
      item.finalPrice = price;
    }
  }



  // getTotalPriceOfSelectedItems(): number {
  //   let totalPrice = 0;
  //   for (const item of this.proposal) {
  //     if (item.marginOption && item.marginOption !== '' && item.margin) {
  //       totalPrice += item.finalPrice;
  //     }
  //   }
  //   return totalPrice;
  // }


  getProposal() {
    const selectedItemsIds = this.proposalObj.item_ID;
    const selectedItemsDetails = [];
    for (const itemId of selectedItemsIds) {
      const selectedItem = this.item_list.find(item => item.item_ID === itemId);
      if (selectedItem) {
        selectedItemsDetails.push(selectedItem);
      }
    }

    if (this.proposalObj.item_ID.length === 0) {
      this.proposal = []
    } else {
      this.proposal = selectedItemsDetails;
    }
  }

  getItems() {
    this.isloading = true;
    this.loaderService.show();
    this.adminService.getItems().subscribe((response: { success: number, message: string, items: [] }) => {
      if (response.success == 1) {
        this.item_list = response.items;
        this.loaderService.hide();
      } else {
        this.toastr.error(response.message, "Error", {});
        this.loaderService.hide();
      }
    })
  }

  deleteItem(item_ID) {
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        this.adminService
          .deleteItem(item_ID)
          .pipe()
          .subscribe(
            (res) => {
              var responseData = JSON.parse(JSON.stringify(res));
              if (responseData.success) {
                Swal.fire("Deleted!", responseData.message, "success");
                this.getItems();
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
