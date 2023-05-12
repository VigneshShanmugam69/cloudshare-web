import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/dashboard/dashboard.service';
import { DatatransferService } from 'src/app/datatransfer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-useraccessmanagement',
  templateUrl: './useraccessmanagement.component.html',
  styleUrls: ['./useraccessmanagement.component.css']
})
export class UseraccessmanagementComponent {
  @Input() parentvalue: any;
  openPopup= false;
  tableName:boolean | undefined;
  addpopup=false;
  closeResult: string | undefined;


  constructor(private auth: AuthService,private datatransfer:DatatransferService,private modalService: NgbModal) { }

  ngOnInit(): void { 
    this.userList();
    this.datatransfer.tableValue.subscribe((res:any)=>{
      if(res == 'local'){
         this.tableName = true;
      } else {
        this.tableName = false;
      }
    })
    this.adduserform.controls.passwrd.disable();
  }

  displayedColumns: string[] = ['uname','ID',  'email', 'role'];  //,'Action'
  userlist: any;
  directoryuser:any;
  hideform: boolean = false;
  adduserform = new FormGroup({
    fname: new FormControl(""),
    lname: new FormControl(""),
    uname: new FormControl(""),
    gmail: new FormControl(""),
    passwrd: new FormControl(""),
    roles: new FormControl(""),
    // type: new FormControl("")
    checkUser:new FormControl("")
  })


  //listing the user in admin
  userList() {
    this.auth.listUsers().subscribe((res: any) => {
      this.userlist = res;
    })
  }
   handleValEvent(value:any){
     console.log(value)
   }
  //adding new user
  addUser() {
    let payload = {
      firstname: this.adduserform.controls.fname.value,
      lastname: this.adduserform.controls.lname.value,
      username: this.adduserform.controls.uname.value,
      email: this.adduserform.controls.gmail.value,
      roleID: this.adduserform.controls.roles.value,
      // type:this.adduserform.controls.type.value
    }
    console.log(payload);
    this.auth.addUserFields(payload).subscribe((res: any) => {

      this.adduserform.reset();
      Swal.fire(res['message']).then((result) => {
        this.userList()
      });

    })

  }

onCheck(){
  const isChecked = this.adduserform.controls.checkUser.value;
  // console.log(isChecked);
  if (isChecked) {
    this.adduserform.controls.passwrd.disable();
  } else {
    this.adduserform.controls.passwrd.enable();
  }
}
adduser(){
  // enableform=true;
  // this.openPopup = !openPopup;
  if(!this.tableName){
    this.addpopup=!this.addpopup;
  }
  else{
    this.openPopup = !this.openPopup;
  }
  

}
cancel(){
  this.openPopup = !this.openPopup;
}
  //when click add user that time hide and show the form
  showForm() {
    this.hideform = true;
  }

  // open(content: any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
}
