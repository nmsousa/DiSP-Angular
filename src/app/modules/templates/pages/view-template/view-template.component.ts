import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseGetTemplateComponent } from '../../base-get-template.component';
import { Template } from './../../../../shared/models/entities/template.model';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';
import { TemplateService } from './../../../../shared/services/template.service';

@Component({
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.less']
})
export class ViewTemplateComponent extends BaseGetTemplateComponent implements OnInit {

  constructor(
    route: ActivatedRoute,
    templateService: TemplateService,
    private globalService: GlobalService) {
      super(route, templateService);
    }

  ngOnInit() {
    super.ngOnInit();
  }

  onChangeTemplateStatus(): void {
    const updatedTemplate: Template = JSON.parse(JSON.stringify(this.template));
    updatedTemplate.status = this.template.status ? 0 : 1;
    this.subscriptions.push(this.templateService.updateStatus(updatedTemplate).subscribe(() => {
      this.globalService.showMessage(MessageSeverity.SUCCESS, 'TEMPLATES.UPDATE.SUCCESS');

      this.getTemplate(this.template.id);
    }));
  }

}
