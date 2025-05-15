# Interview Preparation App

This project is a full-stack Interview Preparation application powered by OpenAI. It helps users prepare for job interviews by exploring profession categories, positions, and practicing with AI-generated interview questions and suggested answers.

## Project Structure

- **frontend/**: Angular 17+ SPA using standalone components and Tailwind CSS.
- **backend/**: Node.js (Express) API that interacts with OpenAI.

## Features

- Browse main profession categories and positions.
- Get top interview questions/exercises for a selected position.
- Click any question to receive AI-generated suggested answers.
- Modern Angular architecture with standalone components and new control flow (`@if`, `@for`).

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd interview-preparation-app
   ```

2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend:

   ```bash
   cd frontend
   ng serve
   ```

3. Open [http://localhost:4200](http://localhost:4200) in your browser.

## Usage

- Select a profession category, then a position.
- Click a question to view suggested answers.
- Use the app to prepare for interviews with realistic, AI-generated content.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License
