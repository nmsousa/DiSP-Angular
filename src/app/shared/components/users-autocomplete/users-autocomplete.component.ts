import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { FilterField } from '../../models/filter-field';
import { AuthenticationService } from '../../services/authentication.service';
import { BaseAutocompleteComponent } from '../autocomplete/base-autocomplete.component';
import { AutocompleteOption } from './../../models/autocomplete-option';
import { PersonOption } from './../../models/person-option';

@Component({
  selector: 'app-users-autocomplete',
  templateUrl: './users-autocomplete.component.html',
  styleUrls: ['./users-autocomplete.component.less']
})
export class UsersAutocompleteComponent extends BaseAutocompleteComponent implements OnInit, OnDestroy {

  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
  }

  onSearchChange(inputText: string) {
    const filters: FilterField[] = [];
    const searchedNames: string[] = inputText ? inputText.split(' ') : [];

    if (searchedNames.length > 1) {
      filters.push({text: 'firstname', value: searchedNames.shift()});
      const lastname: string = searchedNames.join(' ');
      if (lastname) {
        filters.push({text: 'lastname', value: lastname.trim()});
      }
    } else {
      filters.push({text: 'firstname', value: inputText});
    }

    this.isLoading = true;
    this.subscriptions.push(this.authenticationService.getUsers(filters).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
      .subscribe(result => {
        this.options = result.content;
      }));
  }

  // We don't use the inherited onSelectionChange() because we want to send more information here epId, label and username.
  onUserSelectionChange(event: AutocompleteOption) {
    const selectedUser: PersonOption = new PersonOption();
    selectedUser.username = event.id.toString();
    selectedUser.label = event.label;
    selectedUser.epId = this.getEpIdFromUsername(selectedUser.username);

    this.selectionChange.emit(selectedUser);
  }

  getEpIdFromUsername(username: string): number {
    const retUser: any =  this.options.find(user => user.content.username === username);

    return retUser.content.epId;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
