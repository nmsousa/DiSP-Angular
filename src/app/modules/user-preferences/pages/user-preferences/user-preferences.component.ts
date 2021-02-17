import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DialogCanDeactivateService } from 'src/app/shared/services/dialog-can-deactivate.service';

import { UserPreferences } from './../../../../shared/models/entities/user-preferences.model';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class UserPreferencesComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  userPreferences: UserPreferences;
  hasChanges: boolean = false;

  languageOptions: any[] = [
    {label: 'English', value: 'EN'},
    {label: 'Deutsche', value: 'DE'},
    {label: 'Français', value: 'FR'}
  ];
  recordPerPageOptions: any[] = [
    {label: '5', value: 5},
    {label: '10', value: 10},
    {label: '25', value: 25}
  ];

  constructor(
    private userService: UserService,
    private globalService: GlobalService,
    private dialogCanDeactivateService: DialogCanDeactivateService) { }

  ngOnInit() {
    this.getUserPreferences();
  }

  getUserPreferences(): void {
    this.subscriptions.push(
      this.userService.getUserPreferences().subscribe(result => {
        this.userPreferences = result.content;
      })
    );
  }

  onSave(): void {
    this.subscriptions.push(
      this.userService.saveUserPreferences(this.userPreferences).subscribe(result => {
        this.userPreferences = result.content;
        this.hasChanges = false;

        this.globalService.showMessage(MessageSeverity.SUCCESS, 'USER_PREFERENCES.SAVE.SUCCESS');
      })
    );
  }

  onCancel(): void {
    this.getUserPreferences();
    this.hasChanges = false;
  }

  onDefaultLanguageChange(value: string): void {
    if (this.userPreferences.guiLanguage !== value) {
      this.userPreferences.guiLanguage = value;
      this.hasChanges = true;
    }
  }

  onRecordsPerPageChange(value: number): void {
    if (this.userPreferences.recordsPerPage !== value) {
      this.userPreferences.recordsPerPage = value;
      this.hasChanges = true;
    }
  }

  onTagChanged(): void {
    this.hasChanges = true;
  }

  // Property can be for example: emailInbox
  onChangeTriStateOption(event: any, property: string): void {
    // If it's 1 (ON) or 2 (ON + High Priority), we switch it off
    if (this.userPreferences[property] > 0) {
      this.userPreferences[property] = 0;
    } else {
      this.userPreferences[property] = 1;
    }

    this.hasChanges = true;
  }

  onChangePriority(property: string): void {
    if (this.userPreferences[property] === 1) {
      this.userPreferences[property] = 2;
    } else if (this.userPreferences[property] === 2) {
      this.userPreferences[property] = 1;
    }

    this.hasChanges = true;
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no changes
    if (!this.hasChanges) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogCanDeactivateService.confirm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
