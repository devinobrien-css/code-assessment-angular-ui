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
})
export class RegisterComponent {
  step = 0;

  is_librarian = new FormControl(false);

  show_password = false;
  show_confirm_password = false;

  first = new FormControl('', Validators.required);
  last = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.email, Validators.required]);
  password = new FormControl('', Validators.required);
  confirmPassword = new FormControl('', Validators.required);

  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService,
  ) {}

  async goToStep(from: number, to: number) {
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
        if (to === 0) {
          this.step = to;
          return;
        }

        (await this.authService.emailExists(this.email.value ?? '')).subscribe(
          (response) => {
            const emailExists = response.exists;

            if (this.email.invalid) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please enter a valid email address',
              });
              return;
            }

            if (emailExists) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Email is already taken',
              });
              return;
            }

            this.step = to;
          },
        );

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

    if (this.passwordErrors().length > 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Password is invalid.`,
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

  passwordErrors(): string[] {
    const errors: string[] = [];

    if (this.password.value && !this.password.value.match(/[a-z]/)) {
      errors.push('lowercase');
    }

    if (this.password.value && !this.password.value.match(/[0-9]/)) {
      errors.push('number');
    }

    if (this.password.value && !this.password.value.match(/[A-Z]/)) {
      errors.push('uppercase');
    }

    if (this.password.value && this.password.value.length < 8) {
      errors.push('length');
    }

    if (this.password.value && !this.password.value.match(/[!@#$%^&*]/)) {
      errors.push('character');
    }

    if (this.password.value !== this.confirmPassword.value) {
      errors.push('match');
    }

    return errors;
  }

  togglePassword(): void {
    this.show_password = !this.show_password;
  }

  toggleConfirmPassword(): void {
    this.show_confirm_password = !this.show_confirm_password;
  }
}
