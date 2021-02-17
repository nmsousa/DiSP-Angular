import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  // },

  {
    path: '',
    redirectTo: '/certify-document',
    pathMatch: 'full'
  },
  {
    path: 'templates',
    loadChildren: () => import('./modules/templates/templates.module').then(m => m.TemplatesModule)
  },
  {
    path: 'user-preferences',
    loadChildren: () => import('./modules/user-preferences/user-preferences.module').then(m => m.UserPreferencesModule)
  },
  {
    path: 'token',
    loadChildren: () => import('./modules/token/token.module').then(m => m.TokenModule)
  },
  {
    path: 'signature-modes',
    loadChildren: () => import('./modules/signature-modes/signature-modes.module').then(m => m.SignatureModesModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule)
  },
  {
    path: 'certify-document',
    loadChildren: () => import('./modules/certify-document/certify-document.module').then(m => m.CertifyDocumentModule)
  },
  {
    path: 'latest-requests',
    loadChildren: () => import('./modules/latest-requests/latest-requests.module').then(m => m.LatestRequestsModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'search-requests',
    loadChildren: () => import('./modules/search-requests/search-requests.module').then(m => m.SearchRequestsModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'auditing-events',
    loadChildren: () => import('./modules/auditing-events/auditing-events.module').then(m => m.AuditingEventsModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'auditing-certify-documents',
    loadChildren: () => import('./modules/auditing-certify-documents/auditing-certify-documents.module')
      .then(m => m.AuditingCertifyDocumentsModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'signature-types',
    loadChildren: () => import('./modules/signature-types/signature-types.module').then(m => m.SignatureTypesModule),
    canActivate: [AdminGuard]
  },
  {
    path: '*',
    redirectTo: '/certify-document'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
