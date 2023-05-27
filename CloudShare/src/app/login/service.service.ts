import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  readonly APIUrl = 'http://127.0.0.1:4201/';

  constructor(private http: HttpClient) { }
  login(val: any) {
    // return this.http.post(this.APIUrl + 'verifyUser',val);
    return this.http.post(this.APIUrl + 'login', val);
  }
  roles(): Observable<any> {
    let url = this.APIUrl + `getRole`
    // return this.http.get(this.APIUrl + 'getRole')
    return this.http.get(url)

  }
}
