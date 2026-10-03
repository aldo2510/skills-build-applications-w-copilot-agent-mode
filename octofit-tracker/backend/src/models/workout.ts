import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
