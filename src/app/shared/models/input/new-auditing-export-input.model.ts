export class NewAuditingExportInput {

  constructor(
    public startDate: string = '',
    public endDate: string = '',
    public username: string = '',
    public requestId: number = 0,
    public requestTitle: string = '',
    public auditingEventTypeId: number = 0
  ) {}

}
