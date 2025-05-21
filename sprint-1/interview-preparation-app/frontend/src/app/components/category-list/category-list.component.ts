import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-list',

  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  expanded = true;
  selected: string | null = null;

  selectCategory(category: string) {
    this.selected = category;
    this.categorySelected.emit(category);
    this.expanded = false;
  }

  expandList() {
    this.expanded = true;
  }
}
