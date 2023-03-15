import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

interface propertiesnood {
  name: string;
  children?: propertiesnood[];
}

const TREE_DATA: propertiesnood[] = [
  {
    name: 'Header',
    children: [{ name: 'Bucket region : us-ease-1' }, { name: 'Date : 10-01-2023 23:03AM' }, { name: 'Server : Amazons3' }],
  },
  {
    name: 'Tags',
    children: [{ name: 'Created by : Cprakash' }, { name: 'Created by : Vignesh' }, { name: 'Created by : Gopi' }],

  },
  {
    name: 'Permission',
    children: [{ name: 'Read' }, { name: 'Write' }, { name: 'Delete' }],
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
  obj: any;
  dataSource1: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'format', 'datetime'];

  treeControl = new NestedTreeControl<propertiesnood>(node => node.children);
  dataSource = new MatTreeNestedDataSource<propertiesnood>();

  
  constructor(private auth: AuthService) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: propertiesnood) => !!node.children && node.children.length > 0;


  Account() {
    this.auth.getbuckets().subscribe((res: any) => {
      console.log("-->", res)
      this.buckets = res;
    })
  }
  objectlist(val: any) {
    let payload = {"Bucket":val}
    this.auth.listobjects(payload).subscribe((res: any) => {
      console.log('----------',res)
      this.dataSource1 = res
    })

  }
}
