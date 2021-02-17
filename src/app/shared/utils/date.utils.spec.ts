import {FilterField} from '../models/filter-field';
import {DateUtils} from './date.utils';

describe('DateUtils', () => {

  describe('#formatDate()', () => {
    let date: Date;

    beforeEach(() => {
      date = new Date(2020,  2,  1);
    });

    it('should return TRUE with only date parameter', () => {
      expect(DateUtils.formatDate(date)).toEqual('2020/03/01');
    });

    it('should return TRUE with date and yearFirst=false parameters', () => {
      expect(DateUtils.formatDate(date, false)).toEqual('01/03/2020');
    });

    it('should return TRUE with date, yearFirst=false and separator=\'-\' parameters', () => {
      expect(DateUtils.formatDate(date, false, '-')).toEqual('01-03-2020');
    });

  });

  describe('#formatDateForRestDateObject()', () => {
    const date: Date = new Date(2020,  2,  1);

    it('should return TRUE', () => {
      expect(DateUtils.formatDateForRestDateObject(date)).toEqual('01/03/2020 00:00:00');
    });

  });

  describe('#addDays()', () => {
    let date: Date;
    let newDate: Date;

    beforeEach(() => {
      date = new Date(2020,  2,  10);
    });

    it('should return TRUE for 10/03/2020 + 5 = 15/03/2020', () => {
      newDate = new Date(2020, 2, 15);
      expect(DateUtils.addDays(date, 5)).toEqual(newDate);
    });

    it('should return TRUE for 10/03/2020 - 5 = 05/03/2020', () => {
      newDate = new Date(2020, 2, 5);
      expect(DateUtils.addDays(date, -5)).toEqual(newDate);
    });

    it('should return FALSE for 10/03/2020 + 5 = 06/03/2020', () => {
      newDate = new Date(2020, 2, 6);
      expect(DateUtils.addDays(date, 5)).not.toEqual(newDate);
    });

  });

  describe('#getFilterByDate()', () => {

    it('should return null', () => {
      expect(DateUtils.getFilterByDate(null, null)).toBeUndefined();
    });

    it('should return a FilterItem with {text: \'insertDate\', value: 2020/2/15}', () => {
      const testDate: Date = new Date(2020, 2, 15);
      const dateField: string = 'insertDate';
      const filter: FilterField = DateUtils.getFilterByDate(testDate, dateField);
      expect(filter.text).toEqual(dateField);
      expect(filter.value).toEqual('2020/03/15');
    });

  });

  describe('#isDateRangeValid()', () => {
    let startDate: Date;
    let endDate: Date;

    beforeEach(() => {
      startDate = DateUtils.getMinDate();
      endDate = DateUtils.getMaxDate();
    });

    it('should return TRUE with Start < End', () => {
      expect(DateUtils.isDateRangeValid(startDate, endDate)).toBeTruthy();
    });

    it('should return TRUE with Null < End', () => {
      expect(DateUtils.isDateRangeValid(null, endDate)).toBeTruthy();
    });

    it('should return TRUE with Start < Null', () => {
      expect(DateUtils.isDateRangeValid(startDate, null)).toBeTruthy();
    });

    it('should return FALSE with Start > End', () => {
      expect(DateUtils.isDateRangeValid(endDate, startDate)).toBeFalsy();
    });

  });

  describe('#isFutureDate()', () => {

    it('should return TRUE for future date', () => {
      expect(DateUtils.isFutureDate(DateUtils.addDays(new Date(), 2))).toBeTruthy();
    });

    it('should return FALSE for past date', () => {
      expect(DateUtils.isFutureDate(DateUtils.addDays(new Date(), -2))).toBeFalsy();
    });

  });

});
