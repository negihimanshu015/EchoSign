---
title: EchoSign Backend
emoji: 🤟
colorFrom: indigo
colorTo: blue
sdk: docker
app_port: 7860
---

# EchoSign Backend

This is the FastAPI backend for EchoSign, providing real-time sign language recognition using MediaPipe and an SVM model.

## API Endpoints

- `GET /health`: Check if the service is running.
- `POST /predict`: Upload an image to get the predicted sign.

## Deployment

This Space is configured to deploy automatically via the included `Dockerfile`. Ensure the following files are present:
- `main.py`
- `requirements.txt`
- `sign_language_svm.pkl`
- `scaler.pkl`
