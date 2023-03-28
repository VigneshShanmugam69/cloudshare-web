import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Component } from '@angular/core';
import { AuthService } from './dashboard.service';
import { environment } from 'src/environments/environment.development';

interface propertiesnood {
  name: string;
  children?: propertiesnood[];
}
let TREE_DATA: propertiesnood[] = [
  {
    name: 'Properties',
    children: [{ name: `` }, { name: '' }, { name: '  ' }],
  },
  {
    name: 'Tags',
    children: [{ name: `` }, { name: '' }, { name: '  ' }],
  },
  {
    name: 'Permission',
    children: [{ name: `` }, { name: '' }, { name: '  ' },{ name: '' },{ name: '' },],
  },
  {
    name: 'Headers',
    children: [{ name: `` }, { name: '' }, { name: '  ' }, { name: '' }, { name: '  ' }],
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
  objects: any;
  displayedColumns: string[] = ['position', 'name', 'format', 'datetime'];

  treeControl = new NestedTreeControl<propertiesnood>(node => node.children);
  dataSource = new MatTreeNestedDataSource<propertiesnood>();
  enableTree = true;
 properties: any;
  Tags: any;
  tag: any;


  constructor(private auth: AuthService) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: propertiesnood) => !!node.children && node.children.length > 0;

  // list the buckets
  account() {
    this.auth.getBuckets().subscribe((res: any) => {
      this.buckets = res;
    })
  }

  // list the objects from the selecting bucket
  objectList(val: any) {
    let payload = { "Bucket": val }
    this.auth.listObjects(payload).subscribe((res: any) => {
      this.objects = res.Contents
      console.log(this.objects)

    })

    console.log(payload);
    this.enableTree = false;
    this.auth.listOfProperties(payload).subscribe((res:any)=>{
      this.properties = res.bucketName;
     // console.log('property',res1);
      //console.log('property1',this.properties);
      
      var output = Object.entries(res).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
console.log(output);
      // console.log(output);
      TREE_DATA[0].children = output;
      this.dataSource.data = TREE_DATA;
      this.enableTree = true;
  




    this.enableTree = false;
    this.auth.tags(payload).subscribe((res1:any)=>{
      
      // console.log('tags....',res1);
      //console.log('property1',this.properties);
      // this.tag = res1.TagSet;
      // console.log(this.tag[0])
      
      var out = Object.entries(res1.TagSet[0]).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));

      // console.log(out);
      TREE_DATA[1].children = out;
      this.dataSource.data = TREE_DATA;
      this.enableTree = true;

 //permission API

      this.enableTree = false;
      this.auth.permission(payload).subscribe((res:any)=>{
        
        // console.log('tags....',res1);
        //console.log('property1',this.properties);
        // this.tag = res1.TagSet;
        // console.log(this.tag[0])
        console.log('permission',res);
        var out1 = Object.entries(res.result).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
  
         
        TREE_DATA[2].children = out1;
        this.dataSource.data = TREE_DATA;
        this.enableTree = true;
      })



      this.enableTree = false;
      this.auth.headers(payload).subscribe((response:any)=>{
        console.log('headers',response);
        var out2 = Object.entries(response.region).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
        console.log('headersss',out2);
         
        TREE_DATA[3].children = out2;
      })
    })
 })       
  }

}
