import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-interview-prep-list',
  templateUrl: './interview-prep-list.component.html',
})
export class InterviewPrepListComponent {
  @Input() questions: string[] = [];
  @Output() questionSelected = new EventEmitter<string>();

  expanded = true;
  selected: string | null = null;

  selectQuestion(question: string) {
    this.selected = question;
    this.questionSelected.emit(question);
    this.expanded = false;
  }

  expandList() {
    this.expanded = true;
  }
}
