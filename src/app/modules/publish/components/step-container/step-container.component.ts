import { Component, Injector, Input, OnInit } from '@angular/core';
import { PublishRealestateService } from '../../services/publish-realestate.service';

import { StepData } from '../../models/step-data.interface';
import { IStep } from '../../models/istep.interface';

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
      <ng-container
        *ngComponentOutlet="stepData.component; injector: injector"
      ></ng-container>
    </ng-template>
  `,
})
export class StepContainerComponent implements OnInit, IStep {
  constructor(private realestateService: PublishRealestateService) {}

  @Input() stepData!: StepData;
  @Input() currentStep!: number;
  injector!: Injector;

  ngOnInit(): void {
    this.injector = Injector.create({
      providers: [
        { provide: StepData, useValue: this.stepData },
        {
          provide: PublishRealestateService,
          useValue: this.realestateService,
        },
      ],
    });
  }
}
