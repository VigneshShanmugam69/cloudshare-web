import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../dashboard/dashboard.service';
import Swal from 'sweetalert2';
import { ObjectpopupComponent } from '../objectpopupCopyTo/objectpopup.component';

@Component({
  selector: 'app-listobjectcopy',
  templateUrl: './listobjectcopy.component.html',
  styleUrls: ['./listobjectcopy.component.css']
})
export class ListobjectcopyComponent implements OnInit {
  objects: any;
  folders: any;
  foldername: any;
  folderPrefix: any;
  folderObj: any;
  objectlists: any;
  destinationKeyName: any;
  keyName: any;
  object: any;
  show: boolean = false;
  showCopyButton: boolean = false;
  showMoveButton: boolean = false;
  objKey: any;
  isLoading: boolean = false;
  hideTable: boolean = false;
 
  breadcrumbData: any[] = [];
  currentData: any;
  destinationBucket = this.data.destinationBucket
  dialogRef: any;
  
  // bucket: any[] = [];



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService, public dialogs: MatDialog,
  ) { }
  // Listing the object for the selected bucket
  ngOnInit() {
    this.isLoading = true;
    // this.hideTable = true;   
    this.objectlists = [];
    this.objectlists = null;
    this.breadcrumbData = [];
    this.foldername = null;
    let payload = { "Bucket": this.data.destinationBucket }
    this.auth.listObjects(payload).subscribe((res: any) => {      
      this.folders = res.commonPrefixes;
      this.objects = res.objects;
      this.objectlists = this.folders.concat(this.objects);
      this.object = this.objectlists;
      this.isLoading = false;

    })
    this.toggleButton();



  }

  //listing objects from the selected folder 

  folderObjectslist(val: any) {
    this.isLoading = true;
    this.hideTable = true;


    if (this.foldername && this.foldername !== val) {
      // concatenate the previous folder name with the new folder name
      val = `${this.foldername}${val}`;
    }
    this.foldername = val;
   
    if (this.foldername.includes("/")) {
      let payload = { "Bucket": this.data.destinationBucket, "folderPath": this.foldername }
      this.auth.folderObjects(payload).subscribe((res: any) => {
        this.folderPrefix = res?.folderNames ?? [];
        this.folderObj = res?.objects ?? [];
        this.objectlists = null;
        this.objectlists = this.folderPrefix
        this.objectlists = this.folderPrefix.concat(this.folderObj)
        this.isLoading = false;
        this.hideTable = false;


      });
    }

  }
  onclick(row: any) {
    this.destinationKeyName = row;
    this.keyName = this.destinationKeyName.split('/')
console.log("lodk",this.keyName);

  }


  // coping or moving the object from one to another bucket

  copyto() {
    this.isLoading = true;
    this.hideTable = true;
    // let destinationKeyName = this.keyName[0];
    console.log("lodjj",this.foldername);
   let folder=this.foldername.replace(/\/$/, '');
  
    // console.log("liobfolder",folder.length);
    if (this.data.action == 'copy') {
      this.objKey = this.data.sourceKeyName.Key ? this.data.sourceKeyName.Key : this.data.sourceKeyName.Prefix;

      let payload = {
        "destinationBucket": this.data.destinationBucket,
        "sourceBucket": this.data.sourceBucket,
        "sourceKeyName": this.objKey,
        // "destinationKeyName": destinationKeyName,
        "destinationKeyName": folder

      }
      console.log("lisobpay",payload);

      this.auth.copyObject(payload).subscribe((res: any) => {
        Swal.fire(res['Result'])
        this.isLoading = false;
        this.dialogs.closeAll();
        
      })
    } else {
      this.objKey = this.data.sourceKeyName.Key ? this.data.sourceKeyName.Key : this.data.sourceKeyName.Prefix;

      let payload = {
        "destinationBucket": this.data.destinationBucket,
        "sourceBucket": this.data.sourceBucket,
        "sourceKeyName": this.objKey,
        // "destinationKeyName": destinationKeyName,

      }

      this.auth.moveObject(payload).subscribe((res: any) => {
        Swal.fire(res['Result'])
        this.isLoading = false;
        this.dialogs.closeAll();
        
      })
    }
  }

  filterObjects(event: any) {
    this.objectlists = this.searchByName(event.target.value)
  }
  searchByName(value: String) {
    let temp = this.object.filter((item: any) => item?.Prefix?.toUpperCase().includes(value?.toUpperCase())
    );

    if (temp == 0) {
      this.show = true;
    }
    else {
      this.show = false;
      return temp;
    }

  }

  toggleButton() {
    if (this.data.action == 'copy') {
      this.showCopyButton = true;
      this.showMoveButton = false;
    } else {
      this.showCopyButton = false;
      this.showMoveButton = true;
    }
  }

  showDetails(item: any) {
    this.breadcrumbData.push({
            value: item,

    });
    
  }

  
  navigateToCrumb(crumb: any) {
    // Find the index of the clicked breadcrumb
    const crumbIndex = this.breadcrumbData.findIndex(c => c === crumb);

    // Remove all breadcrumbs after the clicked one
    this.breadcrumbData.splice(crumbIndex + 1);
    // Set the corresponding data as the current data

    this.foldername = this.breadcrumbData.map(obj => obj.value).join("")
console.log(this.foldername)
    this.folderObjectslist(this.foldername);

  }

  

  listbucket(){
    this.dialogs.closeAll();
    this.dialogRef = this.dialogs.open(ObjectpopupComponent, {
      width: '420px',

      data: {
        action: this.data.action,
        bucket: this.data.sourceBucket,
        object: this.data.sourceKeyName
      }
      
    })


  }






}
