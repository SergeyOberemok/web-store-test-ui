import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { CoreModule } from '../core/core.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [
    StoreComponent,
    ProductListComponent,
    ProductComponent,
    CartComponent,
    CatalogComponent,
  ],
  imports: [CommonModule, StoreRoutingModule, CoreModule],
  exports: [StoreComponent],
  providers: [ProductsService],
})
export class StoreModule {}
