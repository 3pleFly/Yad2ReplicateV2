import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {

  constructor(private localService: LocalizationService) {}

  local = this.localService.AuthLocal;

}
