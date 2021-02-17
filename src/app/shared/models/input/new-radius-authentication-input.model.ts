export class NewRadiusAuthenticationInput {

  constructor(
    public username: string = '',
    public token: string = '',
    public pin: string = '',
    public isChallenge: boolean = false,
    public radiusState: any = ''
  ) {}

}
