import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {
  userDetails : any;
  constructor() { }

  tableName:any;

  private _tableVable = new Subject<any>;
  tableValue= this._tableVable.asObservable()


  // tablename(val: string){
  //   console.log(val)
  //   if(val=='local'){
  //     this.tableName=true;
  //   }
  //   else{
  //     this.tableName=false;
  //   }
    
  // }

tablename(Value:any){

  if(Value=='local'){
this._tableVable.next(true);
  }
  else{
    this._tableVable.next(false);
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
