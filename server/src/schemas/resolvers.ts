import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface User {
  email: string;
  week: [];
}

interface UserArgs {
  userId: string;
}

interface AddUserArgs {
  input:{
    name: string;
    email: string;
    password: string;
  }
}

// interface AddIngredientsArgs {
//   userId: string;
//   ingredients: string;
// }

// interface RemoveIngredientsArgs {
//   userId: string;
//   ingredients: string;
// }

interface AddRecipesArgs {
  day: string;
  recipes: string;
}

interface RemoveRecipesArgs {
  day: string;
  recipe: object;
}

interface Context {
  user?: User;
}

const resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      return await User.find();
    },
    user: async (_parent: any, { userId }: UserArgs): Promise<User | null> => {
      return await User.findOne({ _id: userId });
    },
    me: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOne({ email: context.user.email });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs): Promise<{ token: string; user: User }> => {
      const user = await User.create({ ...input });
      const token = signToken(user.name, user.email, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: User }> => {
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
    
    addRecipes: async (_parent: any, {day, recipes }: AddRecipesArgs, _context: Context): Promise<User | null> => {
      // if (context.user) {
        return await User.findOneAndUpdate(
          { email: "jo@mail.com", week[day]: day },
          {
            $addToSet: { recipes: recipes },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
    //   throw AuthenticationError;
    // },
    removeUser: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndDelete({ email: context.user.email });
      }
      throw AuthenticationError;
    },
    
    removeRecipes: async (_parent: any, { day, recipe }: RemoveRecipesArgs, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { email: context.user.email, "days": day },
          { $pull: { "days.recipes": recipe } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;


// addIngredient: async (_parent: any, { userId, ingredients }: AddIngredientsArgs, context: Context): Promise<User | null> => {
    //   if (context.user) {
    //     return await User.findOneAndUpdate(
    //       { _id: userId },
    //       {
    //         $addToSet: { ingredients: ingredients },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw AuthenticationError;
    // },
    // removeIngredient: async (_parent: any, { ingredients }: RemoveIngredientsArgs, context: Context): Promise<User | null> => {
    //   if (context.user) {
    //     return await User.findOneAndUpdate(
    //       { email: context.user.email },
    //       { $pull: { ingredients: ingredients } },
    //       { new: true }
    //     );
    //   }
    //   throw AuthenticationError;
    // },



    // addRecipes: async (_parent: any, { day, recipes }: AddRecipesArgs, context: Context): Promise<User | null> => {
    //   if (context.user) {
    //     return await User.findOneAndUpdate(
    //       { email: context.user.email, "days.day": day },
    //       {
    //         $addToSet: { recipes: recipes },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw AuthenticationError;
    // },


    // {
    //   "day": "Monday",
    //   "recipes": [{
    //     "name": "Hamburger",
    //     "author": null,
    //     "instructions": "Assemble",
    //     "image_url": null,
    //     "video_url": null,
    //     "ingredients": [
    //       {
    //         "name": "Hamburger",
    //         "calories": null
    //       },
    //       {
    //         "name": "Pickles",
    //         "calories": null
    //       },
    //       {
    //         "name": "Cheese",
    //         "calories": null
    //       },
    //       {
    //         "name": "Bun",
    //         "calories": null
    //       }
    //     ]
    //   }]
    // }