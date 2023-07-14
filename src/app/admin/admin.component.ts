import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationStart, NavigationEnd } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AdminServiceService } from 'src/app/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  is_collepsible: boolean = true;
  user_profile: boolean = false;
  objservableLoggedInUser;

  defaultActive = "";
  activePath = "";
  activeSubPath = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private loaderService: Ng4LoadingSpinnerService,
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {

        this.activePath = "";

        if (this.router.url.indexOf("category-list") !== -1 || this.router.url.indexOf("products") !== -1 || this.router.url.indexOf("specificationset") !== -1 || this.router.url.indexOf("specifications") !== -1
          || this.router.url.indexOf("add-categories") !== -1) {
          this.activePath = "category-list";
        } if (this.router.url.indexOf("userslist") !== -1) {
          this.activePath = "userslist";
        } if (this.router.url.indexOf("employee") !== -1) {
          this.activePath = "employee";
        } if (this.router.url.indexOf("resources") !== -1) {
          this.activePath = "resources";
        } if (this.router.url.indexOf("product-story") !== -1) {
          this.activePath = "story"
        }
        if (this.router.url.indexOf("attributes") !== -1) {
          this.activePath = "products"
        }
        if (this.router.url.indexOf("styles") !== -1) {
          this.activePath = "products"
        }
        if (this.router.url.indexOf("occasions") !== -1) {
          this.activePath = "products"
        }
        if (this.router.url.indexOf("attribute-sets") !== -1) {
          this.activePath = "products"
        }
        if (this.router.url.indexOf("materials") !== -1) {
          this.activePath = "products"
        }
        if (this.router.url.indexOf("best-suitable") !== -1) {
          this.activePath = "products"
        }
        if (this.router.url.indexOf("metal-colors") !== -1) {
          this.activePath = "products"
        }
        if (this.router.url.indexOf("diamond-quality") !== -1) {
          this.activePath = "products"
        }
        if (this.router.url.indexOf("metal-purity") !== -1) {
          this.activePath = "products"
        }
        if (this.router.url.indexOf("/inquiries") !== -1) {
          this.activePath = "inquiries"
        }

        this.activeSubPath = "";
        if (this.router.url.indexOf("category-list") !== -1 || this.router.url.indexOf("add-categories") !== -1) {
          this.activeSubPath = "categories";
        }
        if (this.router.url.indexOf("products") !== -1) {
          this.activeSubPath = "products";
        }
        if (this.router.url.indexOf("products/inquiries") !== -1) {
          this.activeSubPath = "inquiries";
        }
        if (this.router.url.indexOf("attributes") !== -1) {
          this.activeSubPath = "attributes";
        }
        if (this.router.url.indexOf("attribute-sets") !== -1) {
          this.activeSubPath = "attribute-sets";
        }
        if (this.router.url.indexOf("occasions") !== -1) {
          this.activeSubPath = "occasions";
        }
        if (this.router.url.indexOf("styles") !== -1) {
          this.activeSubPath = "styles";
        }
        if (this.router.url.indexOf("materials") !== -1) {
          this.activeSubPath = "materials";
        }
        if (this.router.url.indexOf("best-suitable") !== -1) {
          this.activeSubPath = "best-suitable";
        }
        if (this.router.url.indexOf("metal-colors") !== -1) {
          this.activeSubPath = "metal-colors";
        }
        if (this.router.url.indexOf("diamond-quality") !== -1) {
          this.activeSubPath = "diamond-quality";
        }
        if (this.router.url.indexOf("metal-purity") !== -1) {
          this.activeSubPath = "metal-purity";
        }
      }
    });
  }
  toggleSubMenu(activeClass) {
    this.defaultActive = activeClass;
  }

  logout() {
    this.router.navigate(['admin/login']);
  }

  public innerWidth: any;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1441) {
      this.is_collepsible = false;
    }
  }

}
