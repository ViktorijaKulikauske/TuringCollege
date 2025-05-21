import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAIService } from '../../services/openai.service';

@Component({
  selector: 'app-interview-simulator',
  imports: [FormsModule, NgClass],
  templateUrl: './interview-simulator.component.html',
})
export class InterviewSimulatorComponent {
  @Input() position: string | null = '';
  @Input() technique: string = 'zero-shot';
  @Input() temperature: number = 0;
  @Output() exit = new EventEmitter<void>();

  interviewHistory: { role: string; content: string }[] = [];
  interviewPersona: string = 'neutral';
  interviewSimulatorLoading = false;
  interviewSimulatorReply: string = '';

  constructor(private openAIService: OpenAIService) {}

  ngOnInit() {
    this.interviewHistory = [];
    this.getNextInterviewMessage();
  }

  sendInterviewReply() {
    if (!this.interviewSimulatorReply.trim()) return;
    this.interviewHistory.push({
      role: 'user',
      content: this.interviewSimulatorReply,
    });
    this.interviewSimulatorReply = '';
    this.getNextInterviewMessage();
  }

  getNextInterviewMessage() {
    this.interviewSimulatorLoading = true;
    this.openAIService
      .interviewSimulator(
        this.interviewHistory,
        this.interviewPersona,
        this.position ?? '',
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
          this.interviewHistory.push({
            role: 'assistant',
            content,
          });
        },
        error: () => {
          this.interviewHistory.push({
            role: 'assistant',
            content: 'Error: Could not get response.',
          });
        },
        complete: () => (this.interviewSimulatorLoading = false),
      });
  }
}
