import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'recent',
        loadChildren: () => import('./recent/recent.module').then(m => m.RecentPageModule)
      },
      {
        path: 'albums',
        loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsPageModule)
      },
      {
        path: '',
        redirectTo: '/recent',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
