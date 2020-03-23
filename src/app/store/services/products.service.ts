import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Product, ProductDto } from '../shared';
import { ApiUrls } from 'src/app/core/shared';
import { map, switchMap, toArray } from 'rxjs/operators';

@Injectable()
export class ProductsService {
  constructor(
    private http: HttpClient,
    @Inject('URLS') private urls: ApiUrls
  ) {}

  public fetchProducts(): Observable<Product[]> {
    return this.http.get<ProductDto[]>(this.urls.products.index).pipe(
      switchMap((products: ProductDto[]) => from(products)),
      map((product: ProductDto) => Object.assign(new Product(), product)),
      toArray()
    );
  }
}
