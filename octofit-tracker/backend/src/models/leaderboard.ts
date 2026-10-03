import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
