import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SecurityRole } from './../../models/enums/security-role.enum';
import { PersonOption } from './../../models/person-option';
import { DateUtils } from './../../utils/date.utils';

@Component({
  selector: 'app-persons-editable-list',
  templateUrl: './persons-editable-list.component.html',
  styleUrls: ['./persons-editable-list.component.less']
})
export class PersonsEditableListComponent implements OnInit {

  @Input() roles: Array<{role: SecurityRole, active: boolean}> = [];
  @Input() persons: PersonOption[] = [];
  @Input() isReadonly: boolean = false;
  @Input() isSortable: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() hasDeadline: boolean = false;
  @Input() formLabel: string = '';

  @Output() personsChanged: EventEmitter<PersonOption[]> = new EventEmitter();

  isPersonsModalVisible: boolean = false;
  selectedPerson: PersonOption;

  disablePastDates = (current: Date): boolean => {
    // Can not select days before today
    return DateUtils.isPastOrPresentDate(current);
  }

  constructor() { }

  ngOnInit() { }

  removePerson(person: PersonOption) {
    this.persons = this.persons.filter(item => item.username !== person.username);

    this.personsHasChanged();
  }

  addToPersons(person: PersonOption) {
    if (this.persons && !this.persons.some(item => item.username === person.username)) {
      person.roles = JSON.parse(JSON.stringify(this.roles));
      // For some reason the this.persons.push() doesn't work.
      // The nz-list component doesn't detect the changes if the instance already exists
      this.persons = [...this.persons, person];

      this.personsHasChanged();
    }
  }

  clearAllPersons() {
    this.persons = [];
    this.personsHasChanged();
    this.clearSelectedPerson();
  }

  personsHasChanged(): void {
    this.personsChanged.emit(this.persons);
    this.clearSelectedPerson();
  }

  showPersonsModal() {
    this.isPersonsModalVisible = true;
  }

  handlePersonsModalCancel() {
    this.isPersonsModalVisible = false;
  }

  handlePersonsModalOk(persons: PersonOption[]) {
    persons.forEach(person => this.addToPersons(person));
    this.isPersonsModalVisible = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.persons, event.previousIndex, event.currentIndex);
    this.clearSelectedPerson();
  }

  onSelectedPerson(event: PersonOption): void {
    if (this.isSortable) {
      if (this.selectedPerson !== event) {
        this.selectedPerson = event;
      } else {
        this.clearSelectedPerson();
      }

    }
  }

  clearSelectedPerson(): void {
    this.selectedPerson = null;
  }

  moveSelectedPersonUp(): void {
    const selectedIndex: number = this.persons.indexOf(this.selectedPerson);
    moveItemInArray(this.persons, selectedIndex, selectedIndex === 0 ? selectedIndex : selectedIndex - 1);
  }

  moveSelectedPersonDown(): void {
    const selectedIndex: number = this.persons.indexOf(this.selectedPerson);
    moveItemInArray(this.persons, selectedIndex, selectedIndex === this.persons.length ? selectedIndex : selectedIndex + 1);
  }

}
