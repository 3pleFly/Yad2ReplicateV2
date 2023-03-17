import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealestateForsaleComponent } from './components/realestate-forsale/realestate-forsale.component';

const routes: Routes = [{ path: '', component: RealestateForsaleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealestateForsaleRoutingModule {}
