import { PizzasGuard } from './pizzas.guard';
import { PizzaExistsGuard } from './pizza-exists.guard';

export const guards = [PizzasGuard, PizzaExistsGuard];

export * from './pizzas.guard';
export * from './pizza-exists.guard';
