# ML Math & Stats Fundamentals

An interactive learning portal for the mathematics and statistics that power machine learning. Built with TypeScript, Vite, and a Python backend with SQLite progress tracking.

Curriculum aligned with **Mathematics for Machine Learning** (Deisenroth, Faisal, Ong), Stanford CS229 prerequisites, and Goodfellow's Deep Learning Book Part I.

## Topics Covered (40 lessons)

| Section | Lessons | Key Topics |
|---------|---------|------------|
| **Foundations** | 4 | Algebra, functions, summation/product notation, sets & logic |
| **Complexity** | 5 | Big-O, time/space complexity, recurrences, amortized analysis |
| **Linear Algebra** | 7 | Vectors/matrices, eigenvalues, norms, orthogonality/projections, SVD, positive definite matrices |
| **Calculus** | 7 | Limits, derivatives, chain rule/backprop, gradients/Jacobians, Hessians, integration, Taylor series |
| **Probability** | 5 | Fundamentals, Bayes' theorem, distributions, expectation/variance, multivariate Gaussian |
| **Statistics** | 4 | Descriptive stats, MLE, MAP estimation, bias-variance tradeoff |
| **Optimization** | 5 | Gradient descent, Adam/advanced optimizers, regularization, constrained optimization, numerical stability |
| **Information Theory** | 3 | Entropy, cross-entropy/KL divergence, mutual information |

## Features

- **Structured lessons** with MathJax-rendered equations, intuition paragraphs, and worked examples
- **Bilingual support** (English / Vietnamese terminology)
- **Quizzes** with scoring and history
- **Bloom's Taxonomy activities** (remember, understand, apply, analyze, evaluate, create)
- **Homework problems** (166 total) with difficulty levels and AI grading
- **AI Tutor chatbox** — ask questions, brainstorm answers, get hints in context
- **LaTeX-enabled notes** with toolbar, cheat sheet, image upload, and live preview
- **AI-powered feedback** on open-ended responses
- **SQLite-backed progress tracking** with study streaks
- **Interactive visualizations** (Canvas-based)
- **Responsive dark-theme UI**

## Prerequisites

- Node.js (v18+)
- Python 3
- [Codex CLI](https://github.com/openai/codex) (optional, for AI chat & feedback)

## Getting Started

```bash
# Install dependencies
npm install

# Start the API backend
python3 server.py

# In another terminal, start the dev server
npm run dev
```

Open http://localhost:5173 (Vite will show the actual port).

The Python backend runs on port 3737. Vite proxies `/api` requests to it automatically.

## AI Features Setup

The AI Tutor chat and homework grading use the Codex CLI.

```bash
# Install Codex CLI
npm install -g @openai/codex

# Login once
codex login

# Restart server.py
python3 server.py
```

If the Codex CLI is not installed or not logged in, activities fall back to self-assessment mode.

## Build

```bash
npm run build     # TypeScript check + Vite production build
npm run preview   # Preview the production build
```

## Project Structure

```
├── server.py          # Python HTTP server + SQLite API + AI feedback/chat
├── index.html         # Main HTML shell + chat panel
├── css/style.css      # All styles (dark theme)
├── src/
│   ├── main.ts        # App entry point
│   ├── types.ts       # TypeScript interfaces
│   ├── state.ts       # App state management
│   ├── api.ts         # Backend API calls
│   ├── render.ts      # UI rendering + notes with LaTeX
│   ├── topics.ts      # Lesson content, curriculum, and homework
│   ├── bloom.ts       # Bloom's Taxonomy activities + AI feedback
│   ├── chat.ts        # AI Tutor chat panel
│   ├── homework.ts    # Homework rendering + grading
│   ├── quiz.ts        # Quiz engine
│   ├── interactive.ts # Canvas visualizations
│   └── utils.ts       # Shared utilities
├── vite.config.ts     # Vite config with API proxy
├── tsconfig.json      # TypeScript config (strict)
└── progress.db        # SQLite database (auto-created)
```

## API Endpoints

| Method | Path             | Description                     |
|--------|------------------|---------------------------------|
| GET    | `/api/progress`  | All lesson completion status    |
| POST   | `/api/progress`  | Mark a lesson complete          |
| GET    | `/api/bloom`     | Bloom activity completion       |
| POST   | `/api/bloom`     | Mark a Bloom activity complete  |
| POST   | `/api/feedback`  | Get AI feedback on a response   |
| GET    | `/api/chat`      | Load chat history for a lesson  |
| POST   | `/api/chat`      | Send message to AI tutor        |
| GET    | `/api/quiz-history` | Quiz result history          |
| POST   | `/api/quiz`      | Save a quiz result              |
| GET    | `/api/notes`     | Load notes                      |
| POST   | `/api/notes`     | Save notes                      |
| GET    | `/api/stats`     | Dashboard statistics            |
| POST   | `/api/reset`     | Reset all progress              |

## Curriculum Sources

- [Mathematics for Machine Learning](https://mml-book.github.io/) — Deisenroth, Faisal, Ong (primary structure)
- [Stanford CS229](https://cs229.stanford.edu/) — Math prerequisites & review
- [Deep Learning Book](https://www.deeplearningbook.org/) — Goodfellow, Bengio, Courville (Part I)
- [MIT 18.06](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) — Linear Algebra (Strang)
