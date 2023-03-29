import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { Trait, Trial } from '../../models/trial-traits.interface';

@Component({
  selector: 'app-trial-box',
  templateUrl: './trial-box.component.html',
  styleUrls: ['./trial-box.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrialBoxComponent {
  constructor(private localService: LocalisationService) {}

  @Input() trial!: Trial;
  @Input() boldTraitIndexes: { [index: number]: number }[] = [];

  @Output() selectTrial = new EventEmitter<Trial>();

  @ContentChild('duration') durationTemplate!: TemplateRef<any> | undefined;

  local = this.localService.publish;
  recommendedRibbonSvg =
    this.localService.images.publish.step7.recommendedRibbon;

  emitSelectTrial(trial: Trial) {
    this.selectTrial.emit(trial);
  }

  isBold(index: number) {
    return this.boldTraitIndexes[index] ? true : false;
  }
}
