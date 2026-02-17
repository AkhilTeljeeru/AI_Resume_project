🧠 AI Resume Screening System

An end-to-end AI-powered Resume Screening Web Application that automatically parses resumes, extracts skills using NLP, matches them with job descriptions using Machine Learning, and ranks candidates in an interactive recruiter dashboard.

✨ Key Features

📄 Resume upload (PDF/DOCX)

🔍 Automatic text extraction & preprocessing

🧠 NLP-based skill detection

🤖 TF-IDF + Cosine Similarity matching

📊 AI-driven candidate ranking

🧑‍💼 Admin dashboard

🔃 Sorting & filtering system

🌐 REST API integration

🎨 Modern responsive UI with Tailwind

🏗️ Tech Stack
🔹 Frontend

React (Vite)

Tailwind CSS

JavaScript

React Hooks

Modular component architecture

🔹 Backend

Flask (Python REST API)

SQLite

Scikit-learn

SpaCy / NLTK

pdfplumber & docx2txt

📂 Project Structure
src/
│── api/            # API calls to Flask backend
│── components/     # Reusable UI components
│── hooks/          # Custom React hooks
│── lib/            # Config & helper libraries
│── pages/          # Application pages
│── utils/          # Utility functions
│
│── App.jsx         # Main app with routing
│── Layout.jsx      # Sidebar / Navbar layout
│── main.jsx        # Entry point
│── pages.config.js # Route configuration
│── index.css       # Global styles

⚙️ Root Files

index.html → Vite entry

package.json → Dependencies & scripts

vite.config.js → Vite setup

tailwind.config.js → Tailwind config

postcss.config.js → PostCSS setup

eslint.config.js → Linting

jsconfig.json → Path aliases

🧠 How It Works

1️⃣ Upload resume
2️⃣ Extract text from file
3️⃣ NLP processes & detects skills
4️⃣ Job description converted to TF-IDF vectors
5️⃣ Cosine similarity calculates match score
6️⃣ Candidates ranked automatically
7️⃣ Results shown in dashboard

📡 API Endpoints
Method	Endpoint	Description
POST	/upload_resume	Upload & analyze resume
POST	/job_description	Add job description
GET	/candidates	Get all candidates
GET	/rankings	Get ranked candidates
🗄️ Database Schema
Candidates

id

name

resume_text

skills

score

timestamp

JobDescriptions

id

title

description

🔐 Security & Validation

File type validation

Input sanitization

Secure file handling

Error handling

Logging system

🎯 Use Case

This system helps recruiters to:

Reduce manual screening time

Identify best-fit candidates instantly

Make data-driven hiring decisions

🚀 Future Enhancements

🔐 Authentication & role management

📌 Multi-job matching

🤖 BERT-based semantic similarity

📧 Email notifications

📈 Analytics dashboard

👨‍💻 Author

Akhil Teljeeru
AI & Full Stack Developer

⭐ Support

If you found this useful:

Star ⭐ the repository

Fork 🍴 it

Contribute 🤝

🏁 Outcome

An intelligent system that automates resume screening and provides accurate AI-based candidate ranking through a modern web dashboard.

Link : ai-resume-project-vydd.vercel.app
