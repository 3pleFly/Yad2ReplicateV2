import { Inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SessionService } from './core/services/session.service';

const routes: Routes = [
  { path: '', redirectTo: 'realestate-forsale', pathMatch: 'full' },
  {
    path: 'realestate-forsale',
    loadChildren: () =>
      import('./modules/realestate-forsale/realestate-forsale.module'),
  },
  {
    path: 'publish',
    loadChildren: () => import('./modules/publish/publish.module'),
    canActivate: [AuthGuard],
  },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module') },
  { path: '**', redirectTo: 'realestate-forsale' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [SessionService],
  exports: [RouterModule],
})
export class AppRoutingModule {}
