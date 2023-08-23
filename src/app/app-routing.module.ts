import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './_guard/admin-auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { BrandListComponent } from './admin/brand/brand-list/brand-list.component';
import { CreateBrandComponent } from './admin/brand/create-brand/create-brand.component';
import { HardwareListComponent } from './admin/hardware/hardware-list/hardware-list.component';
import { HardwareCreateComponent } from './admin/hardware/hardware-create/hardware-create.component';
import { LaminateListComponent } from './admin/laminate/laminate-list/laminate-list.component';
import { LaminateCreateComponent } from './admin/laminate/laminate-create/laminate-create.component';
import { ItemListComponent } from './admin/item/item-list/item-list.component';
import { ItemCreateComponent } from './admin/item/item-create/item-create.component';
import { CategoryCreateComponent } from './admin/category/category-create/category-create.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { CollectionListComponent } from './admin/collection/collection-list/collection-list.component';
import { CollectionCreateComponent } from './admin/collection/collection-create/collection-create.component';
import { ColletionCategoryListComponent } from './admin/collection-category/colletion-category-list/colletion-category-list.component';
import { ColletionCategoryCreateComponent } from './admin/collection-category/colletion-category-create/colletion-category-create.component';
import { HardwareCategoryListComponent } from './admin/hardware-category/hardware-category-list/hardware-category-list.component';
import { HardwareCategoryCreateComponent } from './admin/hardware-category/hardware-category-create/hardware-category-create.component';
import { LaminateCategoryListComponent } from './admin/laminate-category/laminate-category-list/laminate-category-list.component';
import { LaminateCategoryCreateComponent } from './admin/laminate-category/laminate-category-create/laminate-category-create.component';
import { ItemCategoryListComponent } from './admin/item-category/item-category-list/item-category-list.component';
import { ItemCategoryCreateComponent } from './admin/item-category/item-category-create/item-category-create.component';
import { LeadsListComponent } from './admin/leads/leads-list/leads-list.component';
import { LeadsAddComponent } from './admin/leads/leads-add/leads-add.component';
import { HotelCategoryCreateComponent } from './admin/hotel-management/hotel-category-create/hotel-category-create.component';
import { HotelCategoryListComponent } from './admin/hotel-management/hotel-category-list/hotel-category-list.component';


const routes: Routes = [
  {
      path: '',
      redirectTo: 'admin',
      pathMatch: 'full',
  },
  {
      path: "admin",
      component: AdminComponent,
      canActivate: [AdminAuthGuard],
      children: [
        {
          path: "brands",
          component: BrandListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "brands/create",
          component: CreateBrandComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "brands/create/:brand_ID",
          component: CreateBrandComponent,
          data : {title : "Parth Hospitality"}
        },

        {
          path: "hardwares",
          component: HardwareListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "hardwares/create",
          component: HardwareCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "hardwares/create/:hardware_ID",
          component: HardwareCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "laminates",
          component: LaminateListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "laminates/create",
          component: LaminateCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "laminates/create/:laminate_ID",
          component: LaminateCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "items",
          component: ItemListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "items/create",
          component: ItemCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "items/create/:item_ID",
          component: ItemCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "categories",
          component: CategoryListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "categories/create",
          component: CategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "categories/create/:category_ID",
          component: CategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "collections",
          component: CollectionListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "collections/create",
          component: CollectionCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "collections/create/:collection_ID",
          component: CollectionCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "collections-category",
          component: ColletionCategoryListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "collections-category/create",
          component: ColletionCategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "collections-category/create/:category_ID",
          component: ColletionCategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "hotel-category",
          component: HotelCategoryListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "hotel-category/create",
          component: HotelCategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "hotel-category/create/:category_ID",
          component: HotelCategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "hardware-category",
          component: HardwareCategoryListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "hardware-category/create",
          component: HardwareCategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "hardware-category/create/:category_ID",
          component: HardwareCategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "laminate-category",
          component: LaminateCategoryListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "laminate-category/create",
          component: LaminateCategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "laminate-category/create/:category_ID",
          component: LaminateCategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "item-category",
          component: ItemCategoryListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "item-category/create",
          component: ItemCategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "item-category/create/:category_ID",
          component: ItemCategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "leads",
          component: LeadsListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "leads/add",
          component: LeadsAddComponent,
          data : {title : "Parth Hospitality"}
        },

      ],
      data: { title: 'Parth Admin' },
  },
  {
      path: "admin/login",
      component: AdminloginComponent,
      children: []
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
