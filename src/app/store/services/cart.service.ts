import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ApiUrls } from 'src/app/core/shared';
import { Product, ProductDto } from '../shared';
import { switchMap, map, toArray } from 'rxjs/operators';
import { CartProduct } from '../shared/cart-product';

@Injectable()
export class CartService {
  constructor(
    private http: HttpClient,
    @Inject('URLS') private urls: ApiUrls
  ) {}

  public fetchProducts(): Observable<CartProduct[]> {
    return this.http.get<ProductDto[]>(this.urls.cart.index).pipe(
      switchMap((products: ProductDto[]) => from(products)),
      map((product: ProductDto) => Object.assign(new CartProduct(), product)),
      toArray()
    );
  }

  public storeProduct(product: Product): Observable<Product> {
    return this.http
      .post<ProductDto>(
        this.urls.cart.store,
        CartProduct.makeCartProduct(product)
      )
      .pipe(
        map((storedProduct: ProductDto) =>
          Object.assign(new Product(), storedProduct)
        )
      );
  }

  public updateProduct(product: CartProduct): Observable<CartProduct> {
    return this.http
      .patch<ProductDto>(this.urls.cart.update.replace('${id}', product.id.toString()), product)
      .pipe(
        map((updatedProduct: ProductDto) =>
          Object.assign(new CartProduct(), updatedProduct)
        )
      );
  }

  public destroyProduct(product: CartProduct): Observable<CartProduct> {
    return this.http
      .delete<ProductDto>(
        this.urls.cart.destroy.replace('${id}', product.id.toString())
      )
      .pipe(
        map((deletedProduct: ProductDto) =>
          Object.assign(new CartProduct(), deletedProduct)
        )
      );
  }
}
