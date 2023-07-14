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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
