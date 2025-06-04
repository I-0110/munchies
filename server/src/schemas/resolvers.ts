import { Ingredient, Recipe, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface IUser {
  _id: string
  email: string;
}
{}
interface IUserArgs {
  userId: string;
}

interface IAddUserArgs {
  input:{
    name: string;
    email: string;
    password: string;
  }
}

interface IIngredientArgs {
  name: string
  calories: number
}

interface IAddRecipesArgs {
  input: {
    day: string
    name: string
    author?: string
    instructions:string
    image_url?: string
    video_url?: string
    ingredients: IIngredientArgs[]
  }
}

interface IRemoveRecipesArgs {
  day: string
  recipeId: string
}

interface IContext {
  user?: IUser;
}

const resolvers = {
  Query: {
    users: async (): Promise<IUser[]> => {
      return await User.find();
    },
    user: async (_parent: any, { userId }: IUserArgs): Promise<IUser | null> => {
      return await User.findOne({ _id: userId }).populate({path: 'recipes', populate: { path: 'ingredients', model: 'Ingredient'}});
    },
    me: async (_parent: any, _args: any, context: IContext): Promise<IUser | null> => {
      if (context.user) {
        return await User.findOne({ email: context.user.email }).populate({path: 'recipes', populate: { path: 'ingredients', model: 'Ingredient'}});
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: IAddUserArgs): Promise<{ token: string; user: IUser }> => {
      const user = await User.create({ ...input })
      user.populate('recipes');
      const token = signToken(user.name, user.email, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUser }> => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user.name, user.email, user._id);
      return { token, user };
    },
    addRecipes: async (_parent: any, { input }: IAddRecipesArgs, context: IContext) => {
      if (context.user) {
          const { day, name, author, instructions, image_url, video_url } = input
          const ingredientList = []
          
          for (const ingredient of input.ingredients) {
            console.log(ingredient)
            const newIngredient = await Ingredient.create({ ...ingredient })
            ingredientList.push((newIngredient._id))
          }
          const recipe = await Recipe.create({ day, name, author, instructions, image_url, video_url, ingredients: ingredientList })

          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { recipes: recipe } },
            {
              new: true,
              runValidators: true,
            }
            );

          return await updatedUser?.populate({
            path: 'recipes',
            populate: {
              path: 'ingredients',
              model: 'Ingredient',
            },
          });
      }
      throw AuthenticationError
    },
    removeUser: async (_parent: any, _args: any, context: IContext) => {
      if (context.user) {
        const recipes = await User.findOne({ _id: context.user._id }, 'recipes');

        if (recipes && Array.isArray(recipes.recipes)) {
          for (const recipe of recipes.recipes) {
            const ingredients = await Recipe.findOne(
              { 
                _id: recipe
              }, 'ingredients')
            
            
            if (ingredients && Array.isArray(ingredients.ingredients)) {
              for (const ingredient of ingredients.ingredients) {
                await Ingredient.findOneAndDelete({ _id: ingredient });
              }
            }

            await Recipe.findOneAndDelete({ _id: recipe });
          }
        }

        await User.findOneAndDelete({ _id: context.user._id })
        return
      }
      throw AuthenticationError;
    },
    removeRecipes: async (_parent: any, { day, recipeId }: IRemoveRecipesArgs, context: IContext) => {
      if (context.user) {
          const deletedIngredients = await Recipe.findOne(
            { 
              day: day,
              _id: recipeId
            }, 'ingredients')
          
          
          if (deletedIngredients && Array.isArray(deletedIngredients.ingredients)) {
            for (const ingredient of deletedIngredients.ingredients) {
              await Ingredient.findOneAndDelete({ _id: ingredient });
            }
          }

          const deletedRecipe = await Recipe.findOneAndDelete(
            { 
              day: day,
              _id: recipeId
            }
          )

          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { recipes: deletedRecipe?._id } },
            {
              new: true,
              runValidators: true,
            }
          );

          return await updatedUser?.populate({
            path: 'recipes',
            populate: {
              path: 'ingredients',
              model: 'Ingredient',
            },
          });
        }
      throw AuthenticationError;
    },
  },
};

export default resolvers;





    // {
      // "day": "Monday",
      // "recipes": [{
      //   "name": "Hamburger",
      //   "author": null,
      //   "instructions": "Assemble",
      //   "image_url": null,
      //   "video_url": null,
      //   "ingredients": [
      //     {
      //       "name": "Hamburger",
      //       "calories": null
      //     },
      //     {
      //       "name": "Pickles",
      //       "calories": null
      //     },
      //     {
      //       "name": "Cheese",
      //       "calories": null
      //     },
      //     {
      //       "name": "Bun",
      //       "calories": null
      //     }
      //   ]
      // }]
    // }