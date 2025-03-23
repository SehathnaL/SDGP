from fastapi import FastAPI, File, UploadFile
import os
import shutil
import pdfplumber
import openai
from dotenv import load_dotenv
import json


load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
app = FastAPI()

UPLOAD_DIR="uploaded_pdfs"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def get_name_from_text(text):
    """Use OpenAI to extract the name only if explicitly mentioned in the CV."""
    prompt = (
        "Extract the full name from the following CV text, ensuring it is taken from a relevant section such as 'Name' or 'Personal Information'. "
        "If a full name is found, return only the name without any extra text. "
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
    return name

def get_technical_skills_from_text(text):
    """Use OpenAI to extract technical skills only from the 'Technical Skills' section in the given text."""
    prompt = (
        "Extract only the technical skills listed under the 'Technical Skills' section "
        f"CV Text:\n{text}"
    )


    client = openai.OpenAI(api_key=OPENAI_API_KEY)


    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    technical_skills = response.choices[0].message.content.strip()

    # Handle cases where no skills are found
    if not technical_skills or technical_skills.lower() == "no technical skills are mentioned in this cv.":
        return "No technical skills are mentioned in this CV."

    return technical_skills

def get_soft_skills_from_text(text):
    """Use OpenAI to extract soft skills from the CV."""
    prompt = (
        "Extract only the soft skills listed in the following CV text. "
        "If soft skills are explicitly mentioned under a section like 'Soft Skills' or similar, return them as a comma-separated list. "
        "If no soft skills section exists, analyze the text and infer common soft skills based on the content. "
        "If no soft skills can be identified, return exactly: 'No soft skills are mentioned in this CV.'\n\n"
        f"CV Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5 model
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    soft_skills = response.choices[0].message.content.strip()

    # Handle cases where no soft skills are found
    if not soft_skills or soft_skills.lower() == "no soft skills are mentioned in this cv.":
        return "No soft skills are mentioned in this CV."

    return soft_skills


def get_projects_from_text(text):
    """Use OpenAI to extract projects only from the 'Projects' section in the given text."""
    prompt = (
        "Extract only the projects listed under the 'Projects' section in the following CV text. "
        "If the section exists, return a list of projects, formatted as a brief title followed by a short description. "
        "If there is no 'Projects' section, return exactly: 'No projects are mentioned in this CV.'\n\n"
        f"CV Text:\n{text}"
    )


    client = openai.OpenAI(api_key=OPENAI_API_KEY)


    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    projects = response.choices[0].message.content.strip()

    # Handle cases where no projects are found
    if not projects or projects.lower() == "no projects are mentioned in this cv.":
        return "No projects are mentioned in this CV."

    return projects


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
    soft_skills = get_soft_skills_from_text(extracted_text)
    Technical_skills= get_technical_skills_from_text(extracted_text)
    projects=get_projects_from_text(extracted_text)

    print(" Extracted Name:", name)
    print(" Extracted Soft Skills:", soft_skills)
    print(" Extracted Technical Skills:",Technical_skills)
    print("Extracted  projects:",projects)

    data = {
        "name": name,
        "skills": Technical_skills,
        "projects": projects,
        "Soft skills": soft_skills,
    }
    file_name = "CVdictionary.json"

    with open(file_name, 'w') as json_file:
        json.dump(data, json_file, indent=4)

    print("Data successfully written to", file_name)

