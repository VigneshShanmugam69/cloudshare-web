import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  readonly APIUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getBuckets() {
    return this.http.get(this.APIUrl + 'listbuckets')

  }

  listObjects(val: any) {
    console.log(val)
    return this.http.post(this.APIUrl + 'getobjects', val)
  }

  userLists() {
    return this.http.get(this.APIUrl + 'listLocalUsers')

  }

  addUserFields(val:any){
    return this.http.post(this.APIUrl + 'createLocalUser',val)
  }
  resetNewPassword(val:any){
    return this.http.put(this.APIUrl + 'resetPasswordByFirstLogin',val)
  }



}
