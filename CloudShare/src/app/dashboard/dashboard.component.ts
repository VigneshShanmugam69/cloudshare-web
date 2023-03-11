import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { Component} from '@angular/core';
import { AuthService } from '../auth.service';

interface propertiesnood {
  name: string;
  children?: propertiesnood[];
}

export interface PeriodicElement {
  name: string;
  position: number;
  format: string;
  datetime: string;
}
const TREE_DATA: propertiesnood[] = [
  {
    name: 'Header',
    children: [{name: 'Bucket region : us-ease-1'}, {name: 'Date : 10-01-2023 23:03AM'}, {name: 'Server : Amazons3'}],
  },
  {
    name: 'Tags',
    children: [{name: 'Created by : Cprakash'}, {name: 'Created by : Vignesh'}, {name: 'Created by : Gopi'}],

  },
  {
    name: 'Permission',
    children: [{name: 'Read'}, {name: 'Write'}, {name: 'Delete'}],
  },
];

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'image1.png', format: 'png', datetime: '10-02-2023 12:00 00:59'},
  {position: 2, name: 'image2.png', format: 'png', datetime: '10-02-2023 12:00 00:59'},
  {position: 3, name: 'image3.png', format: 'png', datetime: '10-02-2023 12:00 00:59'},
  {position: 4, name: 'image4.png', format: 'png', datetime: '10-02-2023 12:00 00:59'},
  {position: 5, name: 'image5.png', format: 'png', datetime: '10-02-2023 12:00 00:59'},
  {position: 6, name: 'image6.png', format: 'png', datetime: '10-02-2023 12:00 00:59'},
  {position: 7, name: 'image7.png', format: 'png', datetime: '10-02-2023 12:00 00:59'},
  {position: 9, name: 'image9.png', format: 'png', datetime: '10-02-2023 12:00 00:59'},
  {position: 8, name: 'image8.png', format: 'png', datetime: '10-02-2023 12:00 00:59'},
  {position: 10, name: 'image10.png', format: 'png',datetime: '10-02-2023 12:00 00:59'},
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //accounts
  buckets:any;
  treeControl = new NestedTreeControl<propertiesnood>(node => node.children);
  dataSource = new MatTreeNestedDataSource<propertiesnood>();

  // items:any;
  // items = Array.from({length: 10}).map((_, i) => `cprakash-00${i}`);

  displayedColumns: string[] = ['position', 'name', 'format', 'datetime'];
  dataSource1 = ELEMENT_DATA;
  name: any;

  constructor(private auth :AuthService) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: propertiesnood) => !!node.children && node.children.length > 0;


  Account(){
    this.auth.getbuckets().subscribe((res:any)=>{
      console.log("-->",res)
      this.buckets = res;
    })
  }
  object(){
    this.name = "Prakash"
  }
}
