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
  sourceObject = this.data.tableObjects;
  Source = this.data;
  result: any;
  objKey: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService) { }

  ngOnInit() {

    this.auth.getBuckets().subscribe((res: any) => {
      this.buckets = res;
    })
  }

  objectCopy() {
    
    this.objKey = this.data.object.Key ? this.data.object.Key : this.data.object.Prefix;
    console.log("folder: ",this.objKey);
    let payload = {
      "destinationBucket": this.destinationBucket,
      "sourceBucket": this.sourceBucket,
      "folderName": this.objKey
     

    }
    
    this.auth.copyObject(payload).subscribe((res: any) => {
      this.result = res
      console.log("result", res)
    })
    

  }

}
