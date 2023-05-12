import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { PropertyAdDto } from 'src/app/modules/publish/models/property-ad-dto.interface';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, tap } from 'rxjs';
import { yad2Translate } from 'src/app/core/helpers/functions.helpers';
import { ComponentViewMode } from '../../models/view-model.enum';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { RealestateDataService } from '../../services/realestate-data.service';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ad-container',
  templateUrl: './ad-container.component.html',
  styleUrls: ['./ad-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdContainerComponent implements OnInit {
  private _localService = inject(LocalisationService);
  private _realestateDataService = inject(RealestateDataService);

  mode = ComponentViewMode.PREVIEW;

  imgPlaceholder = this._localService.images.realestate.imgPlaceholder;
  local = this._localService.realestate;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;
  faPhone = faPhoneSlash;
  faShareMenu = {
    newTab: faArrowUpRightFromSquare,
    email: faEnvelope,
    whatsapp: faWhatsapp,
    print: faPrint,
    link: faLink,
  };

  @Input() propertyAdDto!: PropertyAdDto;

  propertyFeaturesIcons$ = this._realestateDataService
    .getPropertyFeaturesIcons()
    .pipe(yad2Translate(this._localService.y2Translatables))
    .pipe(tap((v) => console.log('fired')));

  propertyType$!: Observable<string>;
  propertyState$!: Observable<string>;

  ngOnInit(): void {
    if (this.propertyAdDto) {
      this.propertyState$ = this._realestateDataService
        .getPropertyStateById(this.propertyAdDto.propertyStateId)
        .pipe(
          yad2Translate(this._localService.y2Translatables),
          map((y2r) => y2r.name)
        );

      this.propertyType$ = this._realestateDataService
        .getPropertyTypeById(this.propertyAdDto.propertyTypeId)
        .pipe(
          yad2Translate(this._localService.y2Translatables),
          map((y2r) => y2r?.name)
        );
    }
  }

  switchMode() {
    if (this.mode === ComponentViewMode.PREVIEW) {
      this.mode = ComponentViewMode.SHOWCASE;
    } else {
      this.mode = ComponentViewMode.PREVIEW;
    }
  }

  get ComponentView() {
    return ComponentViewMode;
  }

  isIconGrayed(id: number) {
    return !this.propertyAdDto.propertyFeaturesIds.includes(id);
  }
}
