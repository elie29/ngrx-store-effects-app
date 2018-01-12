import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

import {
  getAllPizzas,
  LoadPizzas,
  ProductsState,
  LoadToppings
} from '../../../products/store';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select(getAllPizzas);

    // Dispatch an action from the store
    this.store.dispatch(new LoadPizzas());
    this.store.dispatch(new LoadToppings());
  }
}
