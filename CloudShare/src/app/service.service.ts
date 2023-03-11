import { HttpClient,HttpClientModule  } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  readonly APIUrl='http://127.0.0.1:4201/';

  constructor(private http:HttpClient) { }
  login(val: any){
    return this.http.post(this.APIUrl + 'verifyUser',val);
  }
  roles(){
    return this.http.get(this.APIUrl + 'getRole')
  }
}
