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

  adminSignIn(userData): Observable<any> {
    const httpOptions = {
       headers: new HttpHeaders({
          'Content-Type': 'application/json'
       })
    };
    userData.apiId = environment.apiId;
    return this.http.post<any>(environment.apiUrl + 'users/signin', JSON.stringify(userData), httpOptions).pipe(
       tap((product) => console.log(`added product w/ id=${product}`)),
    );
  }

  setObjservableUser(objLoggedInUser) {
    this.objservableadmin.next(objLoggedInUser);
    localStorage.setItem("ParthAdminLoggedInId", objLoggedInUser);
  }

  geObjservableUser(): Observable<any> {
    return this.objservableadmin.asObservable();
  }

  getLoggedInUser(){
    const userData =  JSON.parse(localStorage.getItem('ParthAdminLoggedInId'));
    return of(userData);
  }

  removeObjservableUser() {
    this.objservableadmin.next();
    localStorage.removeItem("ParthAdminLoggedInId");
  }

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

  getItems(id) {
    const url = environment.apiUrl + "items/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");

    if(id){
      body = body.append("category_ID", id);
    } 
    
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
    // console.log(formData)
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

  nestedItemList(){
    const url = environment.apiUrl + 'categories/list_nested';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', "item");

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  nestedCollectionCategoryList(){
    const url = environment.apiUrl + 'categories/list_nested';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', "collection");

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  nestedHotelCategoryList(){
    const url = environment.apiUrl + 'categories/list_nested';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', "hotel");

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
    
    const httpOptions = {
        // headers: new HttpHeaders({
        // 'Content-Type': 'application/json;charset=utf-8'
        // })
    };

    return this.http.post<any>(url, formData,httpOptions).pipe();
    
  }

  updateCollection(formData){
    const url = environment.apiUrl + 'collections/update';
    const httpOptions = {
      // headers: new HttpHeaders({
      // 'Content-Type': 'application/json;charset=utf-8'
      // })
  };
    return this.http.post<any>(url, formData, httpOptions).pipe();
  }

  // Collection Categories

  getCollectioncategories(){
    const url = environment.apiUrl + 'categories/list_nested';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', 'collection');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }


  deleteCollectionCategory(category_ID){
    const url = environment.apiUrl + 'categories/remove';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('category_ID', category_ID);
    body = body.append('type', 'collection');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // Hardware Category

  getHardwarecategories(){
    const url = environment.apiUrl + 'categories/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', 'hardware');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteHardwareCategory(category_ID){
    const url = environment.apiUrl + 'categories/remove';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('category_ID', category_ID);
    body = body.append('type', 'hardware');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // Laminate Category

  getLaminatecategories(){
    const url = environment.apiUrl + 'categories/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', 'laminate');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteLaminateCategory(category_ID){
    const url = environment.apiUrl + 'categories/remove';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('category_ID', category_ID);
    body = body.append('type', 'laminate');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // Item Categories

  getItemcategories(){
    const url = environment.apiUrl + 'categories/list_nested';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', 'item');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteItemCategory(category_ID){
    const url = environment.apiUrl + 'categories/remove';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('category_ID', category_ID);
    body = body.append('type', 'item');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  //Addons
  getItemaddons(){
    const url = environment.apiUrl + 'categories/list_nested';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', 'addon');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteItemAddon(category_ID){
    const url = environment.apiUrl + 'categories/remove';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('category_ID', category_ID);
    body = body.append('type', 'addon');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // Leads

  createLead(data){
    const url = environment.apiUrl + 'leads/lead-add';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('name', data.name);
    body = body.append('email', data.email);
    body = body.append('phone', data.phone);
    body = body.append('message', data.message);
    body = body.append('company_name', data.company_name);
    body = body.append('city', data.city);
    body = body.append('zip_code', data.zip_code);
    body = body.append('country', data.country);
    body = body.append('property_code', data.property_code);
    body = body.append('rooms', data.rooms);


    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  getLeads(data){
    const url = environment.apiUrl + 'leads/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('fromDate', data.fromDate);
    body = body.append('toDate', data.toDate);
    body = body.append('status_id', data.status_id);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  getStatus(){
    const url = environment.apiUrl + 'leads/status-list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  getDetails(id){
    const url = environment.apiUrl + 'leads/details';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('lead_ID', id);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  followUp(leadObj){
    const url = environment.apiUrl + 'leads/lead-followup';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('lead_ID', leadObj.lead_ID);
    body = body.append('next_followup_date', leadObj.next_followup_date);
    body = body.append('followup_comments', leadObj.followup_comments);
    body = body.append('status_id', leadObj.status_id);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  uploadLeads(formData){
    const url = environment.apiUrl + "leads/import_lead";
    return this.http.post<any>(url, formData).pipe();
  }

  // Countries

  getCountries(){
    const url = environment.apiUrl + 'countries';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  getStates(country){
    const url = environment.apiUrl + "states";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("country_id", country);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  getCities(state){
    const url = environment.apiUrl + "cities";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("state_id", state);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  // Hotel Categories

  getHotelcategories(){
    const url = environment.apiUrl + 'categories/list_nested';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', 'hotel');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteHotelCategory(category_ID){
    const url = environment.apiUrl + 'categories/remove';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('category_ID', category_ID);
    body = body.append('type', 'hotel');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // Users

  getUserList(){
    const url = environment.apiUrl + 'user/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteUser(user_id){
    const url = environment.apiUrl + 'user/remove';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('user_id', user_id);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  userDetails(user_id){
    const url = environment.apiUrl + 'user/details';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('user_id', user_id);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  updateUser(formData) {
    const url = environment.apiUrl + "user/update";
    return this.http.post<any>(url, formData).pipe();
  }

  createUser(formData) {
    const url = environment.apiUrl + "user/create";
    return this.http.post<any>(url, formData).pipe();
  }

  // User Groups

  updateGroup(formData) {
    const url = environment.apiUrl + "user-group/update";
    return this.http.post<any>(url, formData).pipe();
  }

  createGroup(formData) {
    const url = environment.apiUrl + "user-group/create";
    return this.http.post<any>(url, formData).pipe();
  }

  getAllgrouptypes(){
    const url = environment.apiUrl + 'user-group/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  deleteUserGroup(group_ID){
    const url = environment.apiUrl + 'user-group/remove';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('group_ID', group_ID);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  getGroupDetails(group_ID){
    const url = environment.apiUrl + 'user-group/details';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('group_ID', group_ID);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // User Roles

  getUserRoles(){
    const url = environment.apiUrl + 'user-roles/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // Update Profile

  updateProfile(formData){
    const url = environment.apiUrl + "user/updateProfile";
    return this.http.post<any>(url, formData).pipe();
  }
}


