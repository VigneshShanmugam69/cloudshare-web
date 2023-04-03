import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Route, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatatransferService } from '../datatransfer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  hide = true;
  roles: any[] = [];
  constructor(private shared: ServiceService, private route: Router, private datatransfer:DatatransferService) { }

  ngOnInit(): void {
    this.getroles();
  }
  loginform = new FormGroup({
    uname: new FormControl("", [Validators.required]),
    passwd: new FormControl("", [Validators.required]),
    mode: new FormControl("", [Validators.required])

  })
  submit() {
    if (this.loginform.valid) {
      let payload = {
        Name: this.loginform.controls.uname.value,
        Password: this.loginform.controls.passwd.value,
        RoleID: this.loginform.controls.mode.value
      }

      this.shared.login(payload).subscribe((res: any) => {
        if (res['IsVerified'] == true && res.result['IsFirst'] == 1) {

          this.loginform.reset();
          this.datatransfer.sendUserDetails(res)
          this.route.navigate(['/changepassword'])
        }
        else if (res['IsVerified'] == true && res.result['IsFirst'] == 0) {

          this.loginform.reset();
          Swal.fire(res['message']).then((result) => {
            this.route.navigate(['/userdashboard']);
          }
          )
        }
        else {
          Swal.fire(res['message'])
        }
      })
    }
  }
  getroles() {
    this.shared.roles().subscribe((res: any) => {
      this.roles = res;
    })
  }
  get uname() {
    return this.loginform.get('uname')
  }

}
