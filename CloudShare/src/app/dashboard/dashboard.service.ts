import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  readonly APIUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getBuckets() {
    return this.http.get(this.APIUrl + 'listbuckets')

  }

  listObjects(val: any): Observable<any> {
    // console.log(val)
    return this.http.post(this.APIUrl + 'getobjects', val)
  }

  userLists() {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'token': "Bearer "+ localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(this.APIUrl + 'listLocalUsers',httpOptions)
  }
  listUsers(){
    return this.http.get(this.APIUrl + 'listUsers');
  }

  addUserFields(val: any) {
    return this.http.post(this.APIUrl + 'createLocalUser', val)
  }
  resetNewPassword(val: any) {
    return this.http.put(this.APIUrl + 'resetPasswordByFirstLogin', val)
  }
  folderObjects(val: any) {
    return this.http.post(this.APIUrl + 'getfolderobjects', val)
  }
  getObjectTag(val: any) {
    return this.http.post(this.APIUrl + 'getObjectTag', val)
  }
  // objectheader(val: any) {
  //   return this.http.post(this.APIUrl + 'getHeadObjects', val)
  // }
  objectPermission(val: any) {
    return this.http.post(this.APIUrl + 'getAccessControlList', val)
  }



  listOfProperties(val: any) {
    return this.http.post(this.APIUrl + 'properties', val)
  }
  tags(val: any) {

    return this.http.post(this.APIUrl + 'buckettags', val)
  }
  permission(val: any) {
    return this.http.post(this.APIUrl + 'bucketPermissions', val)
  }
  headers(val: any) {
    return this.http.post(this.APIUrl + 'bucketHeaders', val)
  }
  permissionOverView(val: any) {

    return this.http.post(this.APIUrl + 'bucketPolicyStatus', val)
  }
  objectOwnerShip(val: any) {
    return this.http.post(this.APIUrl + 'objectownership', val)
  }
  cors(val: any) {
    return this.http.post(this.APIUrl + 'crossOrigin', val)
  }
  getFolderProperties(val: any) {
    return this.http.post(this.APIUrl + 'getfolderproperties', val)
  }
  copyObject(val: any) {
    return this.http.post(this.APIUrl + 'copyobject', val)
  }
  getstorage(val: any) {
    return this.http.post(this.APIUrl + 'storage', val)
  }
  bucketmanagement(val: any) {
    return this.http.post(this.APIUrl + 'bucketreplication', val)
  }
  bucketlifecyle(val:any){
    return this.http.post(this.APIUrl +'BucketLifecycle',val)
  }
  bucketinventroy(val:any){
    return this.http.post(this.APIUrl+"BucketInventory",val)
  }
  
  moveObject(val: any) {
    return this.http.post(this.APIUrl + 'moveObject',val)
  }
  totalfolder(val:any){
    return this.http.post(this.APIUrl + 'totalfolder',val)
  }
  totalobjects(val:any){
    return this.http.post(this.APIUrl +'totalobject',val)
  }
  totalfilesize(val:any){
   return this.http.post(this.APIUrl +'totalfilesize',val)
  }
  storage(val:any){
    return this.http.post(this.APIUrl +'storageclass',val)
  }


}
