import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OpenAIService } from '../../services/openai.service';
import { CategoryListComponent } from '../category-list/category-list.component';
import { InterviewPrepListComponent } from '../interview-prep-list/interview-prep-list.component';
import { PositionListComponent } from '../position-list/position-list.component';
import { SuggestedAnswersComponent } from '../suggested-answers/suggested-answers.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let openAIServiceSpy: jasmine.SpyObj<OpenAIService>;

  beforeEach(async () => {
    openAIServiceSpy = jasmine.createSpyObj('OpenAIService', [
      'getProfessionCategories',
      'getPositionsByCategory',
      'getInterviewPrepByPosition',
      'getSuggestedAnswersByPosition',
    ]);
    openAIServiceSpy.getProfessionCategories.and.returnValue(
      of(['IT', 'Finance'])
    );
    openAIServiceSpy.getPositionsByCategory.and.returnValue(
      of(['Developer', 'Analyst'])
    );
    openAIServiceSpy.getInterviewPrepByPosition.and.returnValue(
      of(['Q1', 'Q2'])
    );
    openAIServiceSpy.getSuggestedAnswersByPosition.and.returnValue(
      of(['A1', 'A2'])
    );

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        CategoryListComponent,
        PositionListComponent,
        InterviewPrepListComponent,
        SuggestedAnswersComponent,
      ],
      providers: [{ provide: OpenAIService, useValue: openAIServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render CategoryListComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-category-list')).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should render PositionListComponent after category selection', () => {
    component.onCategoryClick('IT');
    fixture.detectChanges();
    expect(component.selectedCategory).toBe('IT');
    expect(component.positions.length).toBeGreaterThan(0);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-position-list')).toBeTruthy();
  });

  it('should render InterviewPrepListComponent after position selection', () => {
    component.onCategoryClick('IT');
    component.onPositionClick('Developer');
    fixture.detectChanges();
    expect(component.selectedPosition).toBe('Developer');
    expect(component.interviewPrep.length).toBeGreaterThan(0);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-interview-prep-list')).toBeTruthy();
  });

  it('should render SuggestedAnswersComponent after question selection', () => {
    component.onCategoryClick('IT');
    component.onPositionClick('Developer');
    component.onQuestionClick('Q1');
    fixture.detectChanges();
    expect(component.selectedQuestion).toBe('Q1');
    expect(component.suggestedAnswers.length).toBeGreaterThan(0);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-suggested-answers')).toBeTruthy();
  });
});
