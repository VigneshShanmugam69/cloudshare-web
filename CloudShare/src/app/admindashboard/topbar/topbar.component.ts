import { Component, EventEmitter, Output } from '@angular/core';
import { DatatransferService } from 'src/app/datatransfer.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  public sidebarShow: boolean = true;
  public val="";
  constructor( private datatransfer:DatatransferService){}
  // valEvent: any;
  // @Output()  valEvent = new EventEmitter<any>();
 

  local(){
this.val="local"
this.datatransfer.tablename(this.val);
// this.valEvent.emit(this.val)
  }
  directory(){
    this.val="directory"
    this.datatransfer.tablename(this.val);
  }
}
