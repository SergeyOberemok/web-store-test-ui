import { Product } from './product';

export class CartProduct extends Product {
  productId: number;

  public static makeCartProduct(product: Product) {
    return Object.assign(new CartProduct(), product, {
      id: 0,
      productId: product.id
    });
  }

  constructor() {
    super();

    this.productId = 0;
  }

  public getMax(): number {
    return this.quantity + this.available;
  }
}
