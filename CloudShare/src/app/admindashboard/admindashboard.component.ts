import { Component } from '@angular/core';
import { AuthService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  
  
  
  constructor(private auth: AuthService) {

  }

  // userlist() {
  //   this.auth.userLists().subscribe((res: any) => {
  //     console.log(res.Users)
  //     this.userList = res.Users;
  //   })
  // }
}
