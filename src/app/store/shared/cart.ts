import { Product, ProductDto } from './product';

export interface CartDto {
  id: number;
  quantity: number;
  productId?: number;
  product: ProductDto;
}

export class Cart implements CartDto {
  id: number;
  quantity: number;
  productId?: number;
  product: Product;

  public static makeCart(product: Product) {
    return Object.assign(new Cart(), product, {
      id: 0,
      productId: product.id
    });
  }

  constructor() {
    this.productId = 0;
  }
}
