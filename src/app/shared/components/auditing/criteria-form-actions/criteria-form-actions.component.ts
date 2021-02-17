import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criteria-form-actions',
  templateUrl: './criteria-form-actions.component.html',
  styleUrls: ['./criteria-form-actions.component.less']
})
export class CriteriaFormActionsComponent implements OnInit {

  @Input() searchForm: FormGroup;
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Output() clearSearch: EventEmitter<boolean> = new EventEmitter();
  @Output() export: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSearch(): void {
    this.search.emit();
  }

  onClearSearch(): void {
    this.clearSearch.emit();
  }

  onExport(): void {
    this.export.emit();
  }

}
