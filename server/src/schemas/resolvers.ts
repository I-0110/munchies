import { Ingredient, Recipe, User, Plan } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface IUser {
  _id: string
  email: string;
}

interface IPlan {
  dates: string
  sunday: object[]
  monday: object[]
  tuesday: object[]
  wednesday: object[]
  thursday: object[]
  friday: object[]
  saturday: object[]
}

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

interface IAddPlanArgs {
  input: {
    userId: string
    dates: string
  }
}

interface IIngredientArgs {
  name: string
  calories: number
}

interface IAddRecipesArgs {
  day: string
  planId: string
  input: {
    name: string
    author?: string
    instructions:string
    image_url?: string
    video_url?: string
    ingredients: IIngredientArgs[]
  }
}

interface IRemovePlanArgs {
  planId: string
}

interface IRemoveRecipesArgs {
  day: string
  planId: string
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
      return await User.findOne({ _id: userId });
    },
    me: async (_parent: any, _args: any, context: IContext): Promise<IUser | null> => {
      if (context.user) {
        return await User.findOne({ email: context.user.email });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: IAddUserArgs): Promise<{ token: string; user: IUser }> => {
      const user = await User.create({ ...input })
      user.populate('plan');
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
    addPlan: async (_parent: any, { input }: IAddPlanArgs, context: IContext): Promise<IUser | null> => {
      if (context.user) {
        const { userId, dates } = input
        const newPlan = await Plan.create(
          { 
            userId: userId,
            dates: dates
           })

        return await User.findOneAndUpdate(
          { _id: userId},
          {
            $addToSet: { plan: newPlan._id },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    addRecipes: async (_parent: any, { day, planId, input }: IAddRecipesArgs, context: IContext) => {
      if (context.user) {
        if (planId) {
          const { name, author, instructions, image_url, video_url } = input
          const ingredientList = []
          
          for (const ingredient of input.ingredients) {
            console.log(ingredient)
            const newIngredient = await Ingredient.create({ ...ingredient })
            ingredientList.push((newIngredient._id))
          }
          const recipe = await Recipe.create({ planId, name, author, instructions, image_url, video_url, ingredients: ingredientList })

          const updatedPlan = await Plan.findOneAndUpdate(
            { _id: planId },
            { $push: { [day]: recipe._id } },
            {
              new: true,
              runValidators: true,
            }
            );

          return await updatedPlan?.populate({
            path: `${day}`,
            populate: {
              path: 'ingredients',
              model: 'Ingredient',
            },
          });
        }
        throw new Error("No plan id supplied! Plan id must be supplied for update.")
      }
      throw AuthenticationError
    },
    removeUser: async (_parent: any, _args: any, context: IContext): Promise<IUser | null> => {
      if (context.user) {
        return await User.findOneAndDelete({ email: context.user.email });
      }
      throw AuthenticationError;
    },
    removePlan: async (_parent: any, { planId }: IRemovePlanArgs, context: IContext): Promise<IUser | null> => {
      if (context.user) {
        if (planId) {
          const deletedPlan = await Plan.findOneAndDelete(
            {
              _id: planId,
              userId: context.user?._id
            }
          )
  
          return await User.findOneAndUpdate(
            { _id: context.user?._id },
            {
              $pull: { plan: deletedPlan?._id },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        throw new Error("No plan id supplied! Plan id must be supplied for plan to be deleted.")
      }
      throw AuthenticationError;
    },
    removeRecipes: async (_parent: any, { day, planId, recipeId }: IRemoveRecipesArgs, context: IContext): Promise<IPlan | null> => {
      if (context.user) {
        if (planId) {
          const deletedRecipe = await Recipe.findOneAndDelete(
            { 
              _id: recipeId,
              planId: planId
            })

          return await Plan.findOneAndUpdate(
            { _id: planId },
            { $pull: { [day]: deletedRecipe?._id } },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        throw new Error("No plan id supplied! Plan id must be supplied for update.")
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;





    // {
    //   "day": "Monday",
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
    //   }]
    // // }