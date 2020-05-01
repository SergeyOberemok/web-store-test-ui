import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil, switchMap, tap, finalize } from 'rxjs/operators';
import { User } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  emailFormControlName = 'email';
  passwordFormControlName = 'password';
  isAuthenticating: boolean;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    this.isAuthenticating = true;

    this.auth
      .authenticate(
        new User({
          email: this.formGroup.get('email').value,
          password: this.formGroup.get('password').value,
        })
      )
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isAuthenticating = false))
      )
      .subscribe(
        (user: User) => {
          console.log('login success', user);
          if (this.auth.isAuthenticated) {
            this.router.navigate(['/store']);
          }
        },
        (error: any) => console.error(error)
      );
  }
}
