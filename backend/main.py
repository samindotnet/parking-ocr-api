import io
import re
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import easyocr

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

reader = easyocr.Reader(['en'], gpu=False)

@app.post("/read-plate/")
async def read_plate(file: UploadFile = File(...)):
    contents = await file.read()

    image = Image.open(io.BytesIO(contents)).convert("RGB")
    img_np = np.array(image)

    results = reader.readtext(img_np)

    common_plate_words = {
        "NEW", "YORK", "JERSEY", "CALIFORNIA", "TEXAS", "FLORIDA",
        "CONNECTICUT", "PENNSYLVANIA", "GARDEN", "EMPIRE", "SUNSHINE",
        "GOLDEN", "STATE", "USA", "AMERICA"
    }

    plate_parts = []

    for r in results:
        text = r[1].upper()
        cleaned = re.sub(r'[^A-Z0-9]', '', text)

        if not cleaned:
            continue

        if cleaned in common_plate_words:
            continue

        if len(cleaned) > 8:
            continue

        plate_parts.append(cleaned)

    combined_plate = "".join(plate_parts)

    possible_plates = []
    if 5 <= len(combined_plate) <= 8:
        possible_plates.append(combined_plate)

    best_plate = possible_plates[0] if possible_plates else combined_plate

    confidence = 0
    if results:
        confidence = sum([r[2] for r in results]) / len(results)

    return {
        "all_text": [r[1] for r in results],
        "plate_parts": plate_parts,
        "possible_plates": possible_plates,
        "best_plate": best_plate,
        "confidence": confidence
    }