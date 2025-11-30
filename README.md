# Shrava Voice Automation Intelligence Platform

Modern React + Node implementation of the Shrava marketing site showcasing AI-driven CPaaS/CCaaS capabilities. The previous static HTML build is preserved under `legacy_static_backup/` for reference.

## Project Structure

```
website2/
├── README.md
├── legacy_static_backup/      # Original static site (HTML/CSS/JS)
├── frontend/                  # React + Vite single-page app
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── data/              # Content/data definitions
│   │   └── styles/            # Imported CSS (ported from legacy)
│   └── index.html
└── backend/                   # Express server shell
    └── src/server.js
```

## Prerequisites

- Node.js 18+
- npm (comes with Node)

## Installation

Install frontend and backend dependencies:

```bash
npm run install:all
```

## Development

Run frontend (Vite) dev server:

```bash
npm run dev:frontend
```

Run backend (Express) dev server:

```bash
npm run dev:backend
```

Both commands hot–reload code changes. The backend currently exposes:

- `GET /api/status` – returns static baseline metrics
- `GET /api/health` – simple health probe

## Production Build & Serve

Build the React app and serve it from the Node backend:

```bash
npm run build:frontend
npm run start:backend
```

The build output lives in `frontend/dist/`; the Express server statically serves this folder alongside the JSON endpoints.

### Command Copilot Chat Widget

- The floating "Command Copilot" widget is rendered globally from `src/components/ChatWidget.jsx`.
- It streams responses from the Express endpoint `POST /api/chat`, which currently returns simulated guidance chunks.
- Integrate a real LLM/provider by replacing the placeholder logic in `backend/src/server.js` and securing the route (API key, auth, etc.).
- Frontend limits history payload to the last 8 turns and gracefully handles network errors.

## Legacy Static Backup

The original static site (HTML/CSS/JS) is fully preserved within `legacy_static_backup/`. You can open `legacy_static_backup/index.html` directly in the browser, or reuse its assets independently.

## Scripts Reference

| Command | Description |
| --- | --- |
| `npm run install:all` | Install dependencies for both frontend and backend |
| `npm run dev:frontend` | Start Vite dev server at http://localhost:5173 |
| `npm run dev:backend` | Start Express dev server with nodemon at http://localhost:4000 |
| `npm run build:frontend` | Create production build in `frontend/dist/` |
| `npm run start:backend` | Launch backend serving built React bundle |

## Next Steps

- Expand backend APIs for dynamic data feeds.
- Introduce environment-specific configuration (e.g., `.env`) for metrics or credentials.
- Add automated tests for React components and backend endpoints as the platform evolves.
