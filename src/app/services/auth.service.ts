import { Injectable, Inject } from '@angular/core';
import { User } from '../shared';
import { Observable, of, Observer } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiUrls } from '../core/shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;

  constructor(private http: HttpClient, @Inject('URLS') private urls: ApiUrls) {
    this.user = new User();
  }

  public isAuthenticated(): boolean {
    return !!this.user.id;
  }

  public authenticate(user: User): Observable<User> {
    return new Observable<User>((observer: Observer<User>) => {
      this.http.post(this.urls.auth.login, user).subscribe(
        (authUser: User) => {
          this.user = authUser;

          observer.next(Object.assign(new User(), authUser));
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          observer.error(error);
        }
      );
    });
  }

  public register(user: User): Observable<User> {
    return new Observable<User>((observer: Observer<User>) => {
      this.http.post(this.urls.auth.register, user).subscribe(
        (registerUser: User) => {
          observer.next(Object.assign(new User(), registerUser));
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          observer.error(error);
        }
      );
    });
  }

  public logout(): Observable<boolean> {
    this.user = new User();
    return of(true);
  }

  public getAuthToken(): string {
    if (!this.isAuthenticated()) {
      return '';
    }

    return 'Basic ' + btoa(`${this.user.email}:${this.user.password}`);
  }
}
