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
  is_employee = false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  isNavVisible() {
    return localStorage.getItem('show_nav') === 'true';
  }

  setNavVisible() {
    localStorage.setItem('show_nav', 'true');
  }

  ngOnInit() {
    this.userService
      .getCurrentUser()
      .subscribe((response: CurrentUserInfoResponse) => {
        this.is_employee = response.roles.includes('Employee');
      });
  }

  toggleNav() {
    const show_nav = localStorage.getItem('show_nav');
    if (show_nav === 'true') {
      localStorage.setItem('show_nav', 'false');
    } else {
      localStorage.setItem('show_nav', 'true');
    }
  }

  logout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.getIsAuthenticated();
  }
}
