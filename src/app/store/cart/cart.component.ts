import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cart$: Observable<Cart[]>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.fetchCart();
  }

  public removeCartItem($event: Cart): void {
    this.cartService.destroyCart($event).subscribe(
      (destroyedProduct: Cart) => (this.cart$ = this.cartService.fetchCart()),
      (error: any) => console.error(error)
    );
  }

  public updateCartItem($event: Cart): void {
    this.cartService.updateCart($event).subscribe(
      (updatedProduct: Cart) => (this.cart$ = this.cartService.fetchCart()),
      (error: any) => console.error(error)
    );
  }

  public cartCheckout(): void {
    this.cartService.checkout().subscribe(() => (this.cart$ = of([])));
  }
}
