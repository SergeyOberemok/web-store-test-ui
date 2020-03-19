import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'store', component: StoreComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: 'store', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
