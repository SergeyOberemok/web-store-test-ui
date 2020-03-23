export interface ProductDto {
  id: number;
  title: string;
  available: number;
  price: number;
}

export class Product implements ProductDto {
  id: number;
  title: string;
  available: number;
  price: number;

  constructor() {
    this.title = '';
    this.available = 0;
    this.price = 0;
  }
}

