import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../dashboard/dashboard.service';
import { FormControl, FormGroup } from '@angular/forms';

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
  copyResult: any;
  moveResult: any;
  bucketName: any;
  show: boolean = false;
  


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService,public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getbuckets();
  }
  
  SearchForm = new FormGroup({
    search : new FormControl('')
  })

  bucketForm = new FormGroup({
    bucketform : new FormControl('')

  })

  getbuckets(){
    this.buckets = [];
    this.buckets = null;
    this.auth.getBuckets().subscribe((res: any) => {
      this.buckets = res;
      this.bucketName = this.buckets;
    })
  }

  refresh(){
    console.log("opo")
    this.SearchForm.reset();
    this.bucketForm.reset();
    this.show = false;
    this.getbuckets();

      }

  // objectCopy(action: string) {
    objectCopy() {
    if (this.data.action == 'copy') {
      this.objKey = this.data.object.Key ? this.data.object.Key : this.data.object.Prefix;

      let payload = {
        "destinationBucket": this.destinationBucket,
        "sourceBucket": this.sourceBucket,
        "sourceKeyName": this.objKey,
        "destinationKeyName":null
      }
      console.log(payload);
      console.log(this.objKey);
      console.log(this.destinationBucket);

      this.auth.copyObject(payload).subscribe((res: any) => {
        console.log("j",res)
        this.copyResult = res
      })
    } else {
      this.objKey = this.data.object.Key ? this.data.object.Key : this.data.object.Prefix;

      let payload = {
        "destinationBucket": this.destinationBucket,
        "sourceBucket": this.sourceBucket,
        "folderName": this.objKey
      }

      this.auth.moveObject(payload).subscribe((res: any) => {
        this.moveResult = res
      })


    }


  }
  //Filter Option
  filterBuckets(event: any) {
    console.log(event.value)

    this.buckets = this.searchByName(event.target.value)

  }
  searchByName(value: String) {
    let temp = this.bucketName.filter((item: any) => item.Name.toLowerCase().startsWith(value)
    );
    if (temp == 0) {
      this.show = true;
    }
    else {
      this.show = false;
      return temp;
    }
  }
}
