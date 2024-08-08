import { Component, HostListener } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { CurrentUserInfoResponse } from '../../models/user';
import { NgClass, NgIf } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgClass, NgIf, RouterModule],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  is_employee = false;

  tl = gsap.timeline();

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

    this.router.events.subscribe((event) => {
      if (this.isNavVisible() && window.innerWidth < 1100) {
        this.toggleNav();
      }
    });
  }

  isEmployee() {
    return this.is_employee;
  }

  ngAfterViewInit() {
    this.tl.from('#navi', { ease: 'linear', autoAlpha: 0, duration: 0.3 });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth < 1100 && this.isNavVisible()) {
      localStorage.setItem('show_nav', 'false');
    } else if (window.innerWidth > 1100 && !this.isNavVisible()) {
      localStorage.setItem('show_nav', 'true');
    }
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
