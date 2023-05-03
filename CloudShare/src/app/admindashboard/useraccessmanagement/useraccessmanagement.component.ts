import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/dashboard/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-useraccessmanagement',
  templateUrl: './useraccessmanagement.component.html',
  styleUrls: ['./useraccessmanagement.component.css']
})
export class UseraccessmanagementComponent {
  openPopup= false;
  ngOnInit(): void {
    this.userList();
  }
  displayedColumns: string[] = ['ID', 'uname', 'email', 'role','Action'];
  userlist: any;
  hideform: boolean = false;
  adduserform = new FormGroup({
    fname: new FormControl(""),
    lname: new FormControl(""),
    uname: new FormControl(""),
    gmail: new FormControl(""),
    roles: new FormControl(""),
    type: new FormControl("")
  })



  constructor(private auth: AuthService) { }

  //listing the user in admin
  userList() {
    this.auth.listUsers().subscribe((res: any) => {
      this.userlist = res;
    })
  }

  //adding new user
  addUser() {
    let payload = {
      firstname: this.adduserform.controls.fname.value,
      lastname: this.adduserform.controls.lname.value,
      username: this.adduserform.controls.uname.value,
      email: this.adduserform.controls.gmail.value,
      roleID: this.adduserform.controls.roles.value,
      type:this.adduserform.controls.type.value
    }
    console.log(payload);
    this.auth.addUserFields(payload).subscribe((res: any) => {

      this.adduserform.reset();
      Swal.fire(res['message']).then((result) => {
        this.userList()
      });

    })

  }

  
adduser(){
  // enableform=true;
  // this.openPopup = !openPopup;
  this.openPopup = !this.openPopup;

}
cancel(){
  this.openPopup = !this.openPopup;
}
  //when click add user that time hide and show the form
  showForm() {
    this.hideform = true;
  }
}
