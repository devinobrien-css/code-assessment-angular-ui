import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      ...Validators.required,
    }),
    password: new FormControl('', {
      nonNullable: true,
      ...Validators.required,
    }),
  });

  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService,
  ) {}

  onLogin(): void {
    if (!this.loginForm.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please enter your email and password',
      });
      return;
    }

    const loginCredentials = this.loginForm.value;

    this.authService.login(
      loginCredentials.email ?? '',
      loginCredentials.password ?? '',
    );
  }
}
