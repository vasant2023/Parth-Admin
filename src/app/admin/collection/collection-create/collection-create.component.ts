import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
// import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { Router, ActivatedRoute } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpEventType,
} from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { ToastrService } from "ngx-toastr";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { Observable } from "rxjs";
import { map, catchError, tap, ignoreElements } from "rxjs/operators";
import { Response } from "selenium-webdriver/http";
// import { element } from '@angular/core/src/render3';
import { environment } from "../../../../environments/environment";
import swal from "sweetalert2";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "app-collection-create",
  templateUrl: "./collection-create.component.html",
  styleUrls: ["./collection-create.component.css"],
})
export class CollectionCreateComponent implements OnInit {
  configEditor = {
    removeButtons:
      "Print,Preview,NewPage,Source,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,ImageButton,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About,FontSize,Image",
    toolbarGroups: [
      { name: "document", groups: ["mode", "document", "doctools"] },
      {
        name: "editing",
        groups: ["find", "selection", "spellchecker", "editing"],
      },
      { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
      { name: "styles", groups: ["styles"] },
      { name: "paragraph", groups: ["list", "indent", "blocks"] },
      "/",
      { name: "clipboard", groups: ["clipboard", "undo"] },
      { name: "paragraph", groups: ["align", "bidi", "paragraph"] },
      { name: "forms", groups: ["forms"] },
      { name: "links", groups: ["links"] },
      { name: "colors", groups: ["colors"] },
      { name: "insert", groups: ["insert"] },
      "/",
      { name: "tools", groups: ["tools"] },
      { name: "others", groups: ["others"] },
      { name: "about", groups: ["about"] },
    ],
  };

  accordionList: { title: string; text: string }[] = [{ title: "", text: "" }];

  collectionObj: any = {
    collection: "",
    title: "",
    tags: "",
    price: "",
    sale_price: "",
    label: "",
    label_from: "",
    label_to: "",
    description: "",
    short_description: "",
    hotel_category:"",
    item_IDs: [],
    itemSizesIDs: [],
    laminate_IDs: [],
    hardware_IDs: [],
    warranty_detail: "",
    meta_description: "",
    meta_keywords: "",
    banner_image: (File = null),
    specification_image: (File = null),
    brochure: (File = null),
    collection_images: [],
    sort_order: "",
    status: 1,
    warranty_time: "",
    tag_line: "",
    warranty_duration: "",
    category_ID: "",
    accordionList: [],
    accordian: {
      title: "",
      text: "",
    },
  };
  collection_ID = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private http: HttpClient,
    private dragulaService: DragulaService
  ) { }

  collectionForm: FormGroup;

  isLoading = false;
  itemList: any = [];
  laminatesList: any = [];
  categoryList: any = [];
  hardwaresList: any = [];
  nestedCategory:any=[]

  // Testing

  filteredItemList: any[] = [];
  filteredLaminateList: any[] = [];
  filteredHardwareList: any[] = [];
  searchItem: string;
  searchLaminates: string;
  searchHardwares: string;

  ngOnInit() {
    this.getCollectionID();
    this.collectionDetails();
    this.getAllItems();
    this.getCollectionCategories();
    this.getAllLaminates();
    this.getAllHardwares();
    this.nestedCategoryList();
  }

  filterItems() {
    if (this.searchItem) {
      this.filteredItemList = this.itemList.filter(item =>
        item.item.toLowerCase().includes(this.searchItem.toLowerCase())
      );
    } else {
      this.filteredItemList = this.itemList;
    }
  }

  filterLaminates() {
    if (this.searchLaminates) {
      this.filteredLaminateList = this.laminatesList.filter(laminate => laminate.laminate.toLowerCase().includes(this.searchLaminates.toLocaleLowerCase()))
    } else {
      this.filteredLaminateList = this.laminatesList
    }
  }

  filterHardwares() {
    if (this.searchHardwares) {
      this.filteredHardwareList = this.hardwaresList.filter(hardware => hardware.hardware.toLowerCase().includes(this.searchHardwares.toLocaleLowerCase()))
    } else {
      this.filteredHardwareList = this.hardwaresList
    }
  }

  public onChange({ editor }: ChangeEvent) {
    this.collectionObj.description = editor.getData();
  }

  handleInputChangeBannerImage(event) {
    this.collectionObj.banner_image = event.target.files[0];
  }

  handleInputChangeSpecificationImage(event) {
    this.collectionObj.specification_image = event.target.files[0];
  }

  item_images(event) {
    this.collectionObj.collection_images = [];
    var files = event.srcElement.files;
    for (var key in files) {
      if (typeof files[key].type != "undefined") {
        this.collectionObj.collection_images.push(files[key]);
      }
    }
  }

  brochure(event) {
    this.collectionObj.brochure = event.target.files[0];
  }

  getCollectionID() {
    this.collection_ID = this.route.snapshot.params["collection_ID"]
      ? this.route.snapshot.params["collection_ID"]
      : "";
  }

  getCollectionCategories() {
    this.adminService
      .getCollectioncategories()
      .subscribe(
        (response: { success: number; message: string; categories: [] }) => {
          if (response.success == 1) {
            this.categoryList = response.categories;
            console.log(this.categoryList);
          }
        }
      );
  }

  nestedCategoryList() {
    this.adminService
    .nestedHotelCategoryList()
    .subscribe((response: { success: number, message: string, categories: [] }) => {
      if (response.success == 1) {
        this.nestedCategory = response.categories;
        console.log(this.nestedCategory)
      }
    })
  }

  getAllItems() {
    this.adminService
      .getItems("")
      .subscribe(
        (response: { success: number; message: string; items: [] }) => {
          if (response.success == 1) {
            this.itemList = response.items;
            // console.log(this.itemList)
            this.filteredItemList = this.itemList
          }
        }
      );
  }

  getAllLaminates() {
    this.adminService
      .getLaminates()
      .subscribe(
        (response: { success: number; message: string; laminates: [] }) => {
          if (response.success == 1) {
            this.laminatesList = response.laminates;
            this.filteredLaminateList = this.laminatesList
          }
        }
      );
  }

  getAllHardwares() {
    this.adminService
      .getHardwares()
      .subscribe(
        (response: { success: number; message: string; hardwares: [] }) => {
          if (response.success == 1) {
            this.hardwaresList = response.hardwares;
            this.filteredHardwareList = this.hardwaresList
          }
        }
      );
  }

  collectionDetails() {
    this.adminService
      .collectionDetails(this.collection_ID)
      .subscribe(
        (response: { success: number; message: string; collection: [] }) => {
          if (response.success == 1) {
            this.collectionObj = response.collection;
            this.collectionObj.item_IDs = [];
            this.collectionObj.laminate_IDs = [];
            this.collectionObj.hardware_IDs = [];
            this.collectionObj.itemSizesIDs = [];

            this.collectionObj.laminates.forEach((value) => {
              this.collectionObj.laminate_IDs.push(parseInt(value.laminate_ID));
            });

            this.collectionObj.hardwares.forEach((value) => {
              this.collectionObj.hardware_IDs.push(parseInt(value.hardware_ID));
            });

            this.collectionObj.items.forEach((singleItem) => {
              // console.log(singleItem.size_lenght);
              if(singleItem.size_lenght === singleItem.sizes.length){
              this.collectionObj.item_IDs.push(parseInt(singleItem.item_ID));

              }
              singleItem.sizes.forEach((value) => {
                this.collectionObj.itemSizesIDs.push(value.id)
              })
            });
            
          }
        }
      );
  }

  addAccordion() {
    const newAccordion = { title: "", text: "" };
    this.accordionList.push(newAccordion);
    this.collectionObj.accordionList = this.accordionList;
    console.log(this.accordionList);
  }

  deleteAccordion(index: number) {
    this.accordionList.splice(index, 1);
  }

  saveCollection(form) {
    this.collectionObj.accordionList = this.accordionList;
    if (form.valid) {
      if (this.isLoading == false) {
        this.isLoading = true;

        let formData = new FormData();
        formData.append("apiId", environment.apiId);
        formData.append("from_app", "true");
        formData.append("collection", this.collectionObj.collection);
        formData.append("title", this.collectionObj.title);
        formData.append("tags", this.collectionObj.tags);
        formData.append("hotel_category", this.collectionObj.hotel_category);
        formData.append("price", this.collectionObj.price);
        formData.append("sale_price", this.collectionObj.sale_price);
        formData.append("label", this.collectionObj.label);
        formData.append("label_from", this.collectionObj.label_from);
        formData.append("label_to", this.collectionObj.label_to);
        formData.append("description", this.collectionObj.description);
        formData.append(
          "short_description",
          this.collectionObj.short_description
        );

        var sort_order = 1;
        var items = [];
        var laminates = [];
        var hardwares = [];
        var itemSizeId = [];

        this.collectionObj.itemSizesIDs.forEach((single_ID) => {
          var Obj = {
            item_size_ID: single_ID,
            sort_order: sort_order
          }
          itemSizeId.push(Obj);
          sort_order++;
        })

        this.collectionObj.item_IDs.forEach((single_ID) => {
          var Obj = {
            item_ID: single_ID,
            sort_order: sort_order,
          };
          items.push(Obj);
          sort_order++;
        });

        this.collectionObj.laminate_IDs.forEach((single_ID) => {
          var Obj = {
            laminate_ID: single_ID,
            sort_order: sort_order,
          };
          laminates.push(Obj);
          sort_order++;
        });

        this.collectionObj.hardware_IDs.forEach((single_ID) => {
          var Obj = {
            hardware_ID: single_ID,
            sort_order: sort_order,
          };
          hardwares.push(Obj);
          sort_order++;
        });

        formData.append("items", JSON.stringify(itemSizeId));
        formData.append("laminates", JSON.stringify(laminates));
        formData.append("hardwares", JSON.stringify(hardwares));
        // formData.append("item_sizes", JSON.stringify(itemSizeId));
        formData.append("warranty_detail", this.collectionObj.warranty_detail);
        formData.append(
          "meta_description",
          this.collectionObj.meta_description
        );
        formData.append("meta_keywords", this.collectionObj.meta_keywords);
        formData.append("banner_image", this.collectionObj.banner_image);
        formData.append(
          "specification_image",
          this.collectionObj.specification_image
        );
        formData.append(
          "banner_image_mobile",
          this.collectionObj.banner_image_mobile
        );
        formData.append("brochure", this.collectionObj.brochure);

        for (var index in this.collectionObj.collection_images) {
          formData.append(
            "collection_images[" + index + "]",
            this.collectionObj.collection_images[index]
          );
        }
        formData.append("image_alttext", this.collectionObj.image_alttext);
        formData.append("sort_order", this.collectionObj.sort_order);
        formData.append("tag_line", this.collectionObj.tag_line);
        formData.append("status", this.collectionObj.status);
        formData.append("warranty_time", this.collectionObj.warranty_time);
        formData.append(
          "warranty_duration",
          this.collectionObj.warranty_duration
        );
        formData.append("category_ID", this.collectionObj.category_ID);
        formData.append(
          "accordionList",
          JSON.stringify(this.collectionObj.accordionList)
        );

        if (this.collection_ID) {
          formData.append("collection_ID", this.collection_ID);
          this.adminService
            .updateCollection(formData)
            .subscribe((response: { success: number; message: string }) => {
              if (response.success == 1) {
                this.router.navigate(["admin/collections"]);
              }
              this.isLoading = false;
            });
        } else {
          this.adminService
            .createCollection(formData)
            .subscribe((response: { success: number; message: string }) => {
              if (response.success == 1) {
                this.router.navigate(["admin/collections"]);
              }
              this.isLoading = false;
            });
        }
      }
    }
  }

  parentIdChange(itemid) {
    if (this.collectionObj.item_IDs.includes(itemid)) {
      var itemId = this.collectionObj.item_IDs;
      itemId.forEach((singleId) => {
        const singleItem = this.itemList.find(item => item.item_ID === singleId);

        if (singleItem) {
          console.log(singleItem)
          var sizesIds = [];
          singleItem.sizes.forEach((eachSize) => {
            sizesIds.push(eachSize.id);
          })

          sizesIds.forEach((id) => {
            this.collectionObj.itemSizesIDs.push(id);
            const uniqueSizeIDs = Array.from(new Set(this.collectionObj.itemSizesIDs));
            this.collectionObj.itemSizesIDs = uniqueSizeIDs;
          })
        }
      })
    }
    else {
      const singleItem = this.itemList.find(item => item.item_ID === itemid);
      if (singleItem) {
        var sizesIds = [];
        singleItem.sizes.forEach((eachSize) => {
          sizesIds.push(eachSize.id);
        })
        sizesIds.forEach((singleId) => {
          this.collectionObj.itemSizesIDs = this.collectionObj.itemSizesIDs.filter(id => id !== singleId);
        })
      }
    }

  }


}
