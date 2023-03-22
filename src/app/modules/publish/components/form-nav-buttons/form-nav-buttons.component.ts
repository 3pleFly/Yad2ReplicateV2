import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { IStep } from '../../models/istep.interface';

@Component({
  selector: 'app-form-nav-buttons',
  template: `
    <button class="colorless-btn" (click)="emitNextStep()">
      {{ local.steps_btn_back }}
    </button>
    <button class="next btn" (click)="emitPrevStep()">
      {{ local.steps_btn_nextStep }}
    </button>
  `,
  styleUrls: ['./form-nav-buttons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormNavButtonsComponent  {
  constructor(private localService: LocalisationService) {}
  local = this.localService.publish;

  @Output() nextStep = new EventEmitter();
  @Output() prevStep = new EventEmitter();

  emitPrevStep() {
    this.nextStep.emit();
  }
  emitNextStep() {
    this.prevStep.emit();
  }
}
