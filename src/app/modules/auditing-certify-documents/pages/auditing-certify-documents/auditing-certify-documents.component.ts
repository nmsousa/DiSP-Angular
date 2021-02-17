import { Component, Injector, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseAuditingComponent } from 'src/app/shared/components/auditing/base-auditing.component';

import { CustomDateRangeValidator } from './../../../../shared/components/auditing/base-auditing.component';
import { FilterField } from './../../../../shared/models/filter-field';
import { DateUtils } from './../../../../shared/utils/date.utils';
import { AuditingCertifyDocumentsService } from './../../services/auditing-certify-documents.service';

@Component({
  selector: 'app-auditing-certify-documents',
  templateUrl: './auditing-certify-documents.component.html',
  styleUrls: ['./auditing-certify-documents.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AuditingCertifyDocumentsComponent extends BaseAuditingComponent implements OnInit, OnDestroy {

  constructor(injector: Injector, private fb: FormBuilder, private auditingCertifyDocumentsService: AuditingCertifyDocumentsService) {
    super(injector, auditingCertifyDocumentsService);
   }

  ngOnInit() {
    super.ngOnInit();
  }

  // Overriding super class method
  createSearchForm() {
    this.searchForm = this.fb.group({
      'occurredDate_From': [DateUtils.addDays(new Date(), -7), [Validators.required]],
      'occurredDate_To': [new Date(), [Validators.required]],
      'filename': [null],
      'externalApplication.name': [null],
      'username': [null]
    }, { validator: CustomDateRangeValidator });
  }

  // Overriding super class method
  searchRecords(clearPageIndex: boolean = false): void {
    this.generateFilters();

    super.searchRecords(clearPageIndex);
  }

  generateFilters(): void {
    const filters: FilterField[] = [];

    // Loop though the form controls and add to the filter the ones with value
    Object.keys(this.searchForm.controls).forEach(key => {
      if (this.searchForm.controls[key].value) {
        switch (key) {
          case 'occurredDate_From':
          case 'occurredDate_To':
            filters.push(...DateUtils.getDateRangeFilters(this.searchForm, key));
            break;
          case 'username':
            filters.push({text: key, value: this.searchForm.controls[key].value.id});
            break;
          default:
            filters.push({text: key, value: this.searchForm.controls[key].value});
            break;
        }
      }
    });

    this.filters = filters;
  }

  // Overriding super class method
  getFilters(): any {
    return this.filters;
  }

  // Overriding super class method
  onExport(): void {
    this.generateFilters();
    super.onExport(this.filters);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
