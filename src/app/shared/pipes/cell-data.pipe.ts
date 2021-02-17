import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCellData',
  pure: true
})
export class GetCellDataPipe implements PipeTransform {

  /**
   * The goal of this pipe is to get values from nested objects. For example:
   *
   * value: request
   * field: 'property1.property2.property3'
   *
   * Will return request.property1.property2.property3 property value
   *
   * @param value of the row (tr) record, for example, a Request
   * @param field is the property of the value that we want to show. If it's a 1st level property (without '.'),
   * it's the same as value[field]
   */
  transform(value: any, field: string): any {
    if (value) {
      const nestedProperties: string[] = field.split('.');
      for (const prop of nestedProperties) {
        value = value[prop];
        if (!value) {
          return '';
        }
      }
    }

    return value;
  }

}
