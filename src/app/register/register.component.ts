import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { filter, takeUntil, finalize } from 'rxjs/operators';
import { User } from '../shared';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  emailFormControlName = 'email';
  passwordFormControlName = 'password';
  repeatPasswordFormControlName = 'repeatPassword';
  isRegistering: boolean;
  errorMessage: string;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator.bind(this),
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    this.isRegistering = true;

    this.auth
      .register(
        new User({
          email: this.formGroup.get('email').value,
          password: this.formGroup.get('password').value,
        })
      )
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isRegistering = false))
      )
      .subscribe(
        (user: User) => {
          if (user.id) {
            this.router.navigate(['/login']);
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);

          this.errorMessage = error.error.message;
          setTimeout(() => (this.errorMessage = ''), 4000);
        }
      );
  }

  private passwordMatchValidator(formGroup: FormGroup): void {
    const passwordFormControl = formGroup.get(this.passwordFormControlName);
    const repeatPasswordFormControl = formGroup.get(
      this.repeatPasswordFormControlName
    );

    if (
      repeatPasswordFormControl.errors &&
      !repeatPasswordFormControl.errors.isRepeated
    ) {
      return;
    }

    if (passwordFormControl.value !== repeatPasswordFormControl.value) {
      repeatPasswordFormControl.setErrors({ isRepeated: true });
    } else {
      repeatPasswordFormControl.setErrors(null);
    }
  }
}
