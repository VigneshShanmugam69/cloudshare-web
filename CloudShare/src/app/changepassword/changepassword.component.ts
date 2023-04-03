import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../dashboard/dashboard.service';
import { DatatransferService } from '../datatransfer.service';
import { CustomValidators } from './confirmpasssword';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  
  hide = true;
  uname: string | undefined;
  constructor(private auth: AuthService, private datatransfer: DatatransferService, private route: Router) { }

  ngOnInit() {
    let userdetails = this.datatransfer.sendUserName();
    this.uname = userdetails.result['Username']
  }

  changeuserpassword = new FormGroup({
    npassword: new FormControl("", Validators.required),
    cpassword: new FormControl("", Validators.required)
  },
    [CustomValidators.MatchValidator('newpassword', 'changepassword')]
  )
  resetPassword() {
    let payload = {
      Username: this.uname,
      Password: this.changeuserpassword.controls.npassword.value,
    }
    this.auth.resetNewPassword(payload).subscribe((res: any) => {
      if(res['status']==1){
        Swal.fire(res['users']).then((result) => {
          this.route.navigate(['/userdashboard']
          )
        })
      }else{
        Swal.fire(res['users']).then((result) => {
          this.route.navigate(['']
          )
        })
      }

    }
    )

  }
}
