import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
// import { Component } from '@angular/core';
import { AuthService } from './dashboard.service';
import { environment } from 'src/environments/environment.development';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, HostListener, ViewChild, TemplateRef } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ObjectpopupComponent } from '../objectpopupCopyTo/objectpopup.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';

export interface PeriodicElements {
  name: string;
  position: string;
}
const ELEMENT_DATA: PeriodicElements[] = [
  { position: 'bucketReplication', name: 'bucketReplication' },
  { position: 'bucketlifecycle', name: 'bucketlifecycle' },
  { position: 'bucketinventory', name: 'bucketinventory' },
];
export interface Element {
  Totalfolder: string;
}
const ELEMENT_DATAS: Element[] = [
  { Totalfolder: 'Totalfolder' },
  { Totalfolder: 'Totalobject' },
  { Totalfolder: 'Totalfilesize' },
  { Totalfolder: 'storageclass' },
];

interface propertiesnood {
  name: string;
  children?: propertiesnood[];
}

export interface PeriodicElement {
  Key: string;

  value: string;
  values: string;
}

let TREE_DATA: propertiesnood[] = [
  {
    name: 'Properties',
    children: [{ name: `` }],
  },
  {
    name: 'Tags',
    children: [{ name: `` }],
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
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  displayedColumn: string[] = ['position', 'name'];
  dataSources = ELEMENT_DATA;

  buckets: any;
  name: any;
  Objects: any;
  folders: any[] = [];
  displayedColumns: string[] = ['name', 'Size', 'datetime'];
  objectlists: any;
  treeControl = new NestedTreeControl<propertiesnood>((node) => node.children);
  propertiesinfo = new MatTreeNestedDataSource<propertiesnood>();
  enableTree = true;
  enableTreefolder: Boolean = true;
  showMessage: Boolean = false;
  storagetable: Boolean = false;
  displayColum: string[] = ['Key', 'value'];
  Data = ELEMENT_DATAS;

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
  loading :boolean = false;

  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;

  PropertiesdisplayedColumns: string[] = ['Key', 'value'];
  // displycolumn:string[]=['TotalFolder']
  PeriodicElements: any;
  // dataSource1:any;

  //PropertiesdisplayedColumns: string[] = ['Key', 'value'];
  PropertiesdisplayedColumns1: string[] = ['Keys', 'value'];
  dataSource: any[] = [];
  property: any;
  pro: any;
  isLoading: boolean = false;
  hideTable: boolean = true;
  falseTable: boolean = false;
  //showBucket: boolean = false;
  res: any;

  selectedRowIndex: any;
  tableObjects: any;
  rowValue: any;
  folderPrefix: any;
  folderObj: any;
  objectLists: null | undefined;
  filePath: any;

  dataSource1: any;
  response: any;
  @ViewChild('myCityDialog') cityDialog = {} as TemplateRef<any>;
  @ViewChild('myCityDialog1') cityDialog1 = {} as TemplateRef<any>;
  @ViewChild('myCityDialog2') cityDialog2 = {} as TemplateRef<any>;
  dialogRef: any;
  response1: any;
  results: any;
  message: any;
  msg: any = [];
  msgs: any;
  val: any;
  value: any;
  DataSource: any;
  storages: any;
  object: any;
  folder: any;
  filesize: any;
  class: any;
  refresh: any;
  filesizes: any;
  storageclas: any;
  objects: any;

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private oktaAuth: OktaAuthService,
    private route: Router
  ) {
    this.propertiesinfo.data = TREE_DATA;
  }

  hasChild = (_: number, node: propertiesnood) =>
    !!node.children && node.children.length > 0;

  // list the buckets
  account() {
    this.auth.getBuckets().subscribe((res: any) => {
      this.buckets = res;
    });

    //   this.auth.userLists().subscribe((res:any)=>{
    //     console.log(res);
    // })
  }

  // list the objects from the selecting bucket
  objectList(val: any) {
    this.foldername = [];
    this.bucketname = val
    let payload = { "Bucket": val }
    this.auth.listObjects(payload).subscribe((res: any) => {
      this.folders = res.commonPrefixes;
      this.Objects = res.objects;
      this.objectlists = this.folders.concat(this.Objects);
    });
  }
  //listing objects from the folder 
  folderObjectslist(val: any) {
    this.loading = true;
    if (this.foldername && this.foldername !== val) {
      // concatenate the previous folder name with the new folder name
      val = `${this.foldername}${val}`;
    }
    this.foldername = val;
    if (this.foldername.includes("/")) {
      let payload = { "Bucket": this.bucketname, "folderPath": this.foldername }
      this.auth.folderObjects(payload).subscribe((res: any) => {
        this.loading = false;
        this.folderPrefix = res?.folderNames ?? [];
        this.folderObj = res?.objects ?? [];       
        this.objectlists = null;
        this.objectlists = this.folderPrefix
        this.objectlists = this.folderPrefix.concat(this.folderObj)

        //To list the properties in a object
        //     this.enableTree = false;
        //     this.auth.getFolderProperties(payload).subscribe((res: any) => {
        //       var output = Object.entries(res).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
        //       TREE_DATA[0].children = output;
        //       this.propertiesinfo.data = TREE_DATA;
        //       this.enableTree = true;
        //     })
        //   })
        // } else {

        // let payload = { "Bucket": this.bucketname, "Key": this.foldername }

        // //To list the tags in a object
        // this.enableTree = false;
        // this.auth.getObjectTag(payload).subscribe((res1: any) => {
        //   var out = Object.entries(res1).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
        //   TREE_DATA[1].children = out;
        //   this.propertiesinfo.data = TREE_DATA;
        //   this.enableTree = true;

      });
    } else {
      let payload = { Bucket: this.bucketname, Key: this.foldername };

      //To list the tags in a object
      this.enableTree = false;
      this.auth.getObjectTag(payload).subscribe((res1: any) => {
        var out = Object.entries(res1).map(([key, value]) => ({
          name: String(key) + ': ' + String(value),
        }));
        TREE_DATA[1].children = out;
        this.propertiesinfo.data = TREE_DATA;
        this.enableTree = true;
      });
    }
  }

  //To list out properties in a bucket
  bucketproperties() {
    this.isLoading = true;

    let payload = { Bucket: this.bucketname };
    this.auth.listOfProperties(payload).subscribe((res: any) => {
      var result = Object.entries(res[0]).map(([key, value]) => ({
        key: String(key) + ': ',
        value: String(value),
      }));
      this.res = result;
      this.dataSource = this.res;
      this.isLoading = false;
    });
    this.hideTable = true;
    this.falseTable = false;
    this.storagetable = false;
  }

  //To list the tags in abucket
  buckettags() {
    this.isLoading = true;
    this.hideTable = true;
    this.falseTable = false;
    this.storagetable = false;
    let payload = { Bucket: this.bucketname };
    this.auth.tags(payload).subscribe((res: any) => {
      var result = Object.entries(res.Result[0] || res.TagSet[0]).map(
        ([key, value]) => ({ key: String(key) + ': ', value: String(value) })
      );
      this.res = result;
      this.dataSource = this.res;
      this.isLoading = false;
    });
  }

  //to list out the headers information in a buckets

  contextMenuPosition = { x: '0px', y: '0px' };
  onContextMenu(event: MouseEvent, row: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.openMenu();

  }

  // menuClose() {
  //   this.contextMenu!.closeMenu();
  // }

  onRowClick(row: any) {
    this.rowValue = row;
  }

  // open the popup both right use (contextmenu) and left click (click)

  copyto(action: string) {
    // event.preventDefault();
    this.tableObjects = this.rowValue;
    console.log(this.rowValue);
    this.contextMenu.closeMenu();

    this.dialogRef = this.dialog.open(ObjectpopupComponent, {
      width: '420px',

      data: {
        action: action,
        bucket: this.bucketname,
        object: this.tableObjects
      }
    });

  }

  @HostListener('document:keydown.control.shift.c', ['$event'])
  @HostListener('document:keydown.control.shift.x', ['$event'])
  onCustomKeyDown(event: KeyboardEvent, row: any) {
    this.tableObjects = this.rowValue;

    const dialog = this.dialog.open(ObjectpopupComponent, {
      width: '420px',
      data: {
        bucket: this.bucketname,
        object: this.tableObjects,
      },
    });

    dialog.afterClosed().subscribe((result) => { });
  }

  logout() {
    window.sessionStorage.clear();
    this.route.navigate(['']);

    // await this.oktaAuth.signOut()
  }

  //   var result = Object.entries(res.Result[0] || res.TagSet[0]).map(
  //     ([key, value]) => ({ key: String(key) + ': ', value: String(value) })
  //   );
  //   this.res = result;
  //   this.dataSource = this.res;
  //   this.isLoading = false;
  // });

  //to list out the headers information in a buckets
  bucketheaders() {
    this.isLoading = true;
    this.hideTable = true;
    this.falseTable = false;
    this.storagetable = false;
    let payload = { Bucket: this.bucketname };
    this.auth.headers(payload).subscribe((res: any) => {
      var result = Object.entries(res.Result).map(([key, value]) => ({
        key: String(key) + ': ',
        value: String(value),
      }));
      this.res = result;
      this.dataSource = this.res;
      this.isLoading = false;
    });
  }
  //To list the all permission in a bucket
  bucketpermission() {
    this.isLoading = true;
    this.hideTable = true;
    this.storagetable = false;
    this.falseTable = false;
    let payload = { Bucket: this.bucketname };
    this.auth.permission(payload).subscribe((res: any) => {
      var result = Object.entries(res.Result).map(([key, value]) => ({
        key: String(key) + ': ',
        value: String(value),
      }));
      this.res = result;
      this.dataSource = this.res;

      this.isLoading = false;
    });
  }


  //To list the all permission in a bucket

  bucketstorages() {
    this.storagetable = true;
    this.falseTable = false;
    this.hideTable = false;

    let payload = { Bucket: this.bucketname };
    this.auth.totalfolder(payload).subscribe((res: any) => {
      this.res = res;
      this.storages = res;
      console.log('datasourcessr', this.storages);

    });

  }

  totalfilesize() {
    let payload = { Bucket: this.bucketname };
    this.auth.totalfilesize(payload).subscribe((res: any) => {
      this.res = res;
      this.filesizes = res;
      console.log('filesizes', this.filesizes);
    });

  }
  storageclass() {
    this.storagetable = true;
    this.falseTable = false;
    this.hideTable = false;

    let payload = { Bucket: this.bucketname };
    this.auth.storage(payload).subscribe((res: any) => {

      this.res = res;
      this.storageclas = res;
      console.log('datasource', this.storageclas);
    });
  }
  totalobjects() {
    this.storagetable = true;
    this.falseTable = false;
    this.hideTable = false;

    let payload = { Bucket: this.bucketname };
    this.auth.totalobjects(payload).subscribe((res: any) => {
      this.res = res;
      this.objects = res;
      console.log('object', this.object);

      //this.refresh= this.object=[]=[]
    });
  }
  bucketstoragess() {

    this.storagetable = true;
    this.falseTable = false;
    this.hideTable = false;
    this.bucketstorages()
    this.totalobjects()
    this.storageclass()

  }

  //----------------
  totalobject(name: string) {

    {

      if (name == 'Totalobject') {


        this.storagetable = true;
        this.falseTable = false;
        this.hideTable = false;

        let payload = { Bucket: this.bucketname };
        this.auth.totalobjects(payload).subscribe((res: any) => {
          this.res = res;
          this.object = res;
          console.log('object', this.object);

          //this.refresh= this.object=[]=[]
        });

      };

      if (name == 'Totalfolder') {
        this.storagetable = true;
        this.falseTable = false;
        this.hideTable = false;
        let payload = { Bucket: this.bucketname };
        this.auth.totalfolder(payload).subscribe((res: any) => {
          this.res = res;
          this.folder = res;


          console.log('folder', this.folder);
        });
      };

      if (name == 'Totalfilesize') {
        this.storagetable = true;
        this.falseTable = false;
        this.hideTable = false;

        let payload = { Bucket: this.bucketname };
        this.auth.totalfilesize(payload).subscribe((res: any) => {
          this.res = res;
          this.filesize = res;
          console.log('filesize', this.filesize);
        });
      };
      if (name == 'storageclass') {
        this.storagetable = true;
        this.falseTable = false;
        this.hideTable = false;

        let payload = { Bucket: this.bucketname };
        this.auth.storage(payload).subscribe((res?: any) => {
          this.res = res;
          this.class = res;
          console.log('class', this.class);

        });
      };

    }


  }

  bucketmanagements() {
    this.hideTable = false;
    this.falseTable = true;
    this.storagetable = false;

    let payload = { Bucket: this.bucketname };

    this.auth.bucketmanagement(payload).subscribe((res: any) => {
      this.dataSource1 = res.bucketReplication;
      this.msgs = this.dataSource1;
      this.value = this.dataSource1.Message;


      this.msgs = this.dataSource1;

      this.value = this.dataSource1[0].Message;
      console.log('value', this.value);

      if (this.value) {
        this.showMessage = false;
      } else {
        this.showMessage = true;
      }
    });
  }
  bucketlifecyle() {
    let payload = { Bucket: this.bucketname };
    this.auth.bucketlifecyle(payload).subscribe((res: any) => {
      this.response1 = res.BucketLifecycle;
      this.val = res.BucketLifecycle.message;
      this.msg = this.val;
      if (this.msg) {
        this.showMessage = false;
      } else {
        this.showMessage = true;
      }
    });
  }
  bucketinventory() {
    let payload = { Bucket: this.bucketname };
    this.auth.bucketinventroy(payload).subscribe((res: any) => {
      this.results = res.BucketInventory;
      this.message = this.results[0].Message;
      console.log('buc', this.message);
      if (this.message) {
        this.showMessage = false;
      } else {
        this.showMessage = true;
      }
    });
  }
  openCityDialog(name: string) {
    if (name == 'bucketReplication') {
      const dialogRef = this.dialog.open(this.cityDialog);
      this.bucketmanagements();
      dialogRef.disableClose = true;
    } else if (name == 'bucketlifecycle') {
      const dialogRef = this.dialog.open(this.cityDialog1);
      this.bucketlifecyle();
      dialogRef.disableClose = true;
    } else if (name == 'bucketinventory') {
      const dialogRef = this.dialog.open(this.cityDialog2);
      this.bucketinventory();
      dialogRef.disableClose = true;
    }
  }

  storage(name: string) { }
}
