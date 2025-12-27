from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
from typing import List, Dict, Any

MODEL_PATH = os.path.join(os.path.dirname(__file__), "intent_classifier.pkl")
CLASSES_PATH = os.path.join(os.path.dirname(__file__), "classes.json")

app = FastAPI(title="Portfolio Intent Classifier", version="1.0.0")

# CORS: allow local Next.js dev and any origin by default
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model at startup
model = None
classes: List[str] = []

class PredictRequest(BaseModel):
    text: str

class PredictResponse(BaseModel):
    intent: str
    confidence: float
    probabilities: Dict[str, float]

@app.on_event("startup")
def load_model() -> None:
    global model, classes
    if not os.path.exists(MODEL_PATH):
        raise RuntimeError(f"Model file not found at {MODEL_PATH}. Train the model first.")
    model = joblib.load(MODEL_PATH)
    # MultinomialNB classes are in model.classes_ (pipeline). Use that.
    classes = list(model.classes_) if hasattr(model, "classes_") else []

@app.get("/health")
def health() -> Dict[str, Any]:
    return {"status": "ok", "model_loaded": model is not None, "classes": classes}

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest) -> PredictResponse:
    if model is None:
        raise RuntimeError("Model not loaded")

    # Predict intent
    pred = model.predict([req.text])[0]
    # Predict probabilities
    proba_arr = model.predict_proba([req.text])[0]
    # Map class -> probability
    proba_map = {cls: float(proba_arr[i]) for i, cls in enumerate(classes)}
    confidence = proba_map.get(pred, max(proba_map.values()) if proba_map else 0.0)

    return PredictResponse(intent=pred, confidence=confidence, probabilities=proba_map)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
