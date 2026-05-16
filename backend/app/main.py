from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .pdf_utils import extract_text_from_pdf
from .analyzer import analyze_resume
import io

app = FastAPI(title="AI Resume Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to your Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    if not job_description.strip():
        raise HTTPException(status_code=400, detail="Job description cannot be empty.")

    try:
        pdf_bytes = await file.read()
        resume_text = extract_text_from_pdf(io.BytesIO(pdf_bytes))
        
        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF.")

        analysis = analyze_resume(resume_text, job_description)
        return analysis

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
