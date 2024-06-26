import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties : Array<any> = [
    {
      "Id" : 1,
      "Name" : "Birla House",
      "Type" : "House",
      "Price" : 12000
    },
    {
      "Id" : 2,
      "Name" : "Sanidhya House",
      "Type" : "House",
      "Price" : 14000
    },
    {
      "Id" : 3,
      "Name" : "PushpKunj House",
      "Type" : "House",
      "Price" : 10000
    },
    {
      "Id" : 4,
      "Name" : "Hiradhan House",
      "Type" : "House",
      "Price" : 16000
    },
    {
      "Id" : 5,
      "Name" : "Kudrat House",
      "Type" : "House",
      "Price" : 19000
    },
    {
      "Id" : 6,
      "Name" : "Macro House",
      "Type" : "House",
      "Price" : 21000
    }
    
  ]

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  

}
