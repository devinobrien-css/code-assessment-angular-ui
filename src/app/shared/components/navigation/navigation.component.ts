import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { CurrentUserInfoResponse } from '../../models/user';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgClass, NgIf, RouterModule],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  show_nav = false;
  is_employee = false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.show_nav = false;
    });

    this.userService
      .getCurrentUser()
      .subscribe((response: CurrentUserInfoResponse) => {
        this.is_employee = response.roles.includes('Employee');
      });
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
