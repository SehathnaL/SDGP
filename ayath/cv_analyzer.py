from fastapi import FastAPI, File, UploadFile
import os
import shutil
import pdfplumber

app = FastAPI()

UPLOAD_DIR="uploaded_pdfs"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text=text = "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
    return text


@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text=extract_text_from_pdf(file_path)
    print(extracted_text)