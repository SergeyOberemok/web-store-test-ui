import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() isCatalog: boolean;
  @Input() isCart: boolean;
  @Output() selected: EventEmitter<Product> = new EventEmitter();

  public formGroup: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      quantity: new FormControl(1),
    });
  }

  public onSubmit(): void {
    this.selected.emit(this.product);
  }
}
