import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
// import { Component } from '@angular/core';
import { AuthService } from './dashboard.service';
import { environment } from 'src/environments/environment.development';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ObjectpopupComponent } from '../objectpopupCopyTo/objectpopup.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';




interface propertiesnood {
  name: string;
  children?: propertiesnood[];
}

export interface PeriodicElement {
  Key: string;

  value: string;
}



let TREE_DATA: propertiesnood[] = [
  {
    name: 'Properties',
    children: [{ name: `` }],
  },
  {
    name: 'Tags',
    children: [{ name: `` }]

  },

  {
    name: 'Headers',
    children: [{ name: `` }],
  },
  {
    name: 'permissions',
    children: [
      {
        name: 'permission overview',
        children: [{ name: '' }, { name: ' ' }],
      },
      {
        name: 'objectownership',
        children: [{ name: '' }, { name: '' }],
      },
      {
        name: 'Accesscontrollist',
        children: [{ name: '' }, { name: '' }],
      },
      {
        name: 'cors',
        children: [{ name: '' }, { name: '' }],
      },
    ],
  },

];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //accounts
  buckets: any;
  name: any;
  Objects: any;
  folders: any[] = [];
  displayedColumns: string[] = ['name', 'Size', 'datetime'];
  objectlists: any;
  treeControl = new NestedTreeControl<propertiesnood>(node => node.children);
  propertiesinfo = new MatTreeNestedDataSource<propertiesnood>();
  enableTree = true;
  enableTreefolder: Boolean = true;
  properties: any;
  Tags: any;
  tag: any;
  foldername: any;
  objectname: any;
  bucketname: any;
  folderObjectlists: any;
  folderorobjectname: any;
  Key: any;
  objectsname: any;



  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;

  PropertiesdisplayedColumns: string[] = ['Key', 'value'];
  dataSource: any[] = [];
  property: any;
  pro: any;
  isLoading: boolean = false;
  res: any;

  selectedRowIndex: any;
  tableObjects: any;
  rowValue: any;

  constructor(private auth: AuthService, public dialog: MatDialog, private oktaAuth: OktaAuthService, private route: Router) {
    this.propertiesinfo.data = TREE_DATA;
  }
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = localStorage.getItem('token'); // you probably want to store it in localStorage or something

  //   if (!token) {
  //     return next.handle(req);
  //   }

  //   const req1 = req.clone({
  //     headers: req.headers.set('token', `Bearer ${token}`),
  //   });

  //   return next.handle(req1);
  // }

  hasChild = (_: number, node: propertiesnood) => !!node.children && node.children.length > 0;

  // list the buckets
  account() {
    // let payload={
    //   token:'Bearer '+localStorage.getItem('token')
    // }
    // console.log(payload)
    this.auth.getBuckets().subscribe((res: any) => {
      this.buckets = res;

    })

    //   this.auth.userLists().subscribe((res:any)=>{
    //     console.log(res);
    // })
  }




  // list the objects from the selecting bucket
  objectList(val: any) {
    this.bucketname = val
    let payload = { "Bucket": val }
    this.auth.listObjects(payload).subscribe((res: any) => {
      this.folders = res.commonPrefixes
      this.Objects = res.objects
      this.objectlists = this.folders.concat(this.Objects)


      //   this.enableTree = false;
      //   this.auth.listOfProperties(payload).subscribe((res: any) => {

      //     var output = Object.entries(res).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
      //     TREE_DATA[0].children = output;
      //     this.propertiesinfo.data = TREE_DATA;
      //     this.enableTree = true;


      //     //This for tags api integration
      //     this.enableTree = false;
      //     this.auth.tags(payload).subscribe((res1: any) => {
      //       var out = Object.entries(res1.Result[0]).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
      //       TREE_DATA[1].children = out;
      //       this.propertiesinfo.data = TREE_DATA;
      //       this.enableTree = true;

      //       //this for headers API integration

      //       this.enableTree = false;
      //       this.auth.headers(payload).subscribe((res: any) => {
      //         var out1 = Object.entries(res.Result).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
      //         TREE_DATA[2].children = out1;
      //         this.propertiesinfo.data = TREE_DATA;
      //         this.enableTree = true;


      //         //permission  api integration
      //         this.enableTree = false;
      //         this.auth.permissionOverView(payload).subscribe((response: any) => {
      //           var out2 = Object.entries(response.Result).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
      //           if (TREE_DATA[3].children) {
      //             TREE_DATA[3].children[0].children = out2;
      //           }
      //           this.propertiesinfo.data = TREE_DATA
      //           this.enableTree = true;

      //           //permission objectOwnership

      //           this.enableTree = false;
      //           this.auth.objectOwnerShip(payload).subscribe((response: any) => {

      //             var out2 = Object.entries(response.Result[0]).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));

      //             if (TREE_DATA[3].children) {
      //               TREE_DATA[3].children[1].children = out2;
      //             }
      //             this.propertiesinfo.data = TREE_DATA
      //             this.enableTree = true;


      //             this.enableTree = false;
      //             this.auth.permission(payload).subscribe((response: any) => {

      //               var out2 = Object.entries(response.Result[0]).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));

      //               if (TREE_DATA[3].children) {
      //                 TREE_DATA[3].children[2].children = out2;
      //               }
      //               this.propertiesinfo.data = TREE_DATA
      //               this.enableTree = true;

      //               this.enableTree = false;
      //               this.auth.cors(payload).subscribe((response: any) => {

      //                 var out2 = Object.entries(response.Result[0]).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));

      //                 if (TREE_DATA[3].children) {
      //                   TREE_DATA[3].children[3].children = out2;
      //                 }
      //                 this.propertiesinfo.data = TREE_DATA
      //                 this.enableTree = true;

      //               })

      //             })
      //           })
      //         })
      //       })
      //     })
      //   })
    })


  }
  //listing objects from the folder
  folderObjectslist(val: any) {
    this.foldername = val
    if (this.foldername.includes("/")) {
      let payload = { "Bucket": this.bucketname, "folderPath": this.foldername }
      this.auth.folderObjects(payload).subscribe((res: any) => {
        this.folderObjectlists = res

        //To list the properties in a object
        this.enableTree = false;
        this.auth.getFolderProperties(payload).subscribe((res: any) => {
          var output = Object.entries(res).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
          TREE_DATA[0].children = output;
          this.propertiesinfo.data = TREE_DATA;
          this.enableTree = true;
        })
      })
    } else {

      let payload = { "Bucket": this.bucketname, "Key": this.foldername }

      //To list the tags in a object
      this.enableTree = false;
      this.auth.getObjectTag(payload).subscribe((res1: any) => {
        var out = Object.entries(res1).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
        TREE_DATA[1].children = out;
        this.propertiesinfo.data = TREE_DATA;
        this.enableTree = true;



        //To list the Header in a object

        // this.enableTree = false;
        // this.auth.objectheader(payload).subscribe((res: any) => {
        //   var out1 = Object.entries(res).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
        //   TREE_DATA[2].children = out1;
        //   this.propertiesinfo.data = TREE_DATA;
        //   this.enableTree = true;

        //   //To list the ACLpermissions in a object
        //   this.enableTree = false;
        //   this.auth.objectPermission(payload).subscribe((response: any) => {

        //     var out2 = Object.entries(response[0].Grantee).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));

        //     if (TREE_DATA[3].children) {
        //       TREE_DATA[3].children[2].children = out2;
        //     }
        //     this.propertiesinfo.data = TREE_DATA
        //     this.enableTree = true;
        //   })
        // })
      })
    }
  }

  //To list out properties in a bucket
  bucketproperties() {
    this.isLoading = true;

    let payload = { "Bucket": this.bucketname }
    this.auth.listOfProperties(payload).subscribe((res: any) => {
      var result = Object.entries(res[0]).map(([key, value]) => ({ key: String(key) + ': ', value: String(value) }));
      this.res = result
      this.dataSource = this.res
      this.isLoading = false;

    })
  }

  //To list the tags in abucket
  buckettags() {
    this.isLoading = true;
    let payload = { "Bucket": this.bucketname }
    this.auth.tags(payload).subscribe((res: any) => {
      var result = Object.entries(res.Result[0] || res.TagSet[0]).map(([key, value]) => ({ key: String(key) + ': ', value: String(value) }));
      this.res = result
      this.dataSource = this.res
      this.isLoading = false;
    })
  }

  //to list out the headers information in a buckets 
  bucketheaders() {
    this.isLoading = true;
    let payload = { "Bucket": this.bucketname }
    this.auth.headers(payload).subscribe((res: any) => {
      var result = Object.entries(res.Result).map(([key, value]) => ({ key: String(key) + ': ', value: String(value) }));
      this.res = result
      this.dataSource = this.res
      this.isLoading = false;


    })
  }
  //To list the all permission in a bucket
  bucketpermission() {
    this.isLoading = true;
    let payload = { "Bucket": this.bucketname }
    this.auth.permission(payload).subscribe((res: any) => {
      var result = Object.entries(res.Result).map(([key, value]) => ({ key: String(key) + ': ', value: String(value) }));
      this.res = result
      this.dataSource = this.res
      this.isLoading = false;

    })
  }


  contextMenuPosition = { x: '0px', y: '0px' };
  onContextMenu(event: MouseEvent, row: any) {

    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.openMenu();
  }
  onRowClick(row: any) {
    this.rowValue = row;
    console.log("rowvalue", this.rowValue)

  }
  // open the popup both right use (contextmenu) and left click (click)




  copyto() {
    // event.preventDefault();
    this.tableObjects = this.rowValue;
    console.log("tableObjects Key: ", this.tableObjects.Key);
    const dialogRef = this.dialog.open(ObjectpopupComponent, {

      width: '414px',
      height: '350px',


      data: {
        bucket: this.bucketname,
        object: this.tableObjects
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }





  @HostListener('document:keydown.control.shift.c', ['$event'])
  onCustomKeyDown(event: KeyboardEvent, row: any) {
    this.tableObjects = this.rowValue;

    console.log("keyboard", this.tableObjects)
    const dialog = this.dialog.open(ObjectpopupComponent, {
      width: '414px',
      height: '350px',
      data: {
        bucket: this.bucketname,
        object: this.tableObjects
      }
    });
    dialog.afterClosed().subscribe(result => {

    });

  }

  logout() {
    window.sessionStorage.clear();
    this.route.navigate(['']);

    // await this.oktaAuth.signOut()
  }
}



