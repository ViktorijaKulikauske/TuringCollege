import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-position-list',
  standalone: true,
  templateUrl: './position-list.component.html',
})
export class PositionListComponent {
  @Input() positions: string[] = [];
  @Output() positionSelected = new EventEmitter<string>();
}
