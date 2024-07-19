import { Component } from '@angular/core';
import {
  CurrentUserInfoResponse,
  ProfileAvatar,
} from '../../../shared/models/user';
import { UserService } from '../../../core/services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  user: CurrentUserInfoResponse | null = null;
  avatars: ProfileAvatar[] = [];
  select_avatar = false;

  first_name = new FormControl('');
  last_name = new FormControl('');
  email = new FormControl({ value: '', disabled: true });

  constructor(
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((response) => {
      this.user = response;
      this.first_name.setValue(response.first);
      this.last_name.setValue(response.last);
      this.email.setValue(response.email);
    });

    this.userService.getProfileAvatars().subscribe((response) => {
      this.avatars = response;
    });
  }

  resetForm() {
    if (this.user) {
      this.first_name.setValue(this.user.first);
      this.last_name.setValue(this.user.last);
    }
  }

  isFormDirty() {
    if (this.user) {
      return (
        this.first_name.value !== this.user.first ||
        this.last_name.value !== this.user.last
      );
    }
    return false;
  }

  onUpdateUser() {
    if (this.user) {
      this.userService
        .updateUser(
          this.user.id,
          this.first_name.value ?? '',
          this.last_name.value ?? '',
        )
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User updated successfully',
          });
        });
    }
  }

  onSelectNewAvatar() {
    this.select_avatar = true;
  }

  onCancelSelectNewAvatar() {
    this.select_avatar = false;
  }

  onUpdateAvatar(avatar: ProfileAvatar) {
    if (this.user) {
      this.userService
        .setProfileAvatar(this.user.id, avatar.id)
        .subscribe(() => {
          this.user!.profileAvatar = avatar;
          this.select_avatar = false;
        });
    }
  }
}
