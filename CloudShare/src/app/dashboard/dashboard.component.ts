import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Component } from '@angular/core';
import { AuthService } from './dashboard.service';
import { environment } from 'src/environments/environment.development';

interface propertiesnood {
  name: string;
  children?: propertiesnood[];
}

interface propertiesnood1 {
  name: string;
  children?: any[];
}

let TREE_DATA: propertiesnood[] = [
  {
    name: 'Properties',
    children: [{ name: `` }],
  },
  {
    name: 'Tags',
    children: [{ name: `` }]
    
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
        children: [{name: ''}, {name: ' '}],
      },
      {
        name: 'objectownership',
        children: [{name: ''}, {name: ''}],
      },
      {
        name: 'Accesscontrollist',
        children: [{name: ''}, {name: ''}],
      },
      {
        name: 'cors',
        children: [{name: ''}, {name: ''}],
      },
    ],
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
     
    })
 //To list the properties in a Bucket
      this.enableTree = false;
      this.auth.listOfProperties(payload).subscribe((res:any)=>{
      this.properties = res.bucketName;
      var output = Object.entries(res).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
      TREE_DATA[0].children = output;
      this.dataSource.data = TREE_DATA;
      this.enableTree = true;
     
     
     //This for tags api integration
      this.enableTree = false;
     this.auth.tags(payload).subscribe((res1:any)=>{
      var out = Object.entries(res1.TagSet[0]).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
       TREE_DATA[1].children = out;
      this.dataSource.data = TREE_DATA;
      this.enableTree = true;

 //this for headers API integration

      this.enableTree = false;
      this.auth.headers(payload).subscribe((res:any)=>{
        var out1 = Object.entries(res.headers).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
        TREE_DATA[2].children = out1;
        this.dataSource.data = TREE_DATA;
        this.enableTree = true;
     

//permission  api integration
      this.enableTree = false;
      this.auth.permissionOverView(payload).subscribe((response:any)=>{
       
        var out2 = Object.entries(response).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
        if(TREE_DATA[3].children){
          TREE_DATA[3].children[0].children= out2;
        }
        this.dataSource.data=TREE_DATA
        this.enableTree=true;
        
  //permission objectOwnership
    
      this.enableTree = false;
      this.auth.objectOwnerShip(payload).subscribe((response:any)=>{
       
        var out2 = Object.entries(response).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));

        if(TREE_DATA[3].children){
          TREE_DATA[3].children[1].children= out2;
        }
        this.dataSource.data=TREE_DATA
        this.enableTree=true;


        this.enableTree = false;
        this.auth.permission(payload).subscribe((response:any)=>{
         
          var out2 = Object.entries(response).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
  
          if(TREE_DATA[3].children){
            TREE_DATA[3].children[2].children= out2;
          }
          this.dataSource.data=TREE_DATA
          this.enableTree=true;

          this.enableTree = false;
        this.auth.cors(payload).subscribe((response:any)=>{
         
          var out2 = Object.entries(response).map(([key, value]) => ({ name: String(key) + ': ' + String(value) }));
  
          if(TREE_DATA[3].children){
            TREE_DATA[3].children[3].children= out2;
          }
          this.dataSource.data=TREE_DATA
          this.enableTree=true;
          
        })
          
        })}) })})
      }) })
      }}
