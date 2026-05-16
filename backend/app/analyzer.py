import re
from collections import Counter
from .ai_suggestions import generate_suggestions

STOP_WORDS = set([
    "the", "and", "a", "to", "of", "in", "for", "with", "on", "as", "is", "at", 
    "which", "by", "an", "this", "or", "from", "that", "it", "are", "be", "we", "you"
])

def extract_keywords(text: str) -> set:
    words = re.findall(r'\b[A-Za-z0-9+#.-]+\b', text.lower())
    filtered = [w for w in words if w not in STOP_WORDS and len(w) > 2]
    # Simple heuristic: treat top 30 frequent words as keywords for JD
    counts = Counter(filtered)
    return set([word for word, count in counts.most_common(30)])

def analyze_resume(resume_text: str, jd_text: str) -> dict:
    jd_keywords = extract_keywords(jd_text)
    resume_words = set(re.findall(r'\b[A-Za-z0-9+#.-]+\b', resume_text.lower()))

    matched = list(jd_keywords.intersection(resume_words))
    missing = list(jd_keywords.difference(resume_words))
    
    total = len(jd_keywords)
    score = int((len(matched) / total) * 100) if total > 0 else 0

    ai_data = generate_suggestions(missing, score)

    return {
        "score": score,
        "matched_keywords": matched,
        "missing_keywords": missing,
        "strengths": ai_data.get("strengths", []),
        "weaknesses": ai_data.get("weaknesses", []),
        "suggestions": ai_data.get("suggestions", [])
    }
