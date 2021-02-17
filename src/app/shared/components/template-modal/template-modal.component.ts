import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Template } from './../../models/entities/template.model';
import { TemplateService } from './../../services/template.service';

@Component({
  selector: 'app-template-modal',
  templateUrl: './template-modal.component.html',
  styleUrls: ['./template-modal.component.less']
})
export class TemplateModalComponent implements OnInit {

  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Input() templates: Array<{ links: [], content: Template }> = [];

  @Output() confirm: EventEmitter<Template> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  subscriptions: Subscription[] = [];

  selectedTemplate: { links: [], content: Template };
  isLoading: boolean = false;

  constructor(private templateService: TemplateService) { }

  ngOnInit() {
    this.getTemplates();
  }

  getTemplates(): void {
    this.isLoading = true;

    this.subscriptions.push(this.templateService
      .getTemplates()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.templates = data.content;
        }
      )
    );
  }

  onSelectedTemplate(event: any): void {
    if (this.selectedTemplate !== event) {
      this.selectedTemplate = event;
    } else {
      this.selectedTemplate = null;
    }
  }

  onConfirm() {
    // Get the selected Template and send it to the parent component
    this.confirm.emit(this.selectedTemplate.content);

    this.selectedTemplate = null;
  }

  onCancel() {
    this.close.emit();

    this.selectedTemplate = null;
  }

}
