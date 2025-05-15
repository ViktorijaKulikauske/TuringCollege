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

  ngOnInit() {
    this.openAIService.getProfessionCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Failed to fetch categories', err),
    });
  }

  onCategoryClick(category: string) {
    this.selectedCategory = category;
    this.positions = [];
    this.openAIService.getPositionsByCategory(category).subscribe({
      next: (data) => (this.positions = data),
      error: (err) => console.error('Failed to fetch positions', err),
    });
  }
}
