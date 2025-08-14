import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    loginId: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true]
  });

  get f() { return this.form.controls; }

  submit(): void {
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;

    // Simulate request
    setTimeout(() => {
      this.isSubmitting = false;
      // TODO: integrate with real auth
      // For now, just log the values
      console.log('Admin login', this.form.value);
    }, 800);
  }
}
