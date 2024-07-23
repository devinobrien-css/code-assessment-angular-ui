import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '../../../shared/models/user';
import { UserService } from '../../../core/services/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-view-user-modal',
  standalone: true,
  imports: [NgFor],
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
      console.log(user);
    });
  }
}
