import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  // },
  { path: '',
    redirectTo: '/latest-requests',
    pathMatch: 'full'
  },
  // {
  //   path: 'requests',
  //   loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule)
  // },
  // {
  //   path: 'templates',
  //   loadChildren: () => import('./modules/templates/templates.module').then(m => m.TemplatesModule)
  // },
  {
    path: 'latest-requests',
    loadChildren: () => import('./modules/latest-requests/latest-requests.module').then(m => m.LatestRequestsModule)
  },
  {
    path: 'search-requests',
    loadChildren: () => import('./modules/search-requests/search-requests.module').then(m => m.SearchRequestsModule)
  },
  {
    path: 'signature-modes',
    loadChildren: () => import('./modules/signature-modes/signature-modes.module').then(m => m.SignatureModesModule)
  },
  {
    path: 'signature-types',
    loadChildren: () => import('./modules/signature-types/signature-types.module').then(m => m.SignatureTypesModule)
  },
  {
    path: 'auditing-events',
    loadChildren: () => import('./modules/auditing-events/auditing-events.module').then(m => m.AuditingEventsModule)
  },
  { path: '*',
    redirectTo: '/latest-requests'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
