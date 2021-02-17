import {GetCellDataPipe} from './cell-data.pipe';

describe('GetCellDataPipe', () => {

  let pipe: GetCellDataPipe;

  beforeEach(() => {
    pipe = new GetCellDataPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('firstname of the transformed value should be John', () => {

    const user: any = {
        user:
          {
            age: 24,
            name:
              {
                firstname: 'John',
                lastname: 'Doe'
              }
          }
      };

    const pipeResult: string = pipe.transform(
      user,
      'user.name.firstname');

    expect(pipeResult).toBe('John');
  });

});
