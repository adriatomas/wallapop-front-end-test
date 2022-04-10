import { Pipe, PipeTransform } from '@angular/core';
import { SortBy } from '@app/interfaces/sort-by.interface';

/**
 * Pipe to can sort list by any field Ascendant or Descendant
 * TODO: implemtn other sort types like booleans, etc.
 */
@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(array: any[], data: SortBy): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    if (array.length === 0 ) {
      return;
    }

    const { field, order } = data;

    if (typeof array[0][field] === 'number') {
      return order === 'ASC' ? this.orderListByNumericFieldAsc(array, field) : this.orderListByNumericFieldDesc(array, field);
    }
    if (typeof array[0][field] === 'string') {
      return order === 'ASC' ? this.orderListByStringFieldAsc(array, field) : this.orderListByStringFieldDesc(array, field);
    }
    return array;
  }

  orderListByNumericFieldAsc(array: any[], field: string): any {
    return array.sort((a: any, b: any) => {
      return a[field] - b[field];
    });
  }
  orderListByStringFieldAsc(array: any, field: string): any {
    return array.sort((a: any, b: any) => {
      return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
    });
  }
  orderListByNumericFieldDesc(array: any, field: string): any {
    return array.sort((a: any, b: any) => {
      return b[field] - a[field];
    });
  }
  orderListByStringFieldDesc(array: any, field: string): any {
    return array.sort((a: any, b: any) => {
      return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
    });
  }
}

//return a[value] - b[value]; // ASC
// return b[value] - a[value]; // DESC
//return a[value] < b[value] ? 1 : a[value] > b[value] ? -1 : 0; // desc
//return a[value] < b[value] ? -1 : a[value] > b[value] ? 1 : 0; // asc
