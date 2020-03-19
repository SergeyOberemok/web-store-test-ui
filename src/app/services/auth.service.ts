import { Injectable } from '@angular/core';
import { User } from '../shared';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;

  constructor() {
    this.user = new User();
  }

  public isAuthenticated(): boolean {
    return !!this.user;
  }

  public authenticate(): Observable<boolean> {
    this.user = new User();
    return of(true);
  }

  public register(): Observable<boolean> {
    return of(true);
  }

  public logout(): Observable<boolean> {
    this.user = null;
    return of(true);
  }
}
