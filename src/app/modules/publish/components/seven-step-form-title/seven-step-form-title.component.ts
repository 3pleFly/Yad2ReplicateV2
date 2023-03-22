import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-seven-step-form-title',
  templateUrl: './seven-step-form-title.component.html',
  styleUrls: ['./seven-step-form-title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SevenStepFormTitleComponent {
  constructor() {}
  @Input() index!: number;
  @Input() title!: string;
}
