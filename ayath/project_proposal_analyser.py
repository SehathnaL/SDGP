from dotenv import load_dotenv
import os
from fastapi import FastAPI, File, UploadFile
import pdfplumber

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()



def extract_text_from_pdf(pdf_path):
    """Extract text from the PDF file using a different approach."""
    text = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:  # Check if text was extracted
                text.append(page_text)
    return "\n".join(text)


