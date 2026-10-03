import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import './config/database';
import Activity from './models/activity';
import Leaderboard from './models/leaderboard';
import Team from './models/team';
import User from './models/user';
import Workout from './models/workout';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const frontendOrigin =
  process.env.FRONTEND_URL ??
  (codespaceName
    ? `https://${codespaceName}-5173.app.github.dev`
    : 'http://localhost:5173');

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response, next) => {
  try {
    response.json(await User.find().lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_request, response, next) => {
  try {
    response.json(await Team.find().lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().sort({ points: -1 }).lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().lean());
  } catch (error) {
    next(error);
  }
});

app.use((_request, response) => {
  response.status(404).json({ error: 'Not found' });
});

const handleError: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};
app.use(handleError);

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});
