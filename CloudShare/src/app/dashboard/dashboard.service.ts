import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(this.APIUrl + 'listLocalUsers')

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
  permissionOverView(val:any){

    return this.http.post(this.APIUrl +'bucketPolicyStatus',val)
  }
  objectOwnerShip(val:any){
    return this.http.post(this.APIUrl +'objectownership',val)
  }
  cors(val:any){
    return this.http.post(this.APIUrl +'crossOrigin',val)
  }



}
