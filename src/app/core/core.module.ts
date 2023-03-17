import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpExceptionsInterceptor } from './services/http-exceptions.interceptor';
import { SessionService } from './services/session.service';
import { LocalisationService } from './services/localisation.service';
import { TokenInterceptorProvider } from './helpers/interceptor-providers';

@NgModule({
  declarations: [],
  providers: [
    HttpExceptionsInterceptor,
    TokenInterceptorProvider,
    LocalisationService,
  ],
  imports: [HttpClientModule],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
    private sessionService: SessionService
  ) {
    this.isCoreAlreadyInitialized(parentModule);
    this.initializeSession();
  }

  isCoreAlreadyInitialized(parentModule: CoreModule) {
    if (parentModule) throw new Error('Core module already loaded once.');
  }

  initializeSession() {}
}
