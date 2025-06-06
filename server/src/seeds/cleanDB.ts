import { Ingredient, Recipe, User } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    console.log('User collection cleaned.');

    await Recipe.deleteMany({});
    console.log('Recipe collection cleaned.');

    await Ingredient.deleteMany({});
    console.log('Ingredient collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
