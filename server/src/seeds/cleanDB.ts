import { Ingredient, Recipe, User } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
  try {
    await User.deleteMany({})
    await Recipe.deleteMany({})
    await Ingredient.deleteMany({})

    // console.log("No Dbs to drop!")
    console.log("Dbs dropped!")

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
