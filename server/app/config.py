from dotenv import load_dotenv
import os

load_dotenv()  # Carga el archivo .env

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    secret_key = os.getenv('SECRET_KEY')