import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'de', 'fr']);
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use('en');
  }

  ngOnInit(): void {
  }

}
