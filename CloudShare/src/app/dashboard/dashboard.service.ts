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

}
