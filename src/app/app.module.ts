import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  provideRouter,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { NavigationComponent } from './shared/components/navigation/navigation.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    ToastModule,

    NavigationComponent,

    HttpClientModule,

    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    MessageService,
    provideRouter(routes),
    provideHttpClient(withInterceptors([loggingInterceptor, authInterceptor])),
  ],
})
export class AppModule {}
