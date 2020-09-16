import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../shared';
import { Cart } from '../shared/cart';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public products$: Observable<Product[]>;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productsService.fetchCart();
  }

  public addToCard($event: Product): void {
    this.cartService.storeCart($event).subscribe(
      (storedCart: Cart) =>
        (this.products$ = this.productsService.fetchCart()),
      (error: any) => console.error(error)
    );
  }
}
