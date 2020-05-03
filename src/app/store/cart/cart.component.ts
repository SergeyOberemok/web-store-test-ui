import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Product } from '../shared';
import { CartProduct } from '../shared/cart-product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public products$: Observable<Product[]>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.products$ = this.cartService.fetchProducts();
  }

  public removeCartItem($event: CartProduct): void {
    this.cartService.destroyProduct($event).subscribe(
      (destroyedProduct: CartProduct) =>
        (this.products$ = this.cartService.fetchProducts()),
      (error: any) => console.error(error)
    );
  }

  public updateCartItem($event: CartProduct): void {
    this.cartService.updateProduct($event).subscribe(
      (updatedProduct: CartProduct) =>
        (this.products$ = this.cartService.fetchProducts()),
      (error: any) => console.error(error)
    );
  }
}
