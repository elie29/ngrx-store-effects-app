import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';
import { reducers } from './store';

export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.ProductsComponent
  },
  {
    path: ':id',
    component: fromContainers.ProductItemComponent
  },
  {
    path: 'new',
    component: fromContainers.ProductItemComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('products', reducers) // lazy load with forFeature
  ],
  providers: [...fromServices.services],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}
