import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '../../../shared/models/user';
import { UserService } from '../../../core/services/user.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-user-modal',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './view-user-modal.component.html',
})
export class ViewUserModalComponent {
  userId = this.route.snapshot.params['id'];

  user: UserResponse = {
    id: '',
    email: '',
    first: '',
    last: '',
    profileAvatar: '',
    transactions: [],
    roles: [],
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getUser(this.userId).subscribe((user) => {
      this.user = user;
    });
  }
}
