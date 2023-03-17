import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-preview',
  templateUrl: './step-preview.component.html',
  styleUrls: ['./step-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StepPreviewComponent {

  @Input() title!: string;
  @Input() index!: number;
  @Input() data!: any;

}
