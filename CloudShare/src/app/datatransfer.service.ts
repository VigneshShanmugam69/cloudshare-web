import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {
  userDetails : any;
  constructor() { }



  sendUserDetails(data:any){
this.userDetails = data;
  }

  sendUserName(){
    return this.userDetails;
  }
}
