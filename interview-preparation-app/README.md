# Interview Preparation App

This project is an Interview Preparation application that consists of a frontend built with Angular and a backend API that interacts with OpenAI. The application is designed to help users prepare for interviews by generating questions and answers using AI.

## Project Structure

The project is divided into two main parts: `frontend` and `backend`.

### Frontend

The frontend is an Angular single-page application (SPA) located in the `frontend` directory. It includes:

- **Components**: UI components that represent different parts of the application.
- **Services**: Services for handling API calls and business logic.
- **Assets**: Static files such as images and stylesheets.
- **Environments**: Configuration files for different environments (development and production).

### Backend

The backend is built with Node.js and Express, located in the `backend` directory. It includes:

- **Controllers**: Logic for handling incoming API requests.
- **Routes**: Definitions of API endpoints.
- **Services**: Logic for interacting with the OpenAI API.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Angular CLI installed globally.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd interview-preparation-app
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend application:
   ```
   cd frontend
   ng serve
   ```

3. Open your browser and navigate to `http://localhost:4200` to access the application.

## Usage

- Use the frontend interface to interact with the OpenAI API.
- Enter prompts to generate interview questions and answers.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.