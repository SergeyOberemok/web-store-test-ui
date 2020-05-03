import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input()
  public products$: Observable<Product[]>;
  @Input() isCatalog: boolean;
  @Input() isCart: boolean;

  @Output() added: EventEmitter<Product> = new EventEmitter();
  @Output() updated: EventEmitter<Product> = new EventEmitter();
  @Output() removed: EventEmitter<Product> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public itemAdded($event: Product): void {
    this.added.emit($event);
  }

  public itemUpdated($event: Product): void {
    this.updated.emit($event);
  }

  public itemRemoved($event: Product): void {
    this.removed.emit($event);
  }
}
