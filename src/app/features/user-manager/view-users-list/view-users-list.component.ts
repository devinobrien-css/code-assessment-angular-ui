import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { UserResponse } from '../../../shared/models/user';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, RouterModule],
  templateUrl: './view-users-list.component.html',
})
export class ViewUsersComponent {
  view_actions = '';
  users: UserResponse[] = [];

  search = new FormControl('');

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  toggleViewActions(id: string) {
    if (this.view_actions === id) {
      this.view_actions = '';
    } else {
      this.view_actions = id;
    }
  }

  getFilteredUsers() {
    return this.users.filter((user) => {
      return (
        user.first
          .toLowerCase()
          .includes((this.search.value ?? '').toLowerCase()) ||
        user.last
          .toLowerCase()
          .includes((this.search.value ?? '').toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes((this.search.value ?? '').toLowerCase())
      );
    });
  }
}
