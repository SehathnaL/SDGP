from dotenv import load_dotenv
import os
from fastapi import FastAPI, File, UploadFile
import pdfplumber
import shutil
import openai

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()

UPLOAD_DIR = "uploaded_pdfs1"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def extract_text_from_pdf(pdf_path):
    """Extract text from the PDF file."""
    with pdfplumber.open(pdf_path) as pdf:
        text = "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
    return text

def get_project_title_from_text(text):
    """Use OpenAI to extract the project title explicitly mentioned in the proposal."""
    prompt = (
        "Extract the title of the project from the following project proposal text. "
        "Ensure it is taken from a relevant section such as 'Project Title' or an introductory statement. "
        "If a clear project title is found, return only the title without any extra text. "
        "If no project title is explicitly mentioned, return exactly: 'No project title is mentioned in this proposal.'\n\n"
        f"Project Proposal Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5-turbo
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    project_title = response.choices[0].message.content.strip()

    # Handle cases where no project title is found
    if not project_title or project_title.lower() == "no project title is mentioned in this proposal.":
        return "No project title is mentioned in this proposal."

    return project_title


@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Save the uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_path)
    title = get_project_title_from_text(extracted_text)
    




