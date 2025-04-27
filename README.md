# Sign Language Recognition System

This project is a Sign Language Recognition System that utilizes a FastAPI backend for processing images and a React frontend for user interaction. The system predicts sign language gestures from images using machine learning models.

## Project Overview

The project consists of two main components:
- **Backend**: A FastAPI application that handles image uploads and predicts sign language gestures.
- **Frontend**: A React application that provides a user interface for uploading images and displaying predictions.

## Backend Details

The backend is built using FastAPI and includes the following features:

### Predict Endpoint

- **Endpoint**: `/predict`
- **Method**: POST
- **Description**: Accepts an image file and returns the predicted sign language gesture along with the confidence score.
- **Request**: 
  - File: An image file containing a hand gesture.
- **Response**: 
  - JSON object containing the predicted sign and confidence score.

### Running the Backend

1. Install the required dependencies:
   ```bash
   pip install fastapi uvicorn opencv-python mediapipe joblib
   ```
2. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

## Frontend Details

The frontend is built using React and Vite. It provides a user-friendly interface for interacting with the backend.

### Running the Frontend

1. Install the required dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

**Note:** If you want to run this project locally, update the following line in `Frontend/src/learning.jsx`:

```js
try {
  const response = await axios.post("https://dusty-noel-negihimanshu015-8d53b982.koyeb.app/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
```

to point to your local server, for example:

```js
try {
  const response = await axios.post("http://localhost:8000/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
```

## Installation Instructions

To set up the project, clone the repository and install the dependencies for both the backend and frontend.

```bash
git clone <repository-url>
cd Backend
pip install -r requirements.txt
cd ../Frontend
npm install
```

## Usage Instructions

1. Start the backend server.
2. Start the frontend development server.
3. Open the frontend application in your browser and upload an image to get predictions.

## License

This project is licensed under the MIT License.
