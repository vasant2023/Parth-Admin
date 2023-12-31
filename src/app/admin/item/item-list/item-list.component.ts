import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.css"],
})
export class ItemListComponent implements OnInit {
  searchText = "";
  public isloading: boolean = false;

  constructor(
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private loaderService: Ng4LoadingSpinnerService
  ) {}


  p: number = 1;

  item_list: any = [];
  itemCategory: any = [];
  isPopupActive: boolean = false;
  selectedCategoryID = "";

  item = {
    marginOption: "Percentage",
  };

  ngOnInit() {
    this.getItems(this.selectedCategoryID);
    this.getItemCategories();
  }

  onCategoryChange() {
    if(this.selectedCategoryID){
      this.getItems(this.selectedCategoryID)      
    } else {
      this.getItems('')
    }
  }

  isProposal = false;

  proposalRequest() {
    this.isProposal = true;
  }

  proposalObj: any = {
    item_IDs: [],
    items: [],
  };

  proposal: any = [];

  public marked_IDs = [];

  addforproposal() {
    this.marked_IDs.forEach((item_ID) => {
      if (this.proposalObj.item_IDs.indexOf(item_ID) < 0) {
        this.proposalObj.item_IDs.push(item_ID);
      }
    });

    if (this.proposalObj.item_IDs.length > 0) {
      this.proposalObj.items = [];

      this.proposalObj.item_IDs.forEach((item_ID) => {
        var singleObj = this.item_list.filter(function (e) {
          if (e.item_ID == item_ID) {
            return e;
          }
        })[0];

        singleObj.marginOption = this.universalMarginOption;
        singleObj.margin = this.commonMargin;

        let price = parseFloat(singleObj.price);
        let margin = parseFloat(singleObj.margin);
        let marginOption = singleObj.marginOption;

        var marginSingle = 0;

        if (marginOption === "Rupees") {
          marginSingle = margin;
        } else if (marginOption === "Percentage") {
          marginSingle = Number(Math.round(price * (margin / 100)));
        } else {
          marginSingle = 0;
        }
        singleObj.finalPrice = price + marginSingle;

        this.proposalObj.items.push(singleObj);
      });
    }

    this.marked_IDs = [];
  }

  universalMarginOption = "Percentage";
  itemMarginOption = "Percentage";
  commonMargin = 10;

  hidePopup() {
    this.isProposal = false;
    this.isPopupActive = false;
  }

  activatePopup() {
    this.isPopupActive = true;
  }

  applyUniversalMargin() {
    this.proposalObj.items.forEach((item) => {
      if (this.universalMarginOption === "Percentage") {
        item.marginOption = "Percentage";
        item.margin = this.commonMargin;
      } else if (this.universalMarginOption === "Rupees") {
        item.marginOption = "Rupees";
        item.margin = this.commonMargin;
      }
      this.calculateFinalPrice(item);
    });
  }

  calculateFinalPrice(item: any) {
    let price = parseFloat(item.price);
    let margin = parseFloat(item.margin);
    let marginOption = item.marginOption;

    var marginSingle = 0;

    if (marginOption === "Rupees") {
      marginSingle = margin;
    } else if (marginOption === "Percentage") {
      marginSingle = Number(Math.round(price * (margin / 100)));
    } else {
      marginSingle = 0;
    }
    item.finalPrice = price + marginSingle;
  }

  getProposal() {
    const selectedItemsIds = this.proposalObj.item_ID;
    const selectedItemsDetails = [];
    for (const itemId of selectedItemsIds) {
      const selectedItem = this.item_list.find(
        (item) => item.item_ID === itemId
      );
      if (selectedItem) {
        selectedItemsDetails.push(selectedItem);
      }
    }

    if (this.proposalObj.item_ID.length === 0) {
      this.proposal = [];
    } else {
      this.proposal = selectedItemsDetails;
    }
  }

  getItems(id) {    
    this.isloading = true;
    this.loaderService.show();
    this.adminService
      .getItems(id)
      .subscribe(
        (response: { success: number; message: string; items: [] }) => {
          if (response.success == 1) {
            this.item_list = response.items;
            this.loaderService.hide();
          } else {
            this.toastr.error(response.message, "Error", {});
            this.loaderService.hide();
          }
          this.isloading = false
        }
      );
  }

  getItemCategories() {
    this.adminService
      .getItemcategories()
      .subscribe(
        (response: { success: number; message: string; categories: [] }) => {
          if (response.success == 1) {
            this.itemCategory = response.categories;
          } else {
            this.toastr.error(response.message, "Error", {});
            this.loaderService.hide();
          }
        }
      );
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
                this.getItems("");
              } else {
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
