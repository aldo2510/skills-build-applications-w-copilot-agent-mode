import { randomBytes, scryptSync } from 'node:crypto';
import mongoose from 'mongoose';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const user = User;
const team = Team;
const activity = Activity;
const leaderboard = Leaderboard;
const workout = Workout;
const teamIds = [
  new mongoose.Types.ObjectId('650000000000000000000001'),
  new mongoose.Types.ObjectId('650000000000000000000002'),
];
const userIds = [
  new mongoose.Types.ObjectId('650000000000000000000011'),
  new mongoose.Types.ObjectId('650000000000000000000012'),
  new mongoose.Types.ObjectId('650000000000000000000013'),
  new mongoose.Types.ObjectId('650000000000000000000014'),
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const teams = [
      {
        _id: teamIds[0],
        name: 'Trailblazers',
        description: 'A team focused on running, hiking, and outdoor fitness.',
        members: [userIds[0], userIds[1]],
      },
      {
        _id: teamIds[1],
        name: 'Everyday Athletes',
        description: 'Building healthy habits one workout at a time.',
        members: [userIds[2], userIds[3]],
      },
    ];
    const users = [
      { _id: userIds[0], name: 'Avery Chen', email: 'avery@example.com', teamId: teamIds[0] },
      { _id: userIds[1], name: 'Jordan Rivera', email: 'jordan@example.com', teamId: teamIds[0] },
      { _id: userIds[2], name: 'Morgan Patel', email: 'morgan@example.com', teamId: teamIds[1] },
      { _id: userIds[3], name: 'Riley Thompson', email: 'riley@example.com', teamId: teamIds[1] },
    ];
    const activities = [
      {
        _id: new mongoose.Types.ObjectId('650000000000000000000021'),
        userId: userIds[0],
        type: 'Running',
        duration: 35,
        date: daysAgo(0),
        notes: 'Easy neighborhood run',
      },
      {
        _id: new mongoose.Types.ObjectId('650000000000000000000022'),
        userId: userIds[1],
        type: 'Cycling',
        duration: 50,
        date: daysAgo(1),
        notes: 'Steady ride on the river trail',
      },
      {
        _id: new mongoose.Types.ObjectId('650000000000000000000023'),
        userId: userIds[2],
        type: 'Strength',
        duration: 40,
        date: daysAgo(1),
        notes: 'Full-body strength session',
      },
      {
        _id: new mongoose.Types.ObjectId('650000000000000000000024'),
        userId: userIds[3],
        type: 'Walking',
        duration: 30,
        date: daysAgo(2),
        notes: 'Brisk walk after work',
      },
    ];
    const leaderboardEntries = [
      { _id: new mongoose.Types.ObjectId('650000000000000000000031'), userId: userIds[0], points: 420 },
      { _id: new mongoose.Types.ObjectId('650000000000000000000032'), userId: userIds[1], points: 360 },
      { _id: new mongoose.Types.ObjectId('650000000000000000000033'), userId: userIds[2], points: 310 },
      { _id: new mongoose.Types.ObjectId('650000000000000000000034'), userId: userIds[3], points: 275 },
    ];
    const workouts = [
      {
        _id: new mongoose.Types.ObjectId('650000000000000000000041'),
        name: 'Beginner Interval Run',
        description: 'Alternate comfortable jogging with short recovery walks.',
        category: 'Cardio',
        duration: 25,
      },
      {
        _id: new mongoose.Types.ObjectId('650000000000000000000042'),
        name: 'Full-Body Foundations',
        description: 'A balanced bodyweight routine for building strength.',
        category: 'Strength',
        duration: 30,
      },
      {
        _id: new mongoose.Types.ObjectId('650000000000000000000043'),
        name: 'Mobility Reset',
        description: 'Gentle stretches and mobility exercises for recovery.',
        category: 'Recovery',
        duration: 15,
      },
    ];

    const usersWithPasswordHashes = users.map((seedUser) => ({
      ...seedUser,
      passwordHash: hashPassword('octofit-demo-password'),
    }));
    await team.deleteMany({ _id: { $in: teams.map(({ _id }) => _id) } });
    await team.insertMany(teams);
    await user.deleteMany({ _id: { $in: usersWithPasswordHashes.map(({ _id }) => _id) } });
    await user.insertMany(usersWithPasswordHashes);
    await activity.deleteMany({ _id: { $in: activities.map(({ _id }) => _id) } });
    await activity.insertMany(activities);
    await leaderboard.deleteMany({ _id: { $in: leaderboardEntries.map(({ _id }) => _id) } });
    await leaderboard.insertMany(leaderboardEntries);
    await workout.deleteMany({ _id: { $in: workouts.map(({ _id }) => _id) } });
    await workout.insertMany(workouts);

    console.log('Database seeding complete:', {
      users: users.length,
      teams: teams.length,
      activities: activities.length,
      leaderboard: leaderboardEntries.length,
      workouts: workouts.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      process.exitCode = 1;
    }
  }
}

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

void seedDatabase();
