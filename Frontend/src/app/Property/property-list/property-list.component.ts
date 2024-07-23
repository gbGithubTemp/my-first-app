
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/Services/housing.service';
// import { IProperty } from '../IProperty.interface';
import { ActivatedRoute } from '@angular/router';
import { Iproperty } from 'src/app/model/iproperty';
import { Ipropertybase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: Array<Ipropertybase> = [];
  
  City = '';
  SearchCity = '';

  sortByParam = '';
  sortDirection = 'asc';

  constructor(private route: ActivatedRoute, private housingService:HousingService) {}

  ngOnInit(): void {
    if(this.route.snapshot.url.toString())
      {
        this.SellRent = 2;
      }
      else{
        this.SellRent = 1;
      }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data=> {

              this.properties = data;
              // const newProperty = JSON.parse(localStorage.getItem('newProp'));

              // if(newProperty.SellRent === this.SellRent) {
              //   this.properties = [newProperty, ...this.properties];
              // }

              console.log(data);
              
              console.log(this.route.snapshot.url.toString());
           }, error => {
            console.log("sellRent =" +this.SellRent);
            console.log(error);
           }
           
           
    );
    // this.http.get('data/properties.json').subscribe(
    //   data=> {
    //     this.properties = data;
    //     console.log(data);
    //   }
    // );
  }

  onCityFilter(){
    this.SearchCity = this.City;
  }

  onCityFilterClear(){
    this.SearchCity = '';
    this.City = '';
  }

  onSortDirection(){
    if(this.sortDirection == 'asc'){
      this.sortDirection = 'desc';
    }else{
      this.sortDirection = 'asc';
    }
  }

}
