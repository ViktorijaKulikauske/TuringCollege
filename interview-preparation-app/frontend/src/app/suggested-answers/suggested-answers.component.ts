import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggested-answers',

  templateUrl: './suggested-answers.component.html',
})
export class SuggestedAnswersComponent {
  @Input() question: string = '';
  @Input() answers: string[] = [];
}
