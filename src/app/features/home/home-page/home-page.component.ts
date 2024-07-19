import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser();
  }
}
