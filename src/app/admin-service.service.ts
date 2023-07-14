import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpEventType,
} from "@angular/common/http";
import { Observable, of, BehaviorSubject, Subject } from "rxjs";
import { environment } from "../environments/environment";
import { map, catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdminServiceService {
  private objservableadmin = new Subject<any>();

  private objservablecategory = new Subject<any>();

  constructor(private http: HttpClient) {}

  createBrand(formData) {
    const url = environment.apiUrl + "brands/create";
    return this.http.post<any>(url, formData).pipe();
  }

  updateBrand(formData) {
    const url = environment.apiUrl + "brands/update";
    return this.http.post<any>(url, formData).pipe();
  }

  brandDetails(brand_ID) {
    const url = environment.apiUrl + "brands/details";
    const apiId = environment.apiId;
    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("brand_ID", brand_ID);
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }
  getBrands() {
    const url = environment.apiUrl + "brands/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteBrand(brand_ID) {
    const url = environment.apiUrl + "brands/remove";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("brand_ID", brand_ID);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  getHardwares() {
    const url = environment.apiUrl + "hardwares/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteHardware(hardware_ID) {
    const url = environment.apiUrl + "hardwares/remove";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("hardware_ID", hardware_ID);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  hardwareDetails(hardware_ID) {
    const url = environment.apiUrl + "hardwares/details";
    const apiId = environment.apiId;
    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("hardware_ID", hardware_ID);
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  updateHardware(formData) {
    const url = environment.apiUrl + "hardwares/update";
    return this.http.post<any>(url, formData).pipe();
  }

  createHardware(formData) {
    const url = environment.apiUrl + "hardwares/create";
    return this.http.post<any>(url, formData).pipe();
  }

  getLaminates() {
    const url = environment.apiUrl + "laminates/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteLaminate(laminate_ID) {
    const url = environment.apiUrl + "laminates/remove";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("laminate_ID", laminate_ID);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  createLaminate(formData) {
    const url = environment.apiUrl + "laminates/create";
    return this.http.post<any>(url, formData).pipe();
  }

  updateLaminate(formData) {
    const url = environment.apiUrl + "laminates/update";
    return this.http.post<any>(url, formData).pipe();
  }

  laminateDetail(laminate_ID) {
    const url = environment.apiUrl + "laminates/details";
    const apiId = environment.apiId;
    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("laminate_ID", laminate_ID);
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  // Items function

  getItems() {
    const url = environment.apiUrl + "items/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  itemDetails(item_ID){
    const url = environment.apiUrl + "items/details";
    const apiId = environment.apiId;
    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("item_ID", item_ID);
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteItem(item_ID) {
    const url = environment.apiUrl + "items/remove";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("item_ID", item_ID);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  createItem(formData){
    console.log(formData)
    const url = environment.apiUrl + 'items/create';
    return this.http.post<any>(url, formData).pipe();
  }

  updateItem(formData){
    const url = environment.apiUrl + 'items/update';
    return this.http.post<any>(url, formData).pipe();
  }

  // Category Functions

  createCategory(formData){
    console.log(formData)
    const url = environment.apiUrl + 'categories/create';
    return this.http.post<any>(url, formData).pipe();
  }

  updateCategory(formData){
    const url = environment.apiUrl + 'categories/update';
    return this.http.post<any>(url, formData).pipe();
  }

  getCategories(){
    const url = environment.apiUrl + 'categories/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  categoryDetails(category_ID){
    const url = environment.apiUrl + 'categories/details';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('category_ID', category_ID);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteCategory(category_ID){
    const url = environment.apiUrl + 'categories/remove';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('category_ID', category_ID);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  nestedCategoryList(){
    const url = environment.apiUrl + 'categories/list_nested';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // Collection Function

  getCollection(){
    const url = environment.apiUrl + 'collections/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteCollection(collection_ID){
    const url = environment.apiUrl + 'collections/remove';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('collection_ID', collection_ID);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  collectionDetails(collection_ID){
    const url = environment.apiUrl + 'collections/details';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('collection_ID', collection_ID);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  createCollection(formData){
    const url = environment.apiUrl + 'collections/create';
    return this.http.post<any>(url, formData).pipe();
  }

  updateCollection(formData){
    const url = environment.apiUrl + 'collections/update';
    return this.http.post<any>(url, formData).pipe();
  }
}
