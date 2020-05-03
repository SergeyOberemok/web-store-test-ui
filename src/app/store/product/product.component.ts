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

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  @Input() isCatalog: boolean;
  @Input() isCart: boolean;

  @Output() added: EventEmitter<Product> = new EventEmitter();
  @Output() updated: EventEmitter<Product> = new EventEmitter();
  @Output() removed: EventEmitter<Product> = new EventEmitter();

  public formGroup: FormGroup;
  public maxQuantity = 0;

  private destroy$: Subject<void> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.maxQuantity = this.product.getMax();

    this.formGroup = new FormGroup({
      quantity: new FormControl(this.product.quantity),
    });

    this.formGroup
      .get('quantity')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((quantity: number) => (this.product.quantity = quantity));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    this.added.emit(this.product);
  }

  public updateClicked(): void {
    this.updated.emit(this.product);
  }

  public removeClicked(): void {
    this.removed.emit(this.product);
  }
}
