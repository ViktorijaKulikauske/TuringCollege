# Interview Preparation App Backend

This is the backend API for the Interview Preparation App. It is built with Node.js, Express, and integrates with OpenAI to generate interview content.

## Features

- REST API for profession categories, positions, interview questions, and suggested answers.
- Uses OpenAI to generate realistic interview content.
- Designed for use with the Angular frontend in this repository.

## Project Structure

- `src/controllers/`: API controllers.
- `src/routes/`: Express route definitions.
- `src/services/`: OpenAI integration and business logic.
- `src/app.ts`: Main entry point.

## Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Environment

Create a `.env` file in `backend/` with your OpenAI API key:

```
OPENAI_API_KEY=sk-...
```

### Running

```bash
npm start
```

The server runs on [http://localhost:3000](http://localhost:3000) by default.

## API Endpoints

- `GET /api/openai/categories`
- `GET /api/openai/positions?category=...`
- `GET /api/openai/interview-prep?position=...`
- `GET /api/openai/suggested-answers?position=...` (question text as `position` param)

## Contributing

Contributions are welcome! Please fork and submit a pull request.

## License

MIT License
