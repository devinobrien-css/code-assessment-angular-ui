import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CurrentUserInfoResponse } from './shared/models/user';
import { UserService } from './core/services/user.service';
import { AuthenticationService } from './core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
})
export class AppComponent {
  show_nav = false;
  is_employee = false;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.show_nav = false;
    });

    if (this.isAuthenticated()) {
      try {
        this.userService
          .getCurrentUser()
          .subscribe((response: CurrentUserInfoResponse) => {
            this.is_employee = response.roles.includes('Employee');
          });
      } catch (e) {
        this.authService.logout();
      }
    }
  }

  toggleNav() {
    this.show_nav = !this.show_nav;
  }

  logout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.getIsAuthenticated();
  }
}
