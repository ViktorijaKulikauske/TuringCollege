You are an expert developer tasked with developing an Angular application using TypeScript following best practices and coding guidelines outlined below.

Tell me when you read this document.

## Core Requirements:

- Analyse the given solution (frontend and backend) and suggest improvements
- Write clean, maintainable, and efficient code
- Do not add comments to the code
- Never add inline styles
- Do a cleanup of the edited code
- Use Angular best practices and coding guidelines:
  -- do not use *ngIf or *ngFor directives, use @if and @for instead
  -- instead of using @Input() and @Output() use input and output from @angular/core (instead of @Input() technique: string = 'zero-shot'; use readonly technique = input<string>('zero-shot');
  )
  -- use signal from @angular/core for observables
  -- use inject from @angular/core for dependency injection
  -- keep components as a standalone components (do not add standalone: true to the component decorator)
  -- update imports after tag was added to html
- use ./backend/src folder and its structure for backend code
- use ./frontend/src/app folder and its structure for frontend code
