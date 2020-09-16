import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { ApiUrls } from 'src/app/core/shared';
import { Product } from '../shared';
import { switchMap, map, toArray, catchError } from 'rxjs/operators';
import { Cart, CartDto } from '../shared/cart';

@Injectable()
export class CartService {
  constructor(
    private http: HttpClient,
    @Inject('URLS') private urls: ApiUrls
  ) {}

  public fetchCart(): Observable<Cart[]> {
    return this.http.get<CartDto[]>(this.urls.cart.index).pipe(
      switchMap((cartItems: CartDto[]) => from(cartItems)),
      map((cartItem: CartDto) =>
        Object.assign(new Cart(), cartItem, {
          product: Object.assign(new Product(), cartItem.product),
        })
      ),
      toArray(),
      catchError((error) => (console.error(error), of(error)))
    );
  }

  public storeCart(product: Product): Observable<Cart> {
    return this.http
      .post<CartDto>(this.urls.cart.store, Cart.makeCart(product))
      .pipe(
        map(
          (storedCart: CartDto) =>
            Object.assign(new Cart(), storedCart, {
              product: Object.assign(new Product(), storedCart.product),
            }),
          catchError((error) => (console.error(error), of(error)))
        )
      );
  }

  public updateCart(cart: Cart): Observable<Cart> {
    return this.http
      .patch<CartDto>(
        this.urls.cart.update.replace('${id}', cart.id.toString()),
        cart
      )
      .pipe(
        map((updatedCart: CartDto) => Object.assign(new Cart(), updatedCart)),
        catchError((error) => (console.error(error), of(error)))
      );
  }

  public destroyCart(cart: Cart): Observable<Cart> {
    return this.http
      .delete<CartDto>(
        this.urls.cart.destroy.replace('${id}', cart.id.toString())
      )
      .pipe(
        map(
          (deletedCart: CartDto) => Object.assign(new Cart(), deletedCart),
          catchError((error) => (console.error(error), of(error)))
        )
      );
  }

  public checkout(): Observable<{}> {
    return this.http
      .post(this.urls.cart.checkout, {})
      .pipe(catchError((error) => (console.error(error), of(error))));
  }
}
