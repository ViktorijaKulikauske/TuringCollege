import { Component, inject } from '@angular/core';
import { CategoryListComponent } from './category-list/category-list.component';
import { InterviewPrepListComponent } from './interview-prep-list/interview-prep-list.component';
import { PositionListComponent } from './position-list/position-list.component';
import { OpenAIService } from './services/openai.service';
import { SuggestedAnswersComponent } from './suggested-answers/suggested-answers.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CategoryListComponent,
    PositionListComponent,
    InterviewPrepListComponent,
    SuggestedAnswersComponent,
  ],
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

  // Loading states
  loadingCategories = false;
  loadingPositions = false;
  loadingInterviewPrep = false;
  loadingSuggestedAnswers = false;

  ngOnInit() {
    this.loadingCategories = true;
    this.openAIService.getProfessionCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Failed to fetch categories', err),
      complete: () => (this.loadingCategories = false),
    });
  }

  onCategoryClick(category: string) {
    this.selectedCategory = category;
    this.positions = [];
    this.selectedPosition = null;
    this.interviewPrep = [];
    this.loadingPositions = true;
    this.openAIService.getPositionsByCategory(category).subscribe({
      next: (data) => (this.positions = data),
      error: (err) => console.error('Failed to fetch positions', err),
      complete: () => (this.loadingPositions = false),
    });
  }

  onPositionClick(position: string) {
    this.selectedPosition = position;
    this.interviewPrep = [];
    this.suggestedAnswers = [];
    this.selectedQuestion = null;
    this.loadingInterviewPrep = true;
    this.openAIService.getInterviewPrepByPosition(position).subscribe({
      next: (data) => {
        this.interviewPrep = data;
      },
      error: (err) =>
        console.error('Failed to fetch interview preparation', err),
      complete: () => (this.loadingInterviewPrep = false),
    });
  }

  onQuestionClick(question: string) {
    this.selectedQuestion = question;
    this.suggestedAnswers = [];
    this.loadingSuggestedAnswers = true;
    this.openAIService.getSuggestedAnswersByPosition(question).subscribe({
      next: (data: any) => {
        this.suggestedAnswers = data.map((item: any) =>
          item.answer ? item.answer : item
        );
      },
      error: (err) => console.error('Failed to fetch suggested answers', err),
      complete: () => (this.loadingSuggestedAnswers = false),
    });
  }
}
