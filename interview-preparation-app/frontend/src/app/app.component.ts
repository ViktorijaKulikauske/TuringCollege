import { Component, inject } from '@angular/core';
import { OpenAIService } from './services/openai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected readonly openAIService = inject(OpenAIService);

  title = 'frontend';
  categories: string[] = [];
  positions: string[] = [];
  selectedCategory: string | null = null;
  selectedPosition: string | null = null;
  interviewPrep: string[] = [];
  suggestedAnswers: string[] = [];
  selectedQuestion: string | null = null;

  ngOnInit() {
    this.openAIService.getProfessionCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Failed to fetch categories', err),
    });
  }

  onCategoryClick(category: string) {
    this.selectedCategory = category;
    this.positions = [];
    this.selectedPosition = null;
    this.interviewPrep = [];
    this.openAIService.getPositionsByCategory(category).subscribe({
      next: (data) => (this.positions = data),
      error: (err) => console.error('Failed to fetch positions', err),
    });
  }

  onPositionClick(position: string) {
    this.selectedPosition = position;
    this.interviewPrep = [];
    this.suggestedAnswers = [];
    this.selectedQuestion = null;
    this.openAIService.getInterviewPrepByPosition(position).subscribe({
      next: (data) => {
        this.interviewPrep = data;
      },
      error: (err) =>
        console.error('Failed to fetch interview preparation', err),
    });
  }

  onQuestionClick(question: string) {
    this.selectedQuestion = question;
    this.suggestedAnswers = [];
    this.openAIService.getSuggestedAnswersByPosition(question).subscribe({
      next: (data: any) => {
        this.suggestedAnswers = data.map((item: any) => item.answer);
      },
      error: (err) => console.error('Failed to fetch suggested answers', err),
    });
  }
}
