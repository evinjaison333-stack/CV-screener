# AI Resume Analyzer

A production-ready SaaS application that analyzes PDF resumes against Job Descriptions to provide ATS match scores, keyword tracking, and AI-generated improvement suggestions.

## 🚀 Features
* **PDF Parsing**: Extracts text directly from uploaded PDFs.
* **ATS Scoring**: Calculates match percentage based on dynamic keyword extraction.
* **AI Analysis (Optional)**: Connects to OpenAI for intelligent strengths, weaknesses, and suggestions.
* **Deterministic Fallback**: Works perfectly without an API key using rule-based NLP heuristics.
* **PDF Export**: Print or save your analysis report natively.
* **Premium UI**: Built with Tailwind CSS, featuring modern cards, gradients, and smooth animations.

## 🛠 Tech Stack
* **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide React.
* **Backend**: Python, FastAPI, Uvicorn, PDFPlumber, OpenAI SDK.

## 💻 Local Setup Instructions

### Prerequisites
* Python 3.9+
* Node.js 18+

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure Environment Variables:
   * Copy `.env.example` to `.env`.
   * (Optional) Add your `OPENAI_API_KEY`. If left blank, the app will use the deterministic fallback analyzer.

5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

*The API will be available at `http://localhost:8000`*

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

*The UI will be available at `http://localhost:5173`*

## 🚀 Deployment Instructions

### Deploying the Frontend (Vercel)

1. Push your code to GitHub.
2. Log into Vercel and import the `frontend` directory as a new project.
3. Vercel will automatically detect Vite. Leave build settings as default.
4. **Important**: You must update the Axios POST request URL in `App.jsx` to point to your live backend URL before pushing.

### Deploying the Backend (Render)

1. Log into Render and create a new "Web Service".
2. Connect your repository and select the `backend` directory as the Root Directory.
3. Use the following configuration:
   * Environment: Python
   * Build Command: `pip install -r requirements.txt`
   * Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. Add your `OPENAI_API_KEY` to the Render Environment Variables if using AI.
