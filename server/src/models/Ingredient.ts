import { Schema, model, Document } from 'mongoose';

// Define an interface for the Profile document
interface IIngredient extends Document {
  _id: string;
  name: string;
  amount: string;
  calories: number;
}

// Define the schema for the Profile document
const ingredientSchema = new Schema<IIngredient>(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    amount: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    calories: {
      type: Number,
      required: true,
      trim: true
    }
  },
  {
    timestamps: false,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Ingredient = model<IIngredient>('Ingredient', ingredientSchema);

export default Ingredient;
