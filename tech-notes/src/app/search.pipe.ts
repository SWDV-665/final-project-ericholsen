/* code taken from here and modified: 
https://www.djamware.com/post/5a37ceaf80aca7059c142970/ionic-3-and-angular-5-search-and-sort-list-of-data
*/

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
      } else if (column == "user") {
        return it.user.toLowerCase().includes(terms); 
      }
    });
  }

}
