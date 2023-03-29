import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { RealestateDataService } from '../../services/publish-realestate.service';

@Component({
  selector: 'app-step-preview',
  template: `
    <div
      (click)="emitStep()"
      [ngClass]="{ container: true, checked: afterCurrentStep() }"
    >
      <div class="right">
        <span class="index">{{ afterCurrentStep() ? '' : index }}</span>
        <span class="title">{{ title }}</span>
      </div>
      <img *ngIf="afterCurrentStep()" [src]="editIcon" alt="edit" />
    </div>
  `,
  styleUrls: ['./step-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepPreviewComponent {
  constructor(
    private localService: LocalisationService,
    private realesateService: RealestateDataService
  ) {}
  @Input() title!: string;
  @Input() index!: number;
  @Input() data!: any;
  @Input() currentStep!: number;
  editIcon = this.localService.images.publish.editStepIcon;

  afterCurrentStep() {
    return this.index < this.currentStep;
  }

  emitStep() {
    this.realesateService.currentStep = this.index;
  }
}
