# Learn Math by Doomscrolling

An experimental web app that transforms studying into a familiar, addictive format: an **infinite scroll feed of math questions**. Pick your topics, then swipe through AI‑generated cards (definitions, clozes, MCQs). Gamification features like streaks, coins, progress rings, and confetti rewards make practice feel more like social media than homework.

---

## Tech Stack
- **Frontend:** Next.js 13 (React, TypeScript, TailwindCSS, Framer Motion, Lucide icons)
- **Backend:** Node.js (Express)
- **AI:** Mistral chat model (via API)

---

## Features
- Landing page → pick **5 math topics**
- Infinite scroll **feed of questions** (definitions, clozes, MCQs)
- **Gamified UX**: streak counter, coins, session summaries, confetti rewards
- **AI‑powered content**: every card is generated live from Mistral based on your chosen topics

---

## Project Structure
```
MathGram/
├── frontend/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   ├── topics/page.tsx   # Topic picker
│   │   └── feed/page.tsx     # Question feed
│   ├── components/
│   │   ├── StudyFeedApp.tsx  # Main feed component
│   │   └── LoadingScreen.tsx # Full‑screen loader
│   ├── package.json
│   └── .gitignore
└── backend/
    ├── server.js             # Express server
    ├── cards.js              # /cards endpoint (calls Mistral)
    ├── .env                  # API key + config
    ├── package.json
    └── .gitignore
```

---

## Setup Instructions

### 1. Clone and install`
After that:

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Configure environment
Create `backend/.env`:
```env
MISTRAL_API_KEY=your_mistral_key_here
PORT=4000
MISTRAL_MODEL=mistral-small-latest
```

### 3. Run backend
```bash
cd backend
node server.js
```
Server runs on [http://localhost:4000](http://localhost:4000)

### 4. Run frontend
```bash
cd frontend
npm run dev
```
Frontend runs on [http://localhost:3000](http://localhost:3000)

### 5. Try it out
1. Visit [http://localhost:3000](http://localhost:3000)
2. Pick 5 math topics
3. Scroll your personalized AI‑generated feed
