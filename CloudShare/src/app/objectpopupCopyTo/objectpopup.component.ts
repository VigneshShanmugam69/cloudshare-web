import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  copyResult: any;
  moveResult: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService) { }

  ngOnInit() {

      this.auth.getBuckets().subscribe((res: any) => {
        this.buckets = res;
      })
    
  }

  objectCopy() {

    if (this.data.action == 'copy') {
      this.objKey = this.data.object.Key ? this.data.object.Key : this.data.object.Prefix;
     
      let payload = {
        "destinationBucket": this.destinationBucket,
        "sourceBucket": this.sourceBucket,
        "folderName": this.objKey


      }

      this.auth.copyObject(payload).subscribe((res: any) => {
        this.copyResult = res
      })
    }else{
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

}
