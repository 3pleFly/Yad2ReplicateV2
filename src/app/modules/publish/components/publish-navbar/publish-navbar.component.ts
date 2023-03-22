import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { SessionService } from 'src/app/core/services/session.service';
import { PublishRealestateService } from '../../services/publish-realestate.service';

@Component({
  selector: 'app-publish-navbar',
  templateUrl: './publish-navbar.component.html',
  styleUrls: ['./publish-navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishNavbarComponent {
  constructor(
    private localService: LocalisationService,
    private sessionService: SessionService
  ) {}

  @Input() currentStep!: number;
  siteLogo = this.localService.main.siteLogo;
  activeUser = this.localService.images.activeUser;
  local = this.localService.publish;
  user$ = this.sessionService.user$;

  exit() {}
}
