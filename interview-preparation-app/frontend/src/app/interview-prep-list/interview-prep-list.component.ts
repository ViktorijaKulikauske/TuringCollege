import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-interview-prep-list',
  standalone: true,
  templateUrl: './interview-prep-list.component.html',
})
export class InterviewPrepListComponent {
  @Input() questions: string[] = [];
  @Output() questionSelected = new EventEmitter<string>();
}
