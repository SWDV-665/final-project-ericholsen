import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], terms: string, column: string): any[] {
    console.log("items: " + items + "terms: " + terms)
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      if (column == "description") {
        return it.description.toLowerCase().includes(terms); 
      } else if (column == "name") {
        return it.name.toLowerCase().includes(terms); 
      }
    });
  }

}
