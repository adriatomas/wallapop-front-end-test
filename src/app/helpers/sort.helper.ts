export function sortByNumericFieldAsc(array: any[], field: string): any {
  return array.sort((a: any, b: any) => {
    return parseInt(a[field]) - parseInt(b[field]);
  });
}
export function sortByStringFieldAsc(array: any, field: string): any {
  return array.sort((a: any, b: any) => {
    return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
  });
}
export function sortByNumericFieldDesc(array: any, field: string): any {
  return array.sort((a: any, b: any) => {
    return parseInt(b[field]) - parseInt(a[field]);
  });
}
export function sortByStringFieldDesc(array: any, field: string): any {
  return array.sort((a: any, b: any) => {
    return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
  });
}
