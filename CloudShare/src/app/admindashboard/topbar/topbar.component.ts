import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatatransferService } from 'src/app/datatransfer.service';



@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  public sidebarShow: boolean = true;
  public val = "";
  constructor(private datatransfer: DatatransferService, private route: Router) { }
  local() {
    this.val = "local"
    this.datatransfer.tablename(this.val);
    this.route.navigate(['/useraccessmanagement'])
  }
  directory() {
    this.val = "directory"
    this.datatransfer.tablename(this.val);
    this.route.navigate(['/useraccessmanagement'])
  }
}
