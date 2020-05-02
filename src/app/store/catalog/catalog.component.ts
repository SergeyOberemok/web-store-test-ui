import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../shared';

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
    this.products$ = this.productsService.fetchProducts();
  }

  public addToCard($event: Product): void {
    this.cartService.storeProduct($event).subscribe(
      (storedProduct: Product) =>
        (this.products$ = this.productsService.fetchProducts()),
      (error: any) => console.error(error)
    );
  }
}
