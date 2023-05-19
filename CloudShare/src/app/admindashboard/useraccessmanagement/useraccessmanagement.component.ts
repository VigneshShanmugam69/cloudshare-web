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
  openPopup = false;
  tableName: boolean | undefined;
  groups: any;
  users: any;
  groupName: any[] = [];
  addpopup = false;
  removepopup: boolean = false;
  // saveCheckbox:boolean;
  closeResult: string | undefined;
  userId: any[]=[];
  groupId: any[]=[];
  usergroups: any;


  constructor(private auth: AuthService, private datatransfer: DatatransferService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listlocaluser();
    this.directoryUser();
    this.datatransfer.tableValue.subscribe((res: any) => {
      if (res == 'local') {
        this.tableName = true;
      } else {
        this.tableName = false;
      }
    })
    this.adduserform.controls.passwrd.disable();
  }

  displayedColumns: string[] = ['uname', 'ID', 'email', 'role'];  //,'Action'
  directoryuser: any;
  localuserlist: any;
  hideform: boolean = false;
  adduserform = new FormGroup({
    fname: new FormControl(""),
    lname: new FormControl(""),
    uname: new FormControl(""),
    gmail: new FormControl(""),
    passwrd: new FormControl(""),
    roles: new FormControl(""),
    checkUser: new FormControl("")
  })

  removePopup() {
    this.removepopup = !this.removepopup;
    let payload = {
      "userId": this.userId
    }
    this.auth.usergroups(payload).subscribe((res: any) => {
      this.usergroups = res;
    })
  }

  //Remove user from group
  removeuser() {
    let payload = {
      "groupId": this.groupId,
      "userId": this.userId
    }
    this.auth.removeuser(payload).subscribe((res: any) => {
      Swal.fire(res['message']).then((result) => { this.removepopup = !this.removepopup });
    })
  }

  //import user from directory to local database
  importuser(){
    let payload = {
      "groupId": this.groupId,
      "userId": this.userId
    }
    this.auth.importuser(payload).subscribe((res:any)=>{
      Swal.fire(res['message']).then((result)=>{this.addpopup=!this.addpopup;})
      this.directoryUser();
    })
  }

  //listing the local users
  listlocaluser() {
    this.auth.listlocaluser().subscribe((res: any) => {
      this.localuserlist = res.users;
    })
  }

  directoryUser() {
    this.auth.directoryuser().subscribe((res: any) => {
      this.directoryuser = res.users;
    })
  }

  //listing the user in admin
  // userList() {
  //   this.auth.listUsers().subscribe((res: any) => {
  //     this.userlist = res;
  //   })
  // }

  //adding new user
  addUser() {
    let payload = {
      firstname: this.adduserform.controls.fname.value,
      lastname: this.adduserform.controls.lname.value,
      username: this.adduserform.controls.uname.value,
      email: this.adduserform.controls.gmail.value,
      roleID: this.adduserform.controls.roles.value
    }
    this.auth.addUserFields(payload).subscribe((res: any) => {

      this.adduserform.reset();
      Swal.fire(res['message']).then((result) => {
        this.listlocaluser()
      });

    })

  }

  onCheck() {
    const isChecked = this.adduserform.controls.checkUser.value;
    if (isChecked) {
      this.adduserform.controls.passwrd.disable();
    } else {
      this.adduserform.controls.passwrd.enable();
    }
  }
  importuserpop(content: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
    
  }
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
  localuserpop(content: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }

  adduser() {
    if (!this.tableName) {
      this.auth.listGroups().subscribe((res: any) => {
        this.groups = res;
      })
      this.addpopup = !this.addpopup;

    }
    else {
      this.openPopup = !this.openPopup;
    }
  }

  groupusers(event: any, name: any,id:any) {

    if (event.target.checked) {
      this.groupName.push(name);
      this.groupId.push(id);
    }
    else {
      let index = this.groupName.indexOf(name);
      this.groupName.splice(index, 1)
      let idIndex = this.groupName.indexOf(id);
      this.groupId.splice(idIndex, 1)
    }
    let payload = {
      groupName: this.groupName
    }
    this.auth.listGroupUsers(payload).subscribe((res: any) => {
      this.users = res.response;

    })

  }

  imoprtlistuser(event: any, id: any){
    if (event.target.checked) {
      this.userId.push(id);
    }
    else {
      let index = this.groupName.indexOf(name);
      this.userId.splice(index, 1)
    }
    console.log(this.userId);
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



