# EchoSign

## Description
EchoSign is an interactive sign language learning platform that provides real-time, computer-vision-based feedback. The application features a clean user interface built with React and Tailwind CSS. Under the hood, a FastAPI backend processes webcam streams using MediaPipe for precise hand landmark detection, and utilizes a trained Support Vector Machine  model to accurately classify sign language gestures.

## Motivation
Learning sign language can be challenging without immediate, accurate feedback. Traditional learning materials like books or videos can't tell you if you are forming the signs correctly. This project aims to bridge this gap by offering an accessible, browser-based practice environment. By providing real-time corrections and an intuitive, secure interface, EchoSign helps users practice confidently without needing specialized hardware.

## Quick Start

### Prerequisites
- **Node.js** (v18 or newer)
- **Python** (3.9 or newer)
- A working webcam

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/negihimanshu015/EchoSign.git
cd EchoSign
```

**2. Backend Setup:**
```bash
cd Backend
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload
```
The backend API will run at `http://localhost:8000`.

**3. Frontend Setup:**
Open a new terminal window/tab:
```bash
cd Frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage
1. Open your web browser and navigate to `http://localhost:5173` (or the local URL provided by Vite).
2. Allow the application to access your webcam when prompted. (Camera access is strictly local and secure).
3. Form the sign with your hand in front of the camera.
4. The application will instantly read your hand landmarks and display real-time prediction feedback!

## Contributing
Contributions are what make the open source community. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureName`)
3. Commit your Changes (`git commit -m 'Add some FeatureName'`)
4. Push to the Branch (`git push origin feature/FeatureName`)
5. Open a Pull Request
