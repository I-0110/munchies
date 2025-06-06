import { Ingredient, Recipe, User } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
  try {
    await User.collection.drop()
    await Recipe.collection.drop()
    await Ingredient.collection.drop()

    console.log("DBs dropped!")

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
