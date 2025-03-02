from fastapi import FastAPI, File, UploadFile
import os
import shutil
import pdfplumber
import openai
from dotenv import load_dotenv


load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
app = FastAPI()

UPLOAD_DIR="uploaded_pdfs"
os.makedirs(UPLOAD_DIR, exist_ok=True)



def get_name_from_text(text):
    """Use OpenAI to extract the name only if explicitly mentioned in the CV."""
    prompt = (
        "Extract the full name from the following CV text, ensuring it is taken from a relevant section such as 'Name' or 'Personal Information'. "
        "If there is no name explicitly mentioned, return exactly: 'No name is mentioned in this CV.'\n\n"
        f"CV Text:\n{text}"
    )


    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5 model
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    name = response.choices[0].message.content.strip()

    # Handle cases where no name is found
    if not name or name.lower() == "no name is mentioned in this cv.":
        return "No name is mentioned in this CV."
    print("hi")

    return name



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
    name = get_name_from_text(extracted_text)
    print(name)
