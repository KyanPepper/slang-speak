# SlangSpeak: Slang with Ease
Programer: Kyan Kotschevar-Smead
## About

SlangSpeak is a language learning platform, similar to Duolingo, but focused on teaching slang words.

The platform combines **React** for the frontend and **Django** for the backend to provide an immersive and enjoyable learning experience. Users can test their knowledge of modern slang through interactive quizzes.

## Key Features

- **User Authentication and Accounts:**  
Users are able to sign in or sign up through SlangSpeak. SlangSpeak implements key features like sessions, password hashing and salting, authentication and refresh tokens, as well as dynamic one-to-one relationships with other data models and attributes.

- **Practice Quizzes:**  
Practice your slang skills in practice mode. Practice Mode fetches slang words from the same API endpoint as the Real Exam without affecting your profile's score. See your calculated score and adjust accordingly.

- **Exam Mode:** 
Exam Mode allows users to take Slang Exams and test their knowledge against common terms in the database. After taking your exam, see your score before it gets posted and stored in your profile.

- **Profile:** 
Log out after a productive session or see your progress reflected in your score data.

## Tech Stack

- **Frontend:** SlangSpeak's frontend is developed using **React**. To ensure a visually appealing design, the project utilizes Material-UI (MUI) components for the majority of the UI.

- **Backend:** Powered by **Django**, the backend handles user data, authentication, exam scores, tokens, slang words, and definitions.

- **Database:** The platform employs **SQLite** as the database for development. It provides a robust and efficient storage solution that ensures data integrity and convenient use during development.

## How to Run
**Django**
Navigate to the SlangSpeak directory.
Install the required Python dependencies using pip install -r requirements.txt.
Apply migrations to set up the database with python manage.py migrate.
Start the Django development server using python manage.py runserver
Create a Superuser, go to django admin panel and add atleast 30 DictionaryWords 

**React**
Navigate to the frontend directory.
Install Node.js dependencies using npm install.
Install Node-Modules.