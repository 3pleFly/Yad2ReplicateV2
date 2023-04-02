import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PropertyAdDto } from 'src/app/modules/publish/models/property-ad-dto.interface';
import { ComponentViewMode } from '../../models/view-model.enum';

@Component({
  selector: 'app-ad-container',
  templateUrl: './ad-container.component.html',
  styleUrls: ['./ad-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdContainerComponent {
  @Input() propertyAdDto!: PropertyAdDto;
  mode: ComponentViewMode = ComponentViewMode.PREVIEW;


  get Mode() {
    return ComponentViewMode;
  }
}
