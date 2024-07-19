import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // email and password fields and login handler
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService,
  ) {}

  onLogin(): void {
    if (
      this.email.invalid ||
      this.password.invalid ||
      this.email.value === '' ||
      this.password.value === ''
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please enter your email and password',
      });
      return;
    }

    this.authService.login(this.email.value ?? '', this.password.value ?? '');
  }
}
