import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BaseTableComponent } from 'src/app/shared/components/base-table.component';

import { Template } from './../../../../shared/models/entities/template.model';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';
import { TemplateService } from './../../../../shared/services/template.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.less']
})
export class TemplatesComponent extends BaseTableComponent implements OnInit, OnDestroy {

  templates: Array<{ links: any[]; content: Template[] }> = [];

  constructor(
    injector: Injector,
    private templateService: TemplateService,
    private globalService: GlobalService) {

    super(injector);
   }

  ngOnInit() {
    this.getTemplates();
  }

  searchRecords(clearPageIndex: boolean = false): void {
    super.searchRecords(clearPageIndex);

    this.getTemplates();
  }

  getTemplates(): void {
    this.templates = [];
    this.isLoading = true;

    this.subscriptions.push(
      this.templateService.getTemplates([], this.pageIndex - 1, this.pageSize, this.sortField, this.sortOrder)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.totalRecords = data.page.totalElements;
        this.templates = data.content;
      })
    );
  }

  onChangeTemplateStatus(event: any, template: Template): void {
    template.status = +event.target.checked; // Convert the value from boolean to number
    this.subscriptions.push(this.templateService.updateStatus(template).subscribe(() => {
      this.globalService.showMessage(MessageSeverity.SUCCESS, 'TEMPLATES.UPDATE.SUCCESS');
    }));
  }

}
