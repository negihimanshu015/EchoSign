from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import mediapipe as mp
import joblib
from typing import List

app = FastAPI()

# Load models
svm_model = joblib.load("sign_language_svm.pkl")
scaler = joblib.load("scaler.pkl")

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.5)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict_sign(file: UploadFile = File(...)):
    try:
        # Read image file
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            raise HTTPException(status_code=400, detail="Invalid image format")
        
        # Process with MediaPipe
        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)
        
        if not results.multi_hand_landmarks:
            return {"sign": "no_hand", "confidence": 0.0}
        
        # Extract landmarks for first hand detected
        landmarks = []
        for lm in results.multi_hand_landmarks[0].landmark:
            landmarks.extend([lm.x, lm.y, lm.z])
        
        landmarks = np.array(landmarks).reshape(1, -1)
        landmarks = scaler.transform(landmarks)
        
        # Make prediction
        prediction = svm_model.predict(landmarks)[0]
        confidence = svm_model.predict_proba(landmarks)[0].max()
        
        return {
            "sign": str(prediction),
            "confidence": float(confidence)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))