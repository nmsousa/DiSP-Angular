export class UpdateSignatureTypeInput {

  constructor(
    public name: string = '',
    public keyType: string = '',
    public deadlineType: string = '',
    public workflowType: string = '',
    public status: number = 0,
    public visible: number = 0,
    public allowedGroups: string[] = [],
    public allowedModes: string[] = [],
    public fileRead: boolean = false,
    public ipCheck: boolean = false,
    public isProtected: boolean = false,
    public notificationHoursBeforeDeadline: number = 0,
    public recommendedMode: string = '',
    public trustedAuthorities: string[] = []
  ) {}
      
}
