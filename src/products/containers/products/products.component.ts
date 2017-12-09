import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProductsState } from '../../../products/store';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnInit {
  pizzas: Pizza[] = [];

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.store.select<any>('products').subscribe(state => console.log(state));
  }
}
