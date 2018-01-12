import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import {
  CreatePizza,
  DeletePizza,
  getAllToppings,
  getPizzaVisualised,
  getSelectedPizza,
  ProductsState,
  VisualiseToppings,
  UpdatePizza
} from '../../store';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  templateUrl: 'product-item.component.html'
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(getSelectedPizza).pipe(
      tap(pizza => {
        const exist = !!(pizza && pizza.toppings);
        const toppings = exist ? pizza.toppings.map(data => data.id) : [];
        this.onSelect(toppings);
      })
    );
    this.toppings$ = this.store.select(getAllToppings);
    this.visualise$ = this.store.select(getPizzaVisualised);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new VisualiseToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new DeletePizza(event));
    }
  }
}
