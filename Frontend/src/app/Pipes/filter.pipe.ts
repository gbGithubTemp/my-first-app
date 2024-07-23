import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {
    
    const resultArray = [];
    if(value.length === 0 || filterString === '' || propName === ''){
      return value;
    }

    for (let i = 0; i < value?.length; i++) {
      const element = value[i];
      if (element.city === filterString) {
        resultArray.push(element);
      }
    }

    // for(var item in value){
    //   console.log(value);
    //   console.log(item[propName]);
    //   if(item[propName] === filterString) {
    //     resultArray.push(item);
    //   }
    // }
    // console.log(resultArray);
    return resultArray;
  }

}
