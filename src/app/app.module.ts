import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminMasterComponent } from './admin/admin-master/admin-master.component';
import { SiginComponent } from './admin/sigin/sigin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { DragulaModule } from 'ng2-dragula';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorModule as CKEditorModule2 } from 'ngx-ckeditor';
import { ColorPickerModule } from 'ngx-color-picker';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChecklistModule } from 'angular-checklist';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AngularDatepickerModule } from 'anglar-datepicker';
import { OwlDateTimeModule,OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SafeHtmlModule } from './pipes/safe-html/safe-html.module';
import { CreateBrandComponent } from './admin/brand/create-brand/create-brand.component';
import { BrandListComponent } from './admin/brand/brand-list/brand-list.component';
import { HardwareListComponent } from './admin/hardware/hardware-list/hardware-list.component';
import { HardwareCreateComponent } from './admin/hardware/hardware-create/hardware-create.component';
import { LaminateListComponent } from './admin/laminate/laminate-list/laminate-list.component';
import { LaminateCreateComponent } from './admin/laminate/laminate-create/laminate-create.component';
import { ItemListComponent } from './admin/item/item-list/item-list.component';
import { ItemCreateComponent } from './admin/item/item-create/item-create.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { CategoryCreateComponent } from './admin/category/category-create/category-create.component';
import { CollectionListComponent } from './admin/collection/collection-list/collection-list.component';
import { CollectionCreateComponent } from './admin/collection/collection-create/collection-create.component';
import { ColletionCategoryListComponent } from './admin/collection-category/colletion-category-list/colletion-category-list.component';
import { ColletionCategoryCreateComponent } from './admin/collection-category/colletion-category-create/colletion-category-create.component';
import { HardwareCategoryListComponent } from './admin/hardware-category/hardware-category-list/hardware-category-list.component';
import { HardwareCategoryCreateComponent } from './admin/hardware-category/hardware-category-create/hardware-category-create.component';
import { LaminateCategoryCreateComponent } from './admin/laminate-category/laminate-category-create/laminate-category-create.component';
import { LaminateCategoryListComponent } from './admin/laminate-category/laminate-category-list/laminate-category-list.component';
import { ItemCategoryListComponent } from './admin/item-category/item-category-list/item-category-list.component';
import { ItemCategoryCreateComponent } from './admin/item-category/item-category-create/item-category-create.component';
import { LeadsListComponent } from './admin/leads/leads-list/leads-list.component';
import { LeadsAddComponent } from './admin/leads/leads-add/leads-add.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HotelCategoryListComponent } from './admin/hotel-management/hotel-category-list/hotel-category-list.component';
import { HotelCategoryCreateComponent } from './admin/hotel-management/hotel-category-create/hotel-category-create.component';






@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminMasterComponent,
    LoginComponent,
    AdminloginComponent,
    SiginComponent,
    CreateBrandComponent,
    BrandListComponent,
    HardwareListComponent,
    HardwareCreateComponent,
    LaminateListComponent,
    LaminateCreateComponent,
    ItemListComponent,
    ItemCreateComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CollectionListComponent,
    CollectionCreateComponent,
    ColletionCategoryListComponent,
    ColletionCategoryCreateComponent,
    HardwareCategoryListComponent,
    HardwareCategoryCreateComponent,
    LaminateCategoryCreateComponent,
    LaminateCategoryListComponent,
    ItemCategoryListComponent,
    ItemCategoryCreateComponent,
    LeadsListComponent,
    LeadsAddComponent,
    HotelCategoryListComponent,
    HotelCategoryCreateComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    TagInputModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ChecklistModule,
    Ng4LoadingSpinnerModule,
    DragulaModule.forRoot(),
    CKEditorModule,
    CKEditorModule2,
    ColorPickerModule,
    NgxDaterangepickerMd.forRoot(),
    AngularDatepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SafeHtmlModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
