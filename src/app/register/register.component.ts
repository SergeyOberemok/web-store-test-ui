import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';

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
    this.auth
      .register()
      .pipe(
        filter((result: boolean) => result),
        takeUntil(this.destroy$)
      )
      .subscribe((result: boolean) => this.router.navigate(['/login']));
  }

  private passwordMatchValidator(formGroup: FormGroup): void {
    const passwordFormControl = formGroup.get(
      this.passwordFormControlName
    );
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
