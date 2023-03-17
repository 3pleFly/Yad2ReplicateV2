import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/components/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'realestate-forsale', pathMatch: 'full' },
  {
    path: 'realestate-forsale',
    loadChildren: () =>
      import('./modules/realestate-forsale/realestate-forsale.module'),
  },
  { path: 'publish', loadChildren: () => import('./modules/publish/publish.module')},
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module') },
  { path: '**', redirectTo: 'realestate-forsale' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
