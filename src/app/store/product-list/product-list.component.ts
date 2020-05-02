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
  @Output() selected: EventEmitter<Product> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public itemSelected($event: Product): void {
    this.selected.emit($event);
  }
}
