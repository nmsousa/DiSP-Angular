import { RequireAdminDirective } from './require-admin.directive';

describe('RequireAdminDirective', () => {
  it('should create an instance', () => {
    const directive = new RequireAdminDirective(null, null, null);
    expect(directive).toBeTruthy();
  });
});
