# Real-Time Freelance Micro-Task Marketplace — Backend

A complete Node.js/Express/MongoDB backend for a freelance marketplace with
**AI-assisted matching**, **escrow milestone payments**, and a **live
collaborative workspace** per task.

## 1. Tech Stack

| Concern            | Choice                                   |
|---------------------|-------------------------------------------|
| Runtime             | Node.js + Express                        |
| Database            | MongoDB + Mongoose                       |
| Auth                | JWT (jsonwebtoken) + bcrypt password hashing |
| Real-time           | Socket.io (chat, presence, typing, live notifications) |
| File uploads        | Multer (local disk storage; swap for S3/Cloudinary in production) |
| Payments/escrow     | Simulated gateway (deterministic, swappable for real Stripe/Razorpay test mode) |

## 2. Project Structure

```
freelance-backend/
├── server.js                  # entry point: HTTP server + Socket.io + DB connect
├── src/
│   ├── app.js                 # Express app, all route mounting
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── multer.js          # file upload config
│   ├── models/                # 14 Mongoose schemas
│   ├── controllers/           # one file per module (10 modules + auth)
│   ├── routes/                # one file per module
│   ├── services/
│   │   ├── matchingEngine.js  # AI-assisted scoring algorithm
│   │   ├── escrowService.js   # fund/release/refund/split state machine
│   │   └── notificationService.js
│   ├── socket/index.js        # real-time chat + presence
│   ├── middleware/             # auth, role-based access, error handler
│   └── utils/                  # JWT helpers, response helpers, seed script
├── package.json
└── .env.example
```

## 3. Setup

```bash
cd freelance-backend
npm install
cp .env.example .env      # edit MONGO_URI and JWT_SECRET
npm run seed               # creates demo users, a category, a task, a skill test
npm run dev                 # starts on http://localhost:5000 with nodemon
```

Demo accounts created by `npm run seed` (password for all: `password123`):
- `admin@demo.com` — Admin
- `poster@demo.com` — Task Poster (Priya Sharma)
- `freelancer@demo.com` — Freelancer (Rahul Verma, skills: React/Node.js/MongoDB)

## 4. Authentication

All protected routes expect:
```
Authorization: Bearer <token>
```
Get a token via `POST /api/auth/register` or `POST /api/auth/login`.

## 5. Full API Reference (55 core endpoints + auth)

### Auth (not counted in the 55, but required)
| Method | Route | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Authenticated |

### Module 1 — Task Posting & Categorization (6)
| Method | Route | Access |
|---|---|---|
| POST | `/api/tasks` | Poster |
| GET | `/api/tasks/:id` | Public |
| PATCH | `/api/tasks/:id` | Poster (owner) |
| DELETE | `/api/tasks/:id` | Poster (owner) / Admin |
| GET | `/api/tasks` | Public (filters: status, category, minBudget, maxBudget) |
| GET | `/api/tasks/categories` | Public |

### Module 2 — AI Matching Engine (5)
| Method | Route | Access |
|---|---|---|
| GET | `/api/match/tasks/:taskId/freelancers` | Poster/Admin — ranked freelancer matches |
| GET | `/api/match/freelancers/me/tasks` | Freelancer — recommended tasks |
| POST | `/api/match/tasks/:taskId/invite/:freelancerId` | Poster |
| POST | `/api/match/tasks/:taskId/apply` | Freelancer |
| POST | `/api/match/tasks/:taskId/select/:freelancerId` | Poster |

**How matching works:** `src/services/matchingEngine.js` computes a 0–100
score from skill overlap (40%), rating (20%), verified skill badges (15%),
completion history (10%), availability (10%), recency (5%). It's an
explainable weighted algorithm, not a black box — every score returned by the
API includes a `breakdown` so you can show *why* a match was suggested.

### Module 3 — Escrow & Milestone Payments (7)
| Method | Route | Access |
|---|---|---|
| POST | `/api/escrow/tasks/:taskId/milestones` | Poster — define milestone plan |
| GET | `/api/escrow/tasks/:taskId/milestones` | Participants |
| POST | `/api/escrow/milestones/:milestoneId/fund` | Poster |
| POST | `/api/escrow/milestones/:milestoneId/submit` | Freelancer |
| POST | `/api/escrow/milestones/:milestoneId/release` | Poster |
| POST | `/api/escrow/milestones/:milestoneId/refund` | Poster/Admin |
| GET | `/api/escrow/tasks/:taskId/transactions` | Participants |

**Milestone state machine:**
`pending → funded → submitted → approved/rejected → released`

### Module 4 — In-Task Collaborative Workspace (7)
| Method | Route | Access |
|---|---|---|
| GET | `/api/workspace/tasks/:taskId/messages` | Participants |
| POST | `/api/workspace/tasks/:taskId/messages` | Participants |
| PATCH | `/api/workspace/messages/:messageId/read` | Participants |
| POST | `/api/workspace/tasks/:taskId/files` | Participants (multipart upload) |
| GET | `/api/workspace/tasks/:taskId/files` | Participants |
| GET | `/api/workspace/files/:fileId/download` | Participants |
| PATCH | `/api/workspace/tasks/:taskId/archive` | Participants (task must be completed) |

Real-time chat also works over **Socket.io** (`src/socket/index.js`) via
events `workspace:join`, `workspace:message`, `workspace:typing` — the REST
endpoints above are the persistence layer / fallback for non-socket clients.

### Module 5 — Dispute Resolution (5)
| Method | Route | Access |
|---|---|---|
| POST | `/api/disputes/tasks/:taskId` | Poster/Freelancer |
| POST | `/api/disputes/:disputeId/evidence` | Party to dispute |
| GET | `/api/disputes/:disputeId` | Party/Admin |
| PATCH | `/api/disputes/:disputeId/resolve` | Admin |
| PATCH | `/api/disputes/:disputeId/close` | Admin |

(`GET /api/disputes` — admin queue view — included as a practical bonus.)

### Module 6 — Freelancer Portfolio/Ratings (5)
| Method | Route | Access |
|---|---|---|
| POST | `/api/portfolio` | Freelancer |
| PATCH | `/api/portfolio/:itemId` | Freelancer (owner) |
| GET | `/api/portfolio/:freelancerId` | Public |
| POST | `/api/ratings/tasks/:taskId` | Participants (task must be completed) |
| GET | `/api/ratings/:userId` | Public |

### Module 7 — Search/Discovery (5)
| Method | Route | Access |
|---|---|---|
| GET | `/api/search/tasks` | Public (full-text + filters) |
| GET | `/api/search/freelancers` | Public |
| GET | `/api/search/trending` | Public |
| POST | `/api/search/saved` | Authenticated |
| GET | `/api/search/saved` | Authenticated |

### Module 8 — Notifications (5)
| Method | Route | Access |
|---|---|---|
| GET | `/api/notifications` | Authenticated |
| PATCH | `/api/notifications/:id/read` | Authenticated |
| PATCH | `/api/notifications/read-all` | Authenticated |
| GET | `/api/notifications/preferences` | Authenticated |
| PATCH | `/api/notifications/preferences` | Authenticated |

### Module 9 — Admin (5)
| Method | Route | Access |
|---|---|---|
| PATCH | `/api/admin/users/:id/status` | Admin |
| PATCH | `/api/admin/categories/:id` | Admin |
| GET | `/api/admin/analytics` | Admin |
| GET | `/api/admin/flagged` | Admin |
| PATCH | `/api/admin/disputes/:id/override` | Admin |

### Module 10 — Skill Verification Test (5)
| Method | Route | Access |
|---|---|---|
| GET | `/api/skill-tests/:skill` | Public (questions only, answers stripped) |
| POST | `/api/skill-tests/:testId/attempts` | Freelancer — submit answers |
| GET | `/api/skill-tests/attempts/me` | Freelancer |
| PATCH | `/api/skill-tests/attempts/:attemptId/grade` | Admin (for practical questions) |
| GET | `/api/skill-tests` | Public — list available tests |

MCQ-only tests are **auto-graded instantly**; tests containing a practical
question go to `pending_admin_review`. Passing awards a `verifiedSkills`
badge (basic/intermediate/expert) on the freelancer's profile, which directly
feeds into the AI matching engine's score.

## 6. The End-to-End Flow (what actually happens)

1. **Post** — Poster creates a task with required skills, budget, deadline.
2. **Match** — AI matching engine ranks freelancers; poster invites or
   freelancer applies (both flows produce a `matchScore`).
3. **Select & Plan** — Poster picks a freelancer; both agree on a milestone
   breakdown that must sum to the task budget.
4. **Fund** — Poster funds milestone 1 into escrow (simulated gateway call).
5. **Collaborate** — A workspace exists per task from creation; chat and
   files flow through it in real time via Socket.io.
6. **Submit → Approve → Release** — Freelancer marks a milestone delivered;
   poster reviews the deliverable in the workspace and approves; escrow
   releases the payout (minus platform commission) to the freelancer wallet.
7. **Dispute (if needed)** — Either party raises a dispute; evidence
   (messages/files) is attached; admin resolves with a refund, release, or
   percentage split — all handled atomically through `escrowService.js`.
8. **Complete** — Final milestone release marks the task `completed`; both
   parties rate each other; a positive rating auto-creates a portfolio entry
   for the freelancer; the workspace becomes read-only.

Notifications fire at every step above (`notificationService.js`), both
persisted to MongoDB and pushed live over Socket.io if the user is connected.

## 7. Design Notes for Your Report/Viva

- **Escrow is a real transactional ledger**, not just a status flag —
  `EscrowTransaction` records every fund/release/refund/partial-split event,
  so you can reconstruct the full financial history of any task.
- **Matching is explainable AI**, not a black box — a transparent weighted
  scoring function with a visible breakdown, which is defensible in a viva
  ("why did you call it AI-assisted?") and mirrors how many real
  recommendation systems are built before reaching for deep learning.
- **Skill verification feeds the matching engine** — verified badges are a
  first-class scoring input, so the two "bonus" modules are integrated, not
  bolted on.
- **Role-based access is enforced at the route layer** via `restrictTo()`
  middleware, and again inside controllers for ownership checks (e.g. only
  the task's own poster can fund its milestones).

## 8. What to Swap for Production

- Simulated payment gateway → real Stripe/Razorpay integration in
  `escrowService.js` (`simulateGatewayCall`)
- Local disk file storage → S3/Cloudinary in `config/multer.js`
- In-memory saved searches → a `SavedSearch` Mongoose model
- Add refresh tokens / token blacklisting for logout
- Add request validation (e.g. `express-validator` or `zod`) on all inputs
