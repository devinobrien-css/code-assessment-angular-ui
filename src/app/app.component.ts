import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
})
export class AppComponent {
  show_nav = false;

  constructor(private messageService: MessageService, private http: HttpClient) {}

  ngOnInit() {
    console.log(this.isEmployee());
  }

  toggleNav() {
    this.show_nav = !this.show_nav;
  }

  isEmployee(): boolean {
    this.http.get('/api/account/current-user').subscribe((response: any) => {
      console.log(response);
      if(response.roles.includes('Employee')) {
        return true;
      }
      return false;
    });
    return false;
  }
}
