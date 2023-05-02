import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Route, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatatransferService } from '../datatransfer.service';
import OktaAuth from '@okta/okta-auth-js';
import { OktaAuthModule, OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isAuthenticated: boolean | undefined;

 
  hide = true;
  roles: any[] = [];
  constructor(private shared: ServiceService, private route: Router, private datatransfer:DatatransferService, private oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
   }

  async ngOnInit(): Promise<void> {
    this.getroles();
   
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  loginform = new FormGroup({
    uname: new FormControl("", [Validators.required]),
    passwd: new FormControl("", [Validators.required]),
    mode: new FormControl("", [Validators.required])

  })

 async oktasign(){
    await this.oktaAuth.signInWithRedirect();
  }

  submit() {
    if (this.loginform.valid) {
      let payload = {
        Username: this.loginform.controls.uname.value,
        Password: this.loginform.controls.passwd.value,
        RoleID: this.loginform.controls.mode.value
      }

      this.shared.login(payload).subscribe((res: any) => {
if(res['status']==1){
  localStorage.setItem('token',res['token']);
  this.loginform.reset();
  this.route.navigate(['/userdashboard']);
}
else {
  Swal.fire(res['message'])
}

        // if (res['IsVerified'] == true && res.result['IsFirst'] == 1) {

        //   this.loginform.reset();
        //   this.datatransfer.sendUserDetails(res)
        //   this.route.navigate(['/changepassword'])
        // }
        // else if (res['IsVerified'] == true && res.result['IsFirst'] == 0) {

        //   this.loginform.reset();
        //   Swal.fire(res['message']).then((result) => {
        //     this.route.navigate(['/userdashboard']);
        //   }
        //   )
        // }
        // else {
        //   Swal.fire(res['message'])
        // }
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
