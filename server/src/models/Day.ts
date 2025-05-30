import { Schema, model, Document, Types } from 'mongoose';

// Define an interface for the Profile document
interface IDay extends Document {
  _id: string;
  userId: string;
  name: string;
  recipes: Types.ObjectId[];
}

// Define the schema for the Profile document
const daySchema = new Schema<IDay>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipes',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Day = model<IDay>('Day', daySchema);

export default Day;