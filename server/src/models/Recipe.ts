import { Schema, model, Document } from 'mongoose';

// Define an interface for the Profile document
interface IRecipe extends Document {
  _id: string;
  day: string;
  mealId: string;
  name: string;
  category?: string;
  instructions:string;
  image_url?: string;
  video_url?: string;
  ingredients?: Schema.Types.ObjectId[];
}

// Define the schema for the Profile document
const recipeSchema = new Schema<IRecipe>(
  {
    day: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    mealId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    category: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    instructions: {
      type: String,
      required: false,
      trim: true
    },
    image_url: {
      type: String,
      required: false,
      trim: true
    },
    video_url: {
      type: String,
      required: false,
      trim: true
    },
    ingredients: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ingredients',
        required: false,
      },
    ],
  },
  {
    timestamps: false,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Recipe = model<IRecipe>('Recipe', recipeSchema);

export default Recipe;
