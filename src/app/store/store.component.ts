import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.router.navigate(['/store/catalog']);
  }

  public logout(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/login']));
  }

}
