import { DateFromDatetimePipe } from './date-from-datetime.pipe';

describe('DateFromDatetimePipe', () => {
  it('create an instance', () => {
    const pipe = new DateFromDatetimePipe();
    expect(pipe).toBeTruthy();
  });
});
