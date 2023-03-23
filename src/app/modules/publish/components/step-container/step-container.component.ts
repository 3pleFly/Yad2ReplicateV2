import {
  ChangeDetectorRef,
  Component,
  createEnvironmentInjector,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PublishRealestateService } from '../../services/publish-realestate.service';
import { StepData } from '../../models/step-data.interface';
import { StepHostDirective } from '../../directives/step-host.directive';
import { BaseStep } from '../../directives/base-step.directive';

@Component({
  selector: 'app-step-container',
  template: `
    <app-step-preview
      *ngIf="currentStep !== stepData.index; else showcase"
      [index]="stepData.index"
      [title]="stepData.previewTitle"
      [currentStep]="currentStep"
    ></app-step-preview>
    <ng-template #showcase>
      <p>?</p>
      <ng-template stepHost></ng-template>
    </ng-template>
  `,
})
export class StepContainerComponent  {
  constructor(
    private realestateService: PublishRealestateService,
    private cdr: ChangeDetectorRef
  ) {}

  @Input() stepData!: StepData;
  @Input() currentStep!: number;

  @ViewChild(StepHostDirective) set stepHost(stepHost: StepHostDirective) {
    if (stepHost) {
      this.loadComponent(stepHost);
    }
  }

  loadComponent(stepHost: StepHostDirective) {
    const injector = Injector.create({
      providers: [
        {
          provide: PublishRealestateService,
          useValue: this.realestateService,
        },
        { provide: StepData, useValue: this.stepData },
      ],
    });
    const componentRef = stepHost.viewContainerRef.createComponent<BaseStep>(
      this.stepData.component,
      { injector: injector }
    );

    stepHost.viewContainerRef.insert(componentRef.hostView);
    this.cdr.detectChanges();
  }
}
