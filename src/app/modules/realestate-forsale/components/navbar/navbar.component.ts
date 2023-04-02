import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  localService = inject(LocalisationService);
  sessionService = inject(SessionService);

  local = this.localService.navigation;
  logoSvg = this.localService.main.siteLogo;
  hamburgerIcon = this.localService.images.buttons.hamburgerIcon;
  userIcon = this.localService.images.navigation.user;
  singleCharacterUsername$ = this.sessionService.user$.pipe(
    map((user) => user?.userName[0])
  );


}
