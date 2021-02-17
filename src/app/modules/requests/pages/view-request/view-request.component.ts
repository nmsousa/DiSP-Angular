import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {Assignment} from '../../../../shared/models/entities/assignment.model';
import {Metadata} from '../../../../shared/models/entities/metadata.model';
import {Request} from '../../../../shared/models/entities/request.model';
import {AssignmentStatuses} from '../../../../shared/models/enums/assignment-statuses.enum';
import {TableColumn, TableColumnType} from '../../../../shared/models/table-column';
import {RequestService} from '../../../../shared/services/request.service';
import {RequestStatuses} from './../../../../shared/models/enums/request-statuses.enum';

@Component({
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.less']
})
export class ViewRequestComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  request: Request;
  requests: Request[] = [];
  assignments: Assignment[] = [];
  metadata: Metadata[] = [];
  rolesPerPerson: Map<string, string[]> = new Map();
  securityAndRoles: any[] = [];

  isLoading: boolean = false;
  columns: TableColumn[] = [
    {field: 'id', label: 'REQUESTS_TABLE.HEADER.ID', type: TableColumnType.ID, width: '90px'},
    {field: 'document.title', label: 'REQUESTS_TABLE.HEADER.TITLE', type: TableColumnType.STRING},
    {field: 'externalApplication.name', label: 'REQUESTS_TABLE.HEADER.FROM', type: TableColumnType.FROM, width: '200px'},
    {field: 'signatureType.name', label: 'REQUESTS_TABLE.HEADER.SIGNATURE_TYPE', type: TableColumnType.STRING},
    {field: 'deadline', label: 'REQUESTS_TABLE.HEADER.DEADLINE', type: TableColumnType.DATE, width: '120px'},
    {field: 'document.filename', label: 'REQUESTS_TABLE.HEADER.FILENAME', type: TableColumnType.STRING},
    {field: 'Actions', label: 'REQUESTS_TABLE.HEADER.ACTIONS', type: TableColumnType.ACTION},
  ];

  AssignmentStatuses = AssignmentStatuses;
  RequestStatuses = RequestStatuses;

  constructor(private route: ActivatedRoute, private requestService: RequestService) {
  }

  ngOnInit() {
    this.getRequestByRouteId();
  }

  getRequestByRouteId(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {

      this.isLoading = true;
      this.clearLists();

      // Get the request
      this.subscriptions.push(this.requestService.getRequest(params['id'])
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe(result => {
          if (result) {
            this.request = result.content;
            this.requests = [this.request];
            this.assignments = this.request.assignments;
            this.metadata = this.request.metadata;

            this.securityAndRoles = this.requestService.getSecurityAndRolesForList(this.request, this.rolesPerPerson);
          }
        }));
    }));
  }

  clearLists(): void {
    this.request = undefined;
    this.assignments = [];
    this.metadata = [];
    this.rolesPerPerson = new Map();
    this.securityAndRoles = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

}
