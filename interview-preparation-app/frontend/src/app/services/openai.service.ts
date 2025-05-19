import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private readonly apiUrl = 'http://localhost:3000/api/openai';
  private readonly http = inject(HttpClient);

  getProfessionCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getPositionsByCategory(category: string) {
    return this.http.get<string[]>(
      `${this.apiUrl}/positions?category=${encodeURIComponent(category)}`
    );
  }

  getInterviewPrepByPosition(
    position: string,
    technique: string = 'zero-shot',
    temperature: number = 0
  ) {
    return this.http.get<string[]>(
      `${this.apiUrl}/interview-prep?position=${encodeURIComponent(
        position
      )}&technique=${encodeURIComponent(technique)}&temperature=${temperature}`
    );
  }

  getSuggestedAnswersByPosition(
    question: string,
    technique: string = 'zero-shot',
    temperature: number = 0
  ) {
    return this.http.get<string[]>(
      `${this.apiUrl}/suggested-answers?position=${encodeURIComponent(
        question
      )}&technique=${encodeURIComponent(technique)}&temperature=${temperature}`
    );
  }

  interviewSimulator(
    history: { role: string; content: string }[],
    persona: string,
    position: string,
    technique: string,
    temperature: number
  ) {
    return this.http.post<any>(`${this.apiUrl}/interview-simulator`, {
      history,
      persona,
      position,
      technique,
      temperature,
    });
  }
}
