import { Injectable } from '@angular/core';
import { logoSvg, auth  } from 'src/assets/localization/auth';

@Injectable()
export class LocalizationService {
  constructor() {}

  get AuthLocal() {
    return { logoSvg, auth  };
  }
}
