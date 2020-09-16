import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared';
import { Cart } from '../shared/cart';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input()
  public products: Product[];
  @Input()
  public cart: Cart[];

  public get items(): Product[] | Cart[] {
    return this.products || this.cart;
  }

  get isCatalog(): boolean {
    return !!this.products;
  }
  get isCart(): boolean {
    return !!this.cart;
  }

  @Output() added: EventEmitter<Product | Cart> = new EventEmitter();
  @Output() updated: EventEmitter<Product | Cart> = new EventEmitter();
  @Output() removed: EventEmitter<Product | Cart> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  public itemAdded($event: Product | Cart): void {
    this.added.emit($event);
  }

  public itemUpdated($event: Product | Cart): void {
    this.updated.emit($event);
  }

  public itemRemoved($event: Product | Cart): void {
    this.removed.emit($event);
  }
}
