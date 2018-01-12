import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/Observable/throw';
import { catchError } from 'rxjs/operators';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return (
      this.http
        .get<Pizza[]>(`/api/pizzas`)
        // _throw is used here to inform the caller that an error has occured by sending the error message
        .pipe(catchError((error: any) => _throw(error.message)))
    );
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(`/api/pizzas`, payload)
      .pipe(catchError((error: any) => _throw(error.message)));
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`/api/pizzas/${payload.id}`, payload)
      .pipe(catchError((error: any) => _throw(error.message)));
  }

  removePizza(payload: Pizza): Observable<any> {
    return this.http
      .delete<any>(`/api/pizzas/${payload.id}`)
      .pipe(catchError((error: any) => _throw(error.message)));
  }
}
