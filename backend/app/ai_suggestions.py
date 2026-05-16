import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY", "").strip()
client = None

if api_key and not api_key.startswith("your_"):
    try:
        client = OpenAI(api_key=api_key)
    except Exception as exc:
        print(f"Failed to initialize OpenAI client: {exc}")


def generate_suggestions(missing, score):
    if client:
        prompt = f"""
Analyze the resume against the job description.
ATS score: {score}%.
Missing keywords: {', '.join(missing)}.
Return only JSON in this format:
{{"strengths": ["string"], "weaknesses": ["string"], "suggestions": ["string"]}}
Keep each list to 3-4 items max.
"""

        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
            )
            return json.loads(response.choices[0].message.content)
        except Exception as exc:
            print(f"OpenAI API Error: {exc}")

    strengths = ["Resume text successfully parsed and formatted."]
    if score > 70:
        strengths.append("Strong keyword alignment with the job description.")

    weaknesses = []
    suggestions = []

    if len(missing) > 5:
        weaknesses.append("Significant missing technical keywords from the job description.")
        suggestions.append(f"Consider adding experience related to: {', '.join(missing[:3])}.")

    if score < 50:
        suggestions.append("Tailor your resume closer to the specific wording used in the JD.")

    if not weaknesses:
        weaknesses.append("No critical weaknesses found based on keyword matching.")

    return {
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions if suggestions else ["Review formatting to ensure ATS readability."]
    }
