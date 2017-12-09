import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'pizza-item',
  changeDetection: ChangeDetectionStrategy.OnPush, // Only when pizza object changes but not its content
  styleUrls: ['pizza-item.component.scss'],
  templateUrl: 'pizza-item.component.html'
})
export class PizzaItemComponent {
  @Input() pizza: any;
}
