import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {

  constructor(private localService: LocalisationService) {}

  localAuth = this.localService.auth;
  logoSvg = this.localService.main.siteLogo;
  images = this.localService.images.auth;
}
