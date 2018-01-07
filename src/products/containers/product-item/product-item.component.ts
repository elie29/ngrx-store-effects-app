import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import {
  ProductsState,
  getSelectedPizza,
  LoadToppings,
  getAllToppings
} from '../../store';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  templateUrl: 'product-item.component.html'
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise: Pizza;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadToppings());
    this.pizza$ = this.store.select(getSelectedPizza);
    this.toppings$ = this.store.select(getAllToppings);
  }

  onSelect(event: number[]) {}

  onCreate(event: Pizza) {}

  onUpdate(event: Pizza) {}

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
    }
  }
}
