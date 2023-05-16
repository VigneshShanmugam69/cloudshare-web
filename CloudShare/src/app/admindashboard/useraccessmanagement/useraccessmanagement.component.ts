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
  groups:any;
  users:any;
  groupName: any[] = [];
  addpopup=false;
  // saveCheckbox:boolean;
  closeResult: string | undefined;


  constructor(private auth: AuthService,private datatransfer:DatatransferService,private modalService: NgbModal) { }

  ngOnInit(): void { 
    this.listlocaluser();
    this.directoryUser();
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
  directoryuser: any;
  localuserlist:any;
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

  //listing the local users
  listlocaluser(){
    this.auth.listlocaluser().subscribe((res:any)=>{
      this.localuserlist=res.users;
      console.log(this.localuserlist);
    })
  }

  directoryUser(){
    this.auth.directoryuser().subscribe((res:any)=>{
      this.directoryuser=res.users;
    })
  }
  //listing the user in admin
  // userList() {
  //   this.auth.listUsers().subscribe((res: any) => {
  //     this.userlist = res;
  //   })
  // }
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
    // console.log(payload);
    this.auth.addUserFields(payload).subscribe((res: any) => {

      this.adduserform.reset();
      Swal.fire(res['message']).then((result) => {
        this.listlocaluser()
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
    this.auth.listGroups().subscribe((res: any)=>{
      this.groups=res;
      // console.log(this.groups)
    })
    this.addpopup=!this.addpopup;
    
  }
  else{
    this.openPopup = !this.openPopup;
  }
}
cancel(){
  this.openPopup = !this.openPopup;
}
dcancel(){
  this.addpopup=!this.addpopup;
}
groupusers(event: any,name: any){

  if(event.target.checked){
     this.groupName.push(name);
  }
  else{
    let index=this.groupName.indexOf(name);
    this.groupName.splice(index,1)
  }
  let  payload={
    groupName:this.groupName
  }
  
this.auth.listGroupUsers(payload).subscribe((res:any)=>{
  // console.log(res);
  this.users=res;

}) 
  
}
  //when click add user that time hide and show the form
  showForm() {
    this.hideform = true;
  }

  onResizeStart(event: MouseEvent): void {
    const handle = event.target as HTMLElement;
  const th = this.findParentTh(handle);
      if (th) {
        const initialWidth = th.offsetWidth;
        const startX = event.pageX;

    const onMouseMove = (e: MouseEvent) => {
      const width = initialWidth + (e.pageX - startX);
      th.style.width = width + 'px';
    };
      const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }
  }
  private findParentTh(element: HTMLElement): HTMLTableHeaderCellElement | null {
    while (element && element.tagName !== 'TH') {
      element = element.parentElement as HTMLElement;
    }
  
    return element as HTMLTableHeaderCellElement;
  }


}



