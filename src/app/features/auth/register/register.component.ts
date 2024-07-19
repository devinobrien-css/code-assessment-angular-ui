import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, NgClass, ToastModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  step = 0;

  is_librarian = new FormControl(false);

  first = new FormControl('', Validators.required);
  last = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  confirmPassword = new FormControl('', Validators.required);

  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService,
  ) {}

  goToStep(from: number, to: number) {
    switch (from) {
      case 0:
        if (this.first.value === '' || this.last.value === '') {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please enter your first and last name',
          });
          return;
        }
        this.step = to;
        break;
      case 1:
        if (this.email.value === '') {
          if (to === 0) {
            this.step = to;
          } else {
            return;
          }
        }
        this.step = to;
        break;
      case 2:
        if (this.password.invalid || this.confirmPassword.invalid) {
          if (to === 1) {
            this.step = to;
          } else {
            return;
          }
        }
        this.step = to;
        break;
    }
  }

  register(): void {
    if (
      !this.first.value ||
      !this.last.value ||
      !this.email.value ||
      !this.password.value ||
      !this.password.value
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please enter all required fields',
      });
      return;
    }

    if (this.password.value !== this.confirmPassword.value) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Passwords do not match',
      });
      return;
    }

    this.authService.register(
      this.first.value,
      this.last.value,
      this.email.value,
      this.password.value,
      this.is_librarian.value ?? false,
    );
  }

  toggleLibrarian(): void {
    this.is_librarian.setValue(!this.is_librarian.value);
  }
}
