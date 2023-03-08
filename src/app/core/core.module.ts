import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpExceptionsInterceptor } from './services/httpExceptions.interceptor';
import { SessionService } from './services/session.service';
@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpExceptionsInterceptor,
      multi: true,
    },
  ],
  imports: [],
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
