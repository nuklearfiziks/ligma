# settings.py
from dotenv import load_dotenv
import os

load_dotenv()

API_URL = os.getenv("API_URL")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
USER_LIST_ID = os.getenv("USER_LIST_ID")
CORPUS_LOCATION = os.getenv("CORPUS_LOCATION")
