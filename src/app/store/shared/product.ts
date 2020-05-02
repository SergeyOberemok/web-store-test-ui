export interface ProductDto {
  id: number;
  title: string;
  available: number;
  price: number;
  quantity: number;
}

export class Product implements ProductDto {
  id: number;
  title: string;
  available: number;
  price: number;
  quantity: number;

  constructor() {
    this.title = '';
    this.available = 0;
    this.price = 0;
    this.quantity = 0;
  }
}
