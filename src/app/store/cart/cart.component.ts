import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Product } from '../shared';

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

  public updateOrRemoveProduct($event: Product): void {
    this.cartService.destroyProduct($event).subscribe(
      (destroyedProduct: Product) => console.log(destroyedProduct),
      (error: any) => console.error(error)
    );
  }
}
