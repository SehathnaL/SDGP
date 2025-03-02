from fastapi import FastAPI, File, UploadFile
import os
import shutil

app = FastAPI()

UPLOAD_DIR="uploaded_pdfs"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)