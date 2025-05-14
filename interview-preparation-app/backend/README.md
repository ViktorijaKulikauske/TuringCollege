# Interview Preparation App Backend

This is the backend for the Interview Preparation application. It is built using Node.js and Express, and it interacts with the OpenAI API to provide responses based on user prompts.

## Project Structure

- **src/**: Contains the source code for the backend application.
  - **controllers/**: Contains the controller files that handle API requests.
  - **routes/**: Contains the route definitions for the API.
  - **services/**: Contains service files that interact with external APIs, such as OpenAI.
  - **app.ts**: The main entry point of the backend application.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd interview-preparation-app/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

To start the backend server, run the following command:
```
npm start
```

The server will start on the specified port (default is 3000). You can change the port in the `app.ts` file.

## API Endpoints

- **POST /api/openai/generate**: Sends a prompt to the OpenAI API and returns the generated response.

## Environment Variables

Make sure to set the necessary environment variables for the OpenAI API key and other configurations. You can create a `.env` file in the root of the backend directory and add your variables there.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.