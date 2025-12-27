This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## ML Chatbot: Training & Inference

- Train the intent classifier:

```bash
python ml_model/train_intent_classifier.py
```

- Start the FastAPI inference server (serves `/predict`):

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r ml_model/requirements.txt
python ml_model/server.py
```

- Optional: set the client to use a custom URL (defaults to `http://localhost:8000`):

Create `.env.local`:

```
NEXT_PUBLIC_ML_API_URL=http://localhost:8000
```

- Run Next.js dev server:

```bash
npm install
npm run dev
```

The ML chatbot component in `src/components/MLChatBot.tsx` will call the FastAPI server for intent classification and gracefully fall back to local heuristics if the API is unavailable.

## Free Deployment (Frontend + Backend)

### Backend (FastAPI) on Render
- Push this repository to GitHub (see commands below).
- Create a new Render Web Service, select your GitHub repo.
- Use the root of the repo; set:
	- Build Command: `pip install -r ml_model/requirements.txt`
	- Start Command: `uvicorn ml_model.server:app --host 0.0.0.0 --port $PORT`
- Once deployed, copy the service URL (e.g., `https://your-service.onrender.com`).

### Frontend (Next.js) on Vercel
- Import the GitHub repo into Vercel.
- Add Environment Variable:
	- `ML_API_URL` = `https://your-service.onrender.com`
- Deploy. The client uses the Next.js API proxy at `/api/predict` which forwards to the FastAPI backend.

### Optional: Local Dev Proxy
No changes needed. The proxy route at `src/app/api/predict/route.ts` forwards to `http://localhost:8000` when `ML_API_URL` is not set.

### GitHub: Initialize and Push
```bash
git init
git add .
git commit -m "Init portfolio with ML chatbot + FastAPI"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
