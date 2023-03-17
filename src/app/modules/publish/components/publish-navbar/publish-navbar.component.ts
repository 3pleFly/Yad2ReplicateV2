import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-publish-navbar',
  templateUrl: './publish-navbar.component.html',
  styleUrls: ['./publish-navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishNavbarComponent {
  constructor(
    private localService: LocalisationService,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute
  ) {}

  siteLogo = this.localService.main.siteLogo;
  activeUser = this.localService.images.activeUser;
  local = this.localService.publish;

  route$ = this.activatedRoute.url;
  user$ = this.sessionService.user$;


  exit() {

  }
}
