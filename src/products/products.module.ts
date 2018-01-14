import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromGuard from './guards';
import * as fromServices from './services';
import * as fromStore from './store';

export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuard.PizzasGuard],
    component: fromContainers.ProductsComponent
  },
  {
    path: 'new',
    canActivate: [fromGuard.PizzasGuard, fromGuard.ToppingsGuard],
    component: fromContainers.ProductItemComponent
  },
  {
    path: ':pizzaId',
    canActivate: [fromGuard.PizzaExistsGuard, fromGuard.ToppingsGuard],
    component: fromContainers.ProductItemComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('products', fromStore.reducers), // lazy load with forFeature
    EffectsModule.forFeature(fromStore.effects)
  ],
  providers: [...fromServices.services, ...fromGuard.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}
