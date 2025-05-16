import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-position-list',

  templateUrl: './position-list.component.html',
})
export class PositionListComponent {
  @Input() positions: string[] = [];
  @Output() positionSelected = new EventEmitter<string>();

  expanded = true;
  selected: string | null = null;

  selectPosition(position: string) {
    this.selected = position;
    this.positionSelected.emit(position);
    this.expanded = false;
  }

  expandList() {
    this.expanded = true;
  }
}
