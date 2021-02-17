import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFromDatetime',
  pure: true
})
export class DateFromDatetimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    if (value) {
      const dateTimeArray = value.split(' ');
      if (dateTimeArray && dateTimeArray.length > 0) {
        return dateTimeArray[0];
      }
    }

    return value;
  }

}
