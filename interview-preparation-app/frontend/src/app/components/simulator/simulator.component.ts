import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAIService } from '../../services/openai.service';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './simulator.component.html',
})
export class SimulatorComponent {
  @Input() technique: string = 'zero-shot';
  @Input() temperature: number = 0;

  showSimulator = false;
  simulatorStep: 'category' | 'position' | 'chat' = 'category';
  simulatorCategory: string | null = null;
  simulatorPosition: string | null = null;
  simulatorHistory: { role: string; content: string }[] = [];
  simulatorInput: string = '';
  simulatorLoading = false;

  constructor(private openAIService: OpenAIService) {}

  openSimulator() {
    this.showSimulator = true;
    this.simulatorStep = 'category';
    this.simulatorCategory = null;
    this.simulatorPosition = null;
    this.simulatorHistory = [
      {
        role: 'assistant',
        content:
          'Welcome to the Interview Simulator! Which category are you interested in?',
      },
    ];
    this.simulatorInput = '';
  }

  closeSimulator() {
    this.showSimulator = false;
  }

  sendSimulatorMessage() {
    const input = this.simulatorInput.trim();
    if (!input) return;
    this.simulatorHistory.push({ role: 'user', content: input });
    this.simulatorInput = '';
    if (this.simulatorStep === 'category') {
      this.simulatorCategory = input;
      this.simulatorStep = 'position';
      this.simulatorHistory.push({
        role: 'assistant',
        content: 'Which position in this category?',
      });
      return;
    }
    if (this.simulatorStep === 'position') {
      this.simulatorPosition = input;
      this.simulatorStep = 'chat';
      this.simulatorHistory.push({
        role: 'assistant',
        content:
          "Great! Let's start the interview. I will ask you questions one by one.",
      });
      this.getNextSimulatorMessage();
      return;
    }
    this.getNextSimulatorMessage(input);
  }

  getNextSimulatorMessage(userAnswer?: string) {
    this.simulatorLoading = true;
    const history = [...this.simulatorHistory];
    this.openAIService
      .interviewSimulator(
        history,
        'neutral',
        this.simulatorPosition ?? '',
        this.technique,
        this.temperature
      )
      .subscribe({
        next: (data) => {
          let content = '';
          if (typeof data === 'object' && data !== null) {
            content =
              data.response ||
              data.question ||
              data.content ||
              data.interviewer ||
              '';
            if (!content) {
              for (const key of Object.keys(data)) {
                if (typeof data[key] === 'string') {
                  content = data[key];
                  break;
                }
              }
            }
            if (!content) content = JSON.stringify(data);
          } else {
            content = String(data);
          }
          this.simulatorHistory.push({ role: 'assistant', content });
        },
        error: () => {
          this.simulatorHistory.push({
            role: 'assistant',
            content: 'Error: Could not get response.',
          });
        },
        complete: () => (this.simulatorLoading = false),
      });
  }
}
