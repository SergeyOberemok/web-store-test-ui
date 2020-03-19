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
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  emailFormControlName = 'email';
  passwordFormControlName = 'password';

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
    this.auth
      .authenticate()
      .pipe(
        filter((result: boolean) => result),
        takeUntil(this.destroy$)
      )
      .subscribe((result: boolean) => this.router.navigate(['/store']));
  }
}
