# OctoFit Tracker frontend

The React presentation tier uses Vite, React Router, and Bootstrap. It reads
the API host from `VITE_CODESPACE_NAME` when running in GitHub Codespaces.

## Configure the API URL

Create `octofit-tracker/frontend/.env.local` and set the Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then sends API requests to
`https://your-codespace-name-8000.app.github.dev`. Restart the Vite development
server after creating or changing `.env.local`, because Vite loads environment
variables when the server starts.

If `VITE_CODESPACE_NAME` is not set, the frontend safely falls back to
`http://localhost:8000` for local development.
