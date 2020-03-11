import {registerLocaleData} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import en from '@angular/common/locales/en';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {EpNgLibModule, EpNotificationService} from 'ep-ng-lib';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BreadcrumbLineComponent} from './core/header/breadcrumb-line/breadcrumb-line.component';
import {TopbarModule} from './core/header/top-navbar/topbar.module';
import {ErrorHandlerInterceptor} from './core/interceptors/error-handler.interceptor';
import {HeaderHandlerInterceptor} from './core/interceptors/header-handler.interceptor';
import {SidebarComponent} from './core/sidebar/sidebar.component';
import {SharedModule} from './shared/shared.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

registerLocaleData(en);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// This is only required because of the /ng-app/ throwing an en.json 404 not found
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, SidebarComponent, BreadcrumbLineComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    TopbarModule,
    SharedModule.forRoot(),
    EpNgLibModule,
    PerfectScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderHandlerInterceptor, multi: true
    },
    EpNotificationService
  ],

  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
