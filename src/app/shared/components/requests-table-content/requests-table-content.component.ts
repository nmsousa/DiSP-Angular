import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';

import {Request} from '../../models/entities/request.model';
import {AssignmentStatuses} from '../../models/enums/assignment-statuses.enum';
import {RequestStatuses} from '../../models/enums/request-statuses.enum';
import {TableColumn, TableColumnType} from '../../models/table-column';
import {BACKEND_PAGINATION_MINIMUM} from '../../services/base-remote.service';
import {GlobalService, MessageSeverity} from '../../services/global.service';
import {RequestService} from '../../services/request.service';
import {RequestSelection} from './../../models/request-selection';

@Component({
  selector: 'app-requests-table-content',
  templateUrl: './requests-table-content.component.html',
  styleUrls: ['./requests-table-content.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RequestsTableContentComponent implements OnInit, OnChanges {

  subscriptions: Subscription[] = [];

  @Input() records: any[] | null = [];
  @Input() columns: TableColumn;
  @Input() pageIndex: number = 1;
  @Input() pageSize: number = BACKEND_PAGINATION_MINIMUM;
  @Input() totalRecords: number = 1;
  @Input() isLoading: boolean = false;

  // Selection column checkbox

  @Input() hasRecordSelection: boolean = false;
  @Input() hasAllRecordsChecked: boolean = false;
  @Input() hasSomeRecordsChecked: boolean = false;
  @Input() externalApplication: string = '';

  @Output() sort: EventEmitter<{ key: string; value: string }> = new EventEmitter();
  @Output() checkedChange: EventEmitter<RequestSelection> = new EventEmitter();

  // Enums
  TableColumnType = TableColumnType;
  RequestStatuses = RequestStatuses;

  // List of selected Records
  mapOfCheckedId: { [key: string]: boolean } = {};

  constructor(private requestService: RequestService, private globalService: GlobalService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.records && this.hasRecordSelection) {
      this.mapOfCheckedId = {}; // Clear the previous selection
      // When this property changes from outside is because we got a new list of records, therefore
      this.onCheckedChange();
    }
  }

  onSort(sort: { key: string; value: string }): void {
    this.sort.emit(sort);
  }

  onCheckAll(value: boolean): void {
    this.records.forEach(item => {
      // Only the Requests not purged are available for selection
      if (!item.purge) {
        this.mapOfCheckedId[item.id] = value;
      }
    });
    this.onCheckedChange();
  }

  onCheckedChange(): void {
    // Check is all the requests are selected
    this.hasAllRecordsChecked = this.records && this.records.length > 0 && this.records
      .every(item => item.purge || this.mapOfCheckedId[item.id]);

    // Check if some but not all requests are selected
    this.hasSomeRecordsChecked =
      this.records.some(item => this.mapOfCheckedId[item.id]) &&
      !this.hasAllRecordsChecked;

    this.checkedChange.emit(this.getSelectedRequests());
  }

  getSelectedRequests(): RequestSelection {
    const requestSelection: RequestSelection = {requests: [], ids: []};

    requestSelection.ids = Object.keys(this.mapOfCheckedId)
      .filter(key => {
        return this.mapOfCheckedId[key];
      });

    this.records.forEach(record => {
      if (requestSelection.ids.includes(record.id.toString())) {
        requestSelection.requests.push(record);
      }
    });

    return requestSelection;
  }

  getSignedAmount(request: Request): number {
    let count: number = 0;

    if (request && request.assignments) {
      count = request.assignments.filter(assignment => {
        return assignment.status === AssignmentStatuses.SIGNED;
      }).length;
    }

    return count;
  }

  // Get original document
  onDownloadOriginalDocument(id: number) {
    this.subscriptions.push(this.requestService.findOriginalVersionOfTheDocumentByRequestId(id)
      .subscribe(result => {
        this.globalService.downloadFile(result.content.data, result.content.filename, result.content.mimetype);
      }, error => {
        if (error) {
          console.log(error);
        }
        const errorMessage = 'GENERIC.SERVER.ERROR';
        this.globalService.showMessage(MessageSeverity.ERROR, errorMessage);
      }));
  }

  // Get last signed document
  onDownloadLastSignedDocument(id: number) {
    this.subscriptions.push(this.requestService.findLatestVersionOfTheDocumentByRequestId(id)
      .subscribe(result => {
        this.globalService.downloadFile(result.content.data, result.content.filename, result.content.mimetype);
      }, error => {
        if (error) {
          console.log(error);
        }
        const errorMessage = 'GENERIC.SERVER.ERROR';
        this.globalService.showMessage(MessageSeverity.ERROR, errorMessage);
      })
    );
  }

}
