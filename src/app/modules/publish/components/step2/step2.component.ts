import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StepData } from '../../models/step-data.interface';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step2Component {



  @Input() stepData!: StepData;
}
