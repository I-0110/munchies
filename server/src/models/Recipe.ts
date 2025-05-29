import { Schema, model, Document, Types } from 'mongoose';

// Define an interface for the Profile document
interface IRecipe extends Document {
  _id: string;
  name: string;
  author?: string;
  instructions:string;
  image_url?: string;
  video_url?: string;
  ingredients: Types.ObjectId[];
}

// Define the schema for the Profile document
const recipeSchema = new Schema<IRecipe>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    author: {
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
      },
    ],
  },
  {
    timestamps: false,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Recipe = model<IRecipe>('Recipes', recipeSchema);

export default Recipe;
