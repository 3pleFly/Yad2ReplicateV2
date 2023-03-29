import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAdCategoryComponent } from './components/select-ad-category/select-ad-category.component';
import { PublishNavbarComponent } from './components/publish-navbar/publish-navbar.component';
import {
  TokenInterceptorProvider,
  Yad2ApisProvider,
} from 'src/app/core/helpers/interceptor-providers';
import { RouterModule, Routes } from '@angular/router';
import { PublishRealestateComponent } from './components/publish-realestate/publish-realestate.component';
import { Step1Component } from './components/step1/step1.component';
import { StepPreviewComponent } from './components/step-preview/step-preview.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { Step4Component } from './components/step4/step4.component';
import { Step5Component } from './components/step5/step5.component';
import { Step6Component } from './components/step6/step6.component';
import { Step7Component } from './components/step7/step7.component';
import { SevenStepFormTitleComponent } from './components/seven-step-form-title/seven-step-form-title.component';
import { DropdownSelectComponent } from 'src/app/shared/components/dropdown-select/dropdown-select.component';
import { DividerComponent } from 'src/app/shared/components/divider/divider.component';
import { AutoCompleteDropdownComponent } from 'src/app/shared/components/dropdown-list/autocomplete-dropdown.component';
import { FormControlComponent } from 'src/app/shared/components/form-control/form-control.component';
import { BoldSubStringPipe } from 'src/app/shared/pipes/bold-substring.pipe';
import { CommonInputComponent } from 'src/app/shared/components/common-input/common-input.component';
import { CheckmarkControlComponent } from 'src/app/shared/components/checkmark-control/checkmark-control.component';
import { FormNavButtonsComponent } from './components/form-nav-buttons/form-nav-buttons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExclusiveSelectBoxesComponent } from 'src/app/shared/components/exclusive-select-boxes/exclusive-select-boxes.component';
import { MultipleSelectBoxesComponent } from 'src/app/shared/components/multiple-select-boxes/multiple-select-boxes.component';
import { TextAreaFillbarComponent } from 'src/app/shared/components/text-area-fillbar/text-area-fillbar.component';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';
import { StepContainerComponent } from './components/step-container/step-container.component';
import { StepHostDirective } from './directives/step-host.directive';
import { UploadBoxComponent } from './components/upload-box/upload-box.component';
import { TrialBoxComponent } from './components/trial-box/trial-box.component';
import { RealestateFormService } from './services/realestate-form-data.service';
import { Yad2TranslationPipe } from 'src/app/shared/pipes/translate.pipe';

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
    StepContainerComponent,
    Step1Component,
    StepPreviewComponent,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step7Component,
    SevenStepFormTitleComponent,
    FormNavButtonsComponent,
    StepHostDirective,
    UploadBoxComponent,
    TrialBoxComponent
  ],
  providers: [TokenInterceptorProvider, Yad2ApisProvider, RealestateFormService],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DropdownSelectComponent,
    DividerComponent,
    AutoCompleteDropdownComponent,
    FormControlComponent,
    BoldSubStringPipe,
    CommonInputComponent,
    CheckmarkControlComponent,
    FontAwesomeModule,
    ExclusiveSelectBoxesComponent,
    MultipleSelectBoxesComponent,
    TextAreaFillbarComponent,
    TextAreaComponent,
    Yad2TranslationPipe
  ],
})
export default class PublishModule {}
