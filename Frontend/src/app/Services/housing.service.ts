import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Iproperty } from '../model/iproperty';
import { Property } from '../model/property';
import { Ipropertybase } from '../model/ipropertybase';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getProperty(id: number){
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        // throw new Error('Some Error');
        return propertiesArray.find(p => p.id === id);
      })
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]>
  {
    return this.http.get('data/properties.json').pipe(
      map(
        data => {
          // console.log(data.id);
          const propertiesArray: Array<Property> = [];
          const localProperties = JSON.parse(localStorage.getItem('newProp'));
          if(localProperties){
            for(const id in localProperties) {
              if(SellRent){
                if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
                  propertiesArray.push(localProperties[id]);
                }
              } else{
                propertiesArray.push(localProperties[id]);
              }
              
            }
          }


          for(const id in data) {
            if(SellRent){
              if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
                propertiesArray.push(data[id]);
              }
            }else{
              propertiesArray.push(data[id]);
            }
              
            }
            return propertiesArray;
        }
      )
    );

    return this.http.get<Property[]>('data/properties.json');
  }

  addProperty(property: Property) {
    let newProp = [property];

    //add New Proprty in array if newProp already axists in local storage
    if(localStorage.getItem('newProp')){
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID() {
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    }else{
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
