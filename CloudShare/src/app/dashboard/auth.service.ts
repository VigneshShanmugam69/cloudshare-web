import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly APIUrl = 'http://127.0.0.1:4201/';
  constructor(private http: HttpClient) { }

  getbuckets() {
    let url = `http://localhost:4201/listbuckets`
    return this.http.get(url)

  }
  listobjects(val: any) {
    console.log(val)
    return this.http.post(this.APIUrl + 'getobjects',val)
  }

}
