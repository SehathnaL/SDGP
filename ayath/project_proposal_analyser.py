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
def get_technologies_tools_from_text(text):
    """Use OpenAI to extract the technologies and tools explicitly mentioned in the proposal."""
    prompt = (
        "Extract the technologies and tools used in the project from the following project proposal text. "
        "Ensure they are taken from a relevant section such as 'Technologies Used', 'Tools & Technologies', or similar. "
        "If multiple technologies and tools are mentioned, return them as a comma-separated list. "
        "If no technologies or tools are explicitly mentioned, return exactly: 'No technologies or tools are mentioned in this proposal.'\n\n"
        f"Project Proposal Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5-turbo
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    technologies_tools = response.choices[0].message.content.strip()

    # Handle cases where no technologies or tools are found
    if not technologies_tools or technologies_tools.lower() == "no technologies or tools are mentioned in this proposal.":
        return "No technologies or tools are mentioned in this proposal."

    return technologies_tools


def get_target_audience_from_text(text):
    """Use OpenAI to extract the target audience explicitly mentioned in the proposal."""
    prompt = (
        "Extract the target audience from the following project proposal text. "
        "Ensure it is taken from a relevant section such as 'Target Audience', 'Intended Users', or a similar heading. "
        "If multiple audiences are mentioned, return them as a comma-separated list. "
        "If no target audience is explicitly mentioned, return exactly: 'No target audience is mentioned in this proposal.'\n\n"
        f"Project Proposal Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5-turbo
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    target_audience = response.choices[0].message.content.strip()

    # Handle cases where no target audience is found
    if not target_audience or target_audience.lower() == "no target audience is mentioned in this proposal.":
        return "No target audience is mentioned in this proposal."

    return target_audience

def get_proposed_solution_summary_from_text(text):
    """Use OpenAI to extract the proposed solution summary explicitly mentioned in the proposal."""
    prompt = (
        "Extract the proposed solution summary from the following project proposal text. "
        "Ensure it is taken from a relevant section such as 'Proposed Solution', 'Solution Overview', or similar. "
        "If a clear proposed solution summary is found, return only the summary without any extra text. "
        "If no proposed solution is explicitly mentioned, return exactly: 'No proposed solution is mentioned in this proposal.'\n\n"
        f"Project Proposal Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5-turbo
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    proposed_solution_summary = response.choices[0].message.content.strip()

    # Handle cases where no proposed solution is found
    if not proposed_solution_summary or proposed_solution_summary.lower() == "no proposed solution is mentioned in this proposal.":
        return "No proposed solution is mentioned in this proposal."

    return proposed_solution_summary

def get_project_objective_from_text(text):
    """Use OpenAI to extract the project objective explicitly mentioned in the proposal."""
    prompt = (
        "Extract the project objective from the following project proposal text. "
        "Ensure it is taken from a relevant section such as 'Project Objective', 'Objective', or an introductory statement. "
        "If a clear project objective is found, return only the objective without any extra text. "
        "If no project objective is explicitly mentioned, return exactly: 'No project objective is mentioned in this proposal.'\n\n"
        f"Project Proposal Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5-turbo
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    project_objective = response.choices[0].message.content.strip()

    # Handle cases where no project objective is found
    if not project_objective or project_objective.lower() == "no project objective is mentioned in this proposal.":
        return "No project objective is mentioned in this proposal."

    return project_objective



@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Save the uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_path)

    title = get_project_title_from_text(extracted_text)
    technologies_tools = get_technologies_tools_from_text(extracted_text)
    target_audience = get_target_audience_from_text(extracted_text)
    project_proposal_solution = get_proposed_solution_summary_from_text(extracted_text)
    project_object = get_project_objective_from_text(extracted_text)


    print("01. Extracted Name:", title)
    print("02. Project objective:",project_object)
    print("03.  project_proposal_solution:",project_proposal_solution)
    print("04.  technologies_tools:", technologies_tools)
    print("05. Target Audience:", target_audience)

    proposal_data= {
        "name":title,
        "skills":project_object,
        "projects":project_proposal_solution,
        "Soft skills":target_audience,
    }







