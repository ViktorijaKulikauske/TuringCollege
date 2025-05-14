import { Component } from '@angular/core';
import { OpenAIService } from './services/openai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  categories: string[] = [];

  constructor(private openAIService: OpenAIService) {}

  ngOnInit() {
    this.openAIService.getProfessionCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Failed to fetch categories', err),
    });
  }
}
