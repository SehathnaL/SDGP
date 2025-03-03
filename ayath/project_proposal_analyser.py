from dotenv import load_dotenv
import os
from fastapi import FastAPI, File, UploadFile

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()



