FROM python:3.9
RUN pip install mediapipe fastapi uvicorn
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port=8000"]
