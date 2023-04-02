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
import { SessionService } from 'src/app/core/services/session.service';
import { filter, map, tap } from 'rxjs';
import { yad2Translate } from 'src/app/core/helpers/functions.helpers';

@Component({
  selector: 'app-ad-previewer',
  templateUrl: './ad-previewer.component.html',
  styleUrls: ['./ad-previewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdPreviewerComponent implements OnInit {
  private _localService = inject(LocalisationService);
  private _sessionService = inject(SessionService);
  imgPlaceholder = this._localService.images.realestate.imgPlaceholder;
  local = this._localService.realestate;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  @Input() propertyDto!: PropertyAdDto;

  propertyType$ = this._sessionService.getPropertyTypes().pipe(
    map((y2r) => y2r?.find((pt) => pt.id === this.propertyDto.propertyTypeId)),
    map((y2r) => y2r?.name),
    yad2Translate()
  );

  ngOnInit(): void {}
}
