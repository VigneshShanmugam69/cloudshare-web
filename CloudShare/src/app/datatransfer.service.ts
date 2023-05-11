import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {
  userDetails : any;
  tableName:any;

  constructor() { }
  tablename(val: string){
    console.log(val)
    if(val=='local'){
      this.tableName=true;
    }
    else{
      this.tableName=false;
    }
    
  }
sendtablename(){
  return this.tableName;
}

sendUserDetails(data:any){
this.userDetails = data;
  }

sendUserName(){
    return this.userDetails;
  }
}
