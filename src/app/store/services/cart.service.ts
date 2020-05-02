import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ApiUrls } from 'src/app/core/shared';
import { Product, ProductDto } from '../shared';
import { switchMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class CartService {
  constructor(
    private http: HttpClient,
    @Inject('URLS') private urls: ApiUrls
  ) {}

  public fetchProducts(): Observable<Product[]> {
    return this.http.get<ProductDto[]>(this.urls.cart.index).pipe(
      switchMap((products: ProductDto[]) => from(products)),
      map((product: ProductDto) => Object.assign(new Product(), product)),
      toArray()
    );
  }

  public storeProduct(product: Product): Observable<Product> {
    return this.http
      .post<ProductDto>(this.urls.cart.store, product)
      .pipe(
        map((storedProduct: ProductDto) =>
          Object.assign(new Product(), storedProduct)
        )
      );
  }

  public destroyProduct(product: Product): Observable<Product> {
    return this.http.delete<ProductDto>(
      this.urls.cart.destroy.replace('${id}', product.id.toString())
    );
  }
}
