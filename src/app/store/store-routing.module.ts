import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { StoreComponent } from './store.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'catalog',
        component: CatalogComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
