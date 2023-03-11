import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
getbuckets(){
  let url = `http://localhost:4201`
  return this.http.get(url)
}
  
}
