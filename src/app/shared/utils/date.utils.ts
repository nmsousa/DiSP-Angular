import {FormGroup} from '@angular/forms';
import {differenceInCalendarDays} from 'date-fns';
import {FilterField} from '../models/filter-field';

export class DateUtils {

  /**
   * Return the date in the format yyyy/MM/dd
   * @param date to be formatted and returned
   */
  public static formatDate(date, yearFirst: boolean = true, separator: string = '/') {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    if (yearFirst) {
      return [year, month, day].join(separator);
    } else {
      return [day, month, year].join(separator);
    }

  }

  public static formatDateForRestDateObject(date: Date): string {
    return date ? this.formatDate(date, false) + ' ' + DateUtils.getTimeFormatted(date) : '';
  }

  public static getTimeFormatted(date: Date): string {
    return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':'
      + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':'
      + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
  }

  /**
   * @param dateTime Date to convert from the format: "31/03/2020 23:59:59" into "2020/03/31"
   */
  public static getDateObjectFromDateTimeString(dateTime: any, separator: string = '/'): Date {
    const dateTimeArray: string[] = dateTime ? dateTime.split(' ') : [];
    const date: string = dateTimeArray && dateTimeArray.length > 0 ? dateTimeArray[0] : '';
    const time: string = date && dateTimeArray.length > 1 ? ' ' + dateTimeArray[1] : '';

    return date ?
      new Date(date.split(separator).reverse().join(separator) + time) :
      new Date(dateTime);
  }

  public static addDays(date: Date, daysToAdd: number): Date {
    const retDate: Date = new Date(date.valueOf());
    retDate.setDate(retDate.getDate() + daysToAdd);

    return retDate;
  }

  public static getMinDate(): Date {
    return new Date(1970, 0, 1);
  }

  public static getMaxDate(): Date {
    return new Date(2999, 11, 31);
  }

  public static getFilterByDate(value: Date, field: string): FilterField {
    let filter: FilterField;

    if (value instanceof Date) {
      filter = {text: field, value: this.formatDate(value)};
    }

    return filter;
  }

  public static getDateRangeFilters(searchForm: FormGroup, formControlName: string): FilterField[] {
    const filters: FilterField[] = [];
    const key: string = formControlName.split('_')[0];

    // The pair date is empty, we fill it programmatically
    if (formControlName.includes('_From')) {
      filters.push(this.getFilterByDate(searchForm.controls[formControlName].value, key));
      if (!searchForm.controls[key + '_To'].value) {
        filters.push(this.getFilterByDate(this.getMaxDate(), key));
      }
    } else { // End date
      if (!searchForm.controls[key + '_From'].value) {
        filters.push(this.getFilterByDate(this.getMinDate(), key));
      }
      // End date must have 1 extra day because on the server side,
      // we are doing the comparison < instead of <= because of possible timezone problems
      // Also we have to clone the Date instance, otherwise adding 1 day would also affect the original Date instance
      const toDate: Date = this.addDays(new Date(searchForm.controls[formControlName].value.valueOf()), 1);
      filters.push(this.getFilterByDate(toDate, key));
    }

    return filters;
  }

  public static isDateRangeValid(start: Date, end: Date): boolean {
    // Either one of them is null for End is date is not before Start date
    return !start || !end || start.setHours(0, 0, 0, 0) <= end.setHours(0, 0, 0, 0);
  }

  public static isFutureDate(current: Date): boolean {
    // Returns true for days after today
    return differenceInCalendarDays(current, new Date()) > 0;
  }

  public static isPastOrPresentDate(current: Date): boolean {
    // Returns true for days before or equals today
    return differenceInCalendarDays(current, new Date()) < 0;
  }

  // return the given date at 23:59:00 time
  public static getEndOfTheDay(current: Date): Date {
    if (current) {
      current.setHours(23);
      current.setMinutes(59);
      current.setSeconds(0);
    }

    return current;
  }

}
