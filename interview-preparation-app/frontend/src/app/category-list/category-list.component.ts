import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-list',

  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();
}
