import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  listObjects(payload: { Bucket: any; }) {
    throw new Error('Method not implemented.');
  }
  readonly APIUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getbuckets() {
    return this.http.get(this.APIUrl + 'listbuckets')

  }

  listobjects(val: any) {
    console.log(val)
    return this.http.post(this.APIUrl + 'getobjects', val)
  }

}
