## Portfolio

A modern portfolio built with Next.js, Tailwind CSS, and a lightweight ML chatbot. 

## Features

- Portfolio sections: Hero, Journey, Projects, Certifications, Skills, Contact
- Interactive ML chatbot with local fallback and API proxy
- API route proxy: `src/app/api/predict/route.ts`
- Responsive UI with Tailwind and animated micro‑interactions

## Tech Stack

- Frontend: Next.js (App Router), TypeScript, Tailwind CSS
- Icons/UX: lucide-react
- ML Backend: FastAPI (Python), scikit-learn (see `ml_model/`)

## Project Structure

- `src/app/page.tsx` — Page layout that assembles sections
- `src/components/` — UI components (`Hero`, `Journey`, `Projects`, `Certifications`, `Skills`, `Contact`, `MLChatBot`)
- `src/app/api/predict/route.ts` — Next.js API route proxying to FastAPI
- `ml_model/` — Training script, server, and assets for intent classification

## Quick Start (Frontend)

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the site.

## ML Chatbot: Train & Run Backend (Optional)

The site works without the backend (local heuristic fallback). To use the FastAPI model:

1) Create a virtualenv and install deps

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r ml_model/requirements.txt
```

2) (Optional) Train the intent classifier

```bash
python ml_model/train_intent_classifier.py
```

3) Start FastAPI server (serves `/predict`)

```bash
python ml_model/server.py
```

## Environment Variables

- `ML_API_URL` — Base URL of the FastAPI service (e.g. `https://your-service.onrender.com`).
  - For local development, you can skip this; the proxy defaults to `http://localhost:8000`.
  - To set it, create `.env.local` in the project root:

```
ML_API_URL=https://your-service.onrender.com
```

Notes:
- No client‑side env var is required; the chatbot calls the Next.js API route at `/api/predict`.
- When `ML_API_URL` is unset or points to localhost, the proxy will use local heuristics.

## Deployment

### Backend (FastAPI) on Render

- New Web Service from your GitHub repo
- Build: `pip install -r ml_model/requirements.txt`
- Start: `uvicorn ml_model.server:app --host 0.0.0.0 --port $PORT`
- After deploy, copy the service URL

### Frontend (Next.js) on Vercel

- Import the repo
- Add env var: `ML_API_URL=https://your-service.onrender.com`
- Deploy

## GitHub: Initialize and Push

```bash
git init
git add .
git commit -m "Init portfolio with ML chatbot + FastAPI"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Customize Content

- Journey timeline: `src/components/Journey.tsx`
- Projects/Certifications/Skills/Contact: `src/components/`
- Chatbot prompts/knowledge: `src/components/MLChatBot.tsx`

## Learn More

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- FastAPI: https://fastapi.tiangolo.com/
