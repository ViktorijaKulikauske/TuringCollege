import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAIService } from '../../services/openai.service';
import { CategoryListComponent } from '../category-list/category-list.component';
import { InterviewPrepListComponent } from '../interview-prep-list/interview-prep-list.component';
import { PositionListComponent } from '../position-list/position-list.component';
import { SuggestedAnswersComponent } from '../suggested-answers/suggested-answers.component';

export type PromptTechnique =
  | 'zero-shot'
  | 'few-shot'
  | 'chain-of-thought'
  | 'role-play'
  | 'self-critique'
  | 'socratic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    CategoryListComponent,
    PositionListComponent,
    InterviewPrepListComponent,
    SuggestedAnswersComponent,
    FormsModule,
  ],
})
export class HomeComponent {
  protected readonly openAIService = inject(OpenAIService);

  categories: string[] = [];
  positions: string[] = [];
  selectedCategory: string | null = null;
  selectedPosition: string | null = null;
  interviewPrep: string[] = [];
  suggestedAnswers: string[] = [];
  selectedQuestion: string | null = null;

  loadingCategories = false;
  loadingPositions = false;
  loadingInterviewPrep = false;
  loadingSuggestedAnswers = false;

  promptTechniques: { label: string; value: PromptTechnique }[] = [
    { label: 'Zero-shot', value: 'zero-shot' },
    { label: 'Few-shot', value: 'few-shot' },
    { label: 'Chain-of-Thought', value: 'chain-of-thought' },
    { label: 'Role-play', value: 'role-play' },
    { label: 'Self-critique', value: 'self-critique' },
    { label: 'Socratic', value: 'socratic' },
  ];
  selectedTechnique: PromptTechnique = 'zero-shot';
  temperature: number = 0;

  ngOnInit() {
    this.loadingCategories = true;
    this.openAIService.getProfessionCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Failed to fetch categories', err),
      complete: () => (this.loadingCategories = false),
    });
  }

  onTechniqueChange(tech: PromptTechnique) {
    this.selectedTechnique = tech;
  }

  onTemperatureChange(temp: number) {
    this.temperature = temp;
  }

  onCategoryClick(category: string) {
    this.selectedCategory = category;
    this.positions = [];
    this.selectedPosition = null;
    this.interviewPrep = [];
    this.suggestedAnswers = [];
    this.selectedQuestion = null;
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
    this.openAIService
      .getInterviewPrepByPosition(
        position,
        this.selectedTechnique,
        this.temperature
      )
      .subscribe({
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
    this.openAIService
      .getSuggestedAnswersByPosition(
        question,
        this.selectedTechnique,
        this.temperature
      )
      .subscribe({
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
