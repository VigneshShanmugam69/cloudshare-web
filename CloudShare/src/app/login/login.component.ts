import { Component, OnInit } from '@angular/core';
import{ServiceService} from './service.service';
import { Route, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  select :any[]=[];
  constructor(private shared:ServiceService ,private route:Router) { }

  ngOnInit(): void {
    this.getroles();
  }
  loginform = new FormGroup({
    uname : new FormControl("",[Validators.required]),
    passwd : new FormControl("",[Validators.required]),
    mode : new FormControl("",[Validators.required])  
  
    })
  submit(){
    if(this.loginform.valid){
      let payload ={
        Name:this.loginform.controls.uname.value,
        Password:this.loginform.controls.passwd.value,
        RoleID:this.loginform.controls.mode.value
      }
 
    this.shared.login(payload).subscribe((res:any)=>{
    if(res['IsVerified'] == true){
          
          this.loginform.reset();
          Swal.fire(res['message']).then((result)=>{
            this.route.navigate(['/userdashboard'])
          })
          
          
          }
    else{
      Swal.fire(res['message'])
    }
  })
  }
  }
  getroles(){
  this.shared.roles().subscribe((res:any)=>{
    this.select = res;
  })
}
  get uname(){
    return this.loginform.get('uname')
  }

}
