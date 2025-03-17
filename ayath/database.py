import psycopg2
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Database connection settings
DATABASE_URL = "postgresql://postgres:1234@localhost:5432/Ananda"

# Connect to the PostgreSQL database using SQLAlchemy
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()



# Define the structure of your data
cv_data = {
    "name":"Ayath",
    "technical_skills": "Python, SQL, JavaScript",
    "soft_skills": "Communication,Teamwork ,Problem-solving",
    "projects": "Project 1, Project 2, Project 3"
}

# Insert the data into the database
def insert_data(cv_data):
    try:
        # Creating an insert query with text() to explicitly mark it as a raw SQL expression
        query = text("""
        INSERT INTO cv_data (name, technical_skills, soft_skills, projects)
        VALUES (:name, :technical_skills, :soft_skills, :projects)
        """)

        # Execute the query with the extracted data
        session.execute(query, {
            "name": cv_data["name"],
            "technical_skills": cv_data["technical_skills"],
            "soft_skills": cv_data["soft_skills"],
            "projects": cv_data["projects"]
        })
        session.commit()
        print("Data inserted successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")
        session.rollback()

# Call the function to insert the data
insert_data(cv_data)
