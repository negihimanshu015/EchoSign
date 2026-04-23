import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import mediapipe as mp
import joblib

# Constants
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "sign_language_svm.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")

# Initialize Limiter
limiter = Limiter(key_func=get_remote_address)

# Initialize MediaPipe Hands globally for reuse
mp_hands = mp.solutions.hands
hands_model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load models and initialize MediaPipe
    global hands_model, svm_model, scaler
    try:
        svm_model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        hands_model = mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=1, 
            min_detection_confidence=0.5
        )
        print("Models and MediaPipe initialized successfully")
    except Exception as e:
        print(f"Error during startup: {e}")
        raise e
        
    yield
    
    # Shutdown: Clean up resources
    if hands_model:
        hands_model.close()
        print("MediaPipe resources closed")

app = FastAPI(lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
@limiter.limit("5/second")
async def predict_sign(request: Request, file: UploadFile = File(...)):
    if hands_model is None:
        raise HTTPException(status_code=503, detail="Models not initialized")
        
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
        results = hands_model.process(rgb_frame)
        
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
        probs = svm_model.predict_proba(landmarks)[0]
        confidence = float(probs.max())
        
        return {
            "sign": str(prediction),
            "confidence": confidence
        }
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
