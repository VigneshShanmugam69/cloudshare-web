import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ListobjectcopyComponent } from '../listobjectcopy/listobjectcopy.component';
import Swal from 'sweetalert2';
import { AuthService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-objectpopup',
  templateUrl: './objectpopup.component.html',
  styleUrls: ['./objectpopup.component.css']
})
export class ObjectpopupComponent implements OnInit {
  buckets: any;
  destinationBucket: any;
  sourceBucket = this.data.bucket;
  Source = this.data;
  objKey: any;
  bucketName: any;
  show: boolean = false;
  showCopyButton: boolean = false;
  showMoveButton: boolean = false;
  dialogRef: any;
  sourceObject = this.data.object;
  isLoading: boolean = false;
  hidecard: boolean = false;
  disabledCopyButton: boolean = true;
  disabledMoveButton: boolean = true;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService, public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getbuckets();
    this.toggleButtons();
    console.log("obsource",this.data)


  }

  // SearchForm = new FormGroup({
  //   search: new FormControl('')
  // })

  // bucketForm = new FormGroup({
  //   bucketform: new FormControl('')

  // })

  getbuckets() {
    this.isLoading = true;
    this.buckets = [];
    this.buckets = null;
    this.auth.getBuckets().subscribe((res: any) => {
      this.buckets = res;
      this.bucketName = this.buckets;
      this.isLoading = false;
    })
  }

  // refresh() {
  // How to use form group and form controll in angular
  //   this.SearchForm.reset();
  //   this.bucketForm.reset();
  //   this.show = false;
  //   this.getbuckets();

  // }
  toggleButtons() {
    if (this.data.action == 'copy') {
      this.showCopyButton = true;
      this.showMoveButton = false;
    } else {
      this.showCopyButton = false;
      this.showMoveButton = true;
    }

  }
  onRowClick(row: any) {
    this.destinationBucket = row;
    this.disabledCopyButton = false;
    this.disabledMoveButton = false;
  }

  // objectCopy(action: string) {
  objectCopy() {
    this.isLoading = true;
    this.hidecard = true;
    if (this.data.action == 'copy') {
      this.objKey = this.data.object.Key ? this.data.object.Key : this.data.object.Prefix;

      let payload = {
        "destinationBucket": this.destinationBucket,
        "sourceBucket": this.sourceBucket,
        "sourceKeyName": this.objKey,
        "destinationKeyName": null
      }
      this.auth.copyObject(payload).subscribe((res: any) => {
        Swal.fire(res['Result'])
        this.dialog.closeAll();
        this.isLoading = false;
        // this.hidecard = false;
        
      })

    } else {
      this.objKey = this.data.object.Key ? this.data.object.Key : this.data.object.Prefix;

      let payload = {
        "destinationBucket": this.destinationBucket,
        "sourceBucket": this.sourceBucket,
        "sourceKeyName": this.objKey,
        "destinationKeyName": null
      }
      this.auth.moveObject(payload).subscribe((res: any) => {
        Swal.fire(res['Result'])
        this.dialog.closeAll();
        this.isLoading = false;
        // this.hidecard = false;
      })


    }


  }
  //Filter Option
  filterBuckets(event: any) {
    this.buckets = this.searchByName(event.target.value)

  }

  searchByName(value: String) {
    // let temp = this.bucketName.filter((item: any) => item.Name.toLowerCase().startsWith(value)
    // );
    let temp = this.bucketName.filter((item: any) => item.Name.toLowerCase().includes(value)
    );
    if (temp == 0) {
      this.show = true;
    }
    else {
      this.show = false;
      return temp;
    }
  }

  listobject() {
    this.dialog.closeAll();
    this.dialogRef = this.dialog.open(ListobjectcopyComponent, {
      data: {
        action: this.data.action,
        "destinationBucket": this.destinationBucket,
        "sourceBucket": this.sourceBucket,
        "sourceKeyName": this.data.object,

      }


    })

  }
}
