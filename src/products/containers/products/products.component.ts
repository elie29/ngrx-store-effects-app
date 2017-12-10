import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProductsState, LoadPizzas } from '../../../products/store';
import { Pizza } from '../../models/pizza.model';
import { getAllPizzas } from '../../store/reducers';
import 'rxjs/add/operator/do';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store
      .select(getAllPizzas)
      .do(pizzas => console.log(pizzas));

    // Dispatch an action from the store
    this.store.dispatch(new LoadPizzas());
  }
}
