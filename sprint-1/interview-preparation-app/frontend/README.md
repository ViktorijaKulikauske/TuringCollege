# Interview Preparation App Frontend

This is the Angular 17+ frontend for the Interview Preparation App. It uses standalone components, the new Angular control flow (`@if`, `@for`), and Tailwind CSS for styling.

## Features

- Browse profession categories and positions.
- View top interview questions/exercises for each position.
- Click a question to get AI-generated suggested answers.
- Modern, modular UI with standalone components.

## Development

### Prerequisites

- Node.js (v18+ recommended)
- npm
- Angular CLI (`npm install -g @angular/cli`)

### Setup

```bash
npm install
```

### Running the App

```bash
ng serve
```

Visit [http://localhost:4200](http://localhost:4200) in your browser.

### Code Structure

- `src/app/` contains:
  - `category-list/`, `position-list/`, `interview-prep-list/`, `suggested-answers/`: Standalone UI components.
  - `services/`: API service for backend communication.
  - `app.component.*`: Main shell and logic.

### Styling

- Uses Tailwind CSS (see `styles.css` and `tailwind.config.js`).

## Testing

```bash
ng test
```

## Building

```bash
ng build
```

## More Info

See the main [README.md](../README.md) for full-stack instructions.
