import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { User } from 'src/app/core/models/user.interface';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-publish-navbar',
  templateUrl: './publish-navbar.component.html',
  styleUrls: ['./publish-navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishNavbarComponent implements OnInit {
  sessionService = inject(SessionService);
  localService = inject(LocalisationService);

  @Input() currentStep!: number;
  siteLogo = this.localService.main.siteLogo;
  activeUser = this.localService.images.activeUser;
  local = this.localService.publish;
  user$ = this.sessionService.user$;

  ngOnInit(): void {}

  exit() {}
}
