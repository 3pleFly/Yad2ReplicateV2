import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAdCategoryComponent } from './components/select-ad-category/select-ad-category.component';
import { PublishNavbarComponent } from './components/publish-navbar/publish-navbar.component';
import { TokenInterceptorProvider } from 'src/app/core/helpers/interceptor-providers';
import { RouterModule, Routes } from '@angular/router';
import { PublishRealestateComponent } from './components/publish-realestate/publish-realestate.component';
import { Step1Component } from './components/step1/step1.component';
import { StepPreviewComponent } from './components/step-preview/step-preview.component';
import { Step2Component } from './components/step2/step2.component';

const routes: Routes = [
  {
    path: '',
    component: PublishRealestateComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    SelectAdCategoryComponent,
    PublishNavbarComponent,
    PublishRealestateComponent,
    Step1Component,
    StepPreviewComponent,
    Step2Component,
  ],
  providers: [TokenInterceptorProvider],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export default class PublishModule {}
