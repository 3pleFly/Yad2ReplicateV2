import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ExceptionInterceptorProvider } from './core/helpers/interceptor-providers';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule],
  providers: [ExceptionInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
