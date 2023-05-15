import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../dashboard/dashboard.service';
import Swal from 'sweetalert2';

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
  show: boolean= false;
  showCopyButton: boolean = false;
  showMoveButton: boolean = false;
  objKey: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService, public dialog: MatDialog,
  ) { }
  // Listing the object for the selected bucket
  ngOnInit() {
    this.objectlists = [];
    this.objectlists = null;
    let payload = { "Bucket": this.data.destinationBucket }
    this.auth.listObjects(payload).subscribe((res: any) => {
      this.folders = res.commonPrefixes;
      this.objects = res.objects;
      this.objectlists = this.folders.concat(this.objects);
      this.object = this.objectlists;   
      

    })
    this.toggleButton();
    console.log('action',this.data.action);
  }

  //listing objects from the selected folder 

  folderObjectslist(val: any) {
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

      });
    }
  }
  onclick(row:any){
    this.destinationKeyName = row;   
    this.keyName = this.destinationKeyName.split('/')    
    
  }

  copyto(){
   
    let destinationKeyName = this.keyName[0];
    if (this.data.action == 'copy') {
      this.objKey = this.data.sourceKeyName.Key ? this.data.sourceKeyName.Key : this.data.sourceKeyName.Prefix;

      let payload = {
        "destinationBucket": this.data.destinationBucket,
        "sourceBucket": this.data.sourceBucket,
        "sourceKeyName": this.objKey,
        "destinationKeyName": destinationKeyName,
      }
      console.log("copied",payload);
      this.auth.copyObject(payload).subscribe((res: any) => {
        Swal.fire(res['Result'])
      })
    } else {
      this.objKey = this.data.sourceKeyName.Key ? this.data.sourceKeyName.Key : this.data.sourceKeyName.Prefix;

      let payload = {
        "destinationBucket": this.data.destinationBucket,
        "sourceBucket": this.data.sourceBucket,
        "sourceKeyName": this.objKey,
        "destinationKeyName":destinationKeyName,
        
      }
      console.log("moved",payload);
      this.auth.moveObject(payload).subscribe((res: any) => {
        Swal.fire(res['Result'])
      })
    }
  }

  filterObjects(event: any){
    this.objectlists = this.searchByName(event.target.value)
  }
  searchByName(value:String){
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

  toggleButton(){
    if(this.data.action == 'copy'){
      this.showCopyButton = true;
      this.showMoveButton = false;
    }else{
      this.showCopyButton = false;
      this.showMoveButton = true;
    }
  }


}
