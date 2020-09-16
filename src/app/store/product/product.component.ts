import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from '../shared/cart';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  @Input()
  get cart(): Cart {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;
    this.product = this._cart.product;
  }

  @Output() added: EventEmitter<Product> = new EventEmitter();
  @Output() updated: EventEmitter<Cart> = new EventEmitter();
  @Output() removed: EventEmitter<Cart> = new EventEmitter();

  public formGroup: FormGroup;

  public get isCatalog(): boolean {
    return !this._cart;
  }
  public get isCart(): boolean {
    return !!this._cart;
  }

  public get quantity(): number {
    return this.isCatalog ? this.product.quantity : this.cart.quantity;
  }
  public set quantity(quantity: number) {
    const item = this.isCatalog ? this.product : this.cart;

    item.quantity = quantity;
  }

  private _cart: Cart;
  private destroy$: Subject<void> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      quantity: new FormControl(this.quantity),
    });

    this.formGroup
      .get('quantity')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((quantity: number) => (this.quantity = quantity));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    this.added.emit(this.product);
  }

  public updateClicked(): void {
    this.updated.emit(this.cart);
  }

  public removeClicked(): void {
    this.removed.emit(this.cart);
  }
}
