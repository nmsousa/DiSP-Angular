export interface UserPreferences {

  id: number;
  emailInbox: number;
  emailNotificationsDeadline: number;
  emailRequestorCancelled: boolean;
  emailRequestorCompleted: boolean;
  emailRequestorCreated: boolean;
  emailRequestorRefused: boolean;
  emailRequestorRejected: boolean;
  emailRequestorSigned: number;
  emailRequestorUpdated: boolean;
  emailSignatoryCancelled: boolean;
  emailSignatoryRefused: boolean;
  emailSignatoryRejected: boolean;
  emailSignatorySigned: boolean;
  emailSignatoryUpdated: boolean;
  filters: any;
  guiLanguage: string;
  recordsPerPage: number;
}
