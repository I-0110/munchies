import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
interface User {
  email: string;
  recipes: object[];
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

interface AddIngredientsArgs {
  userId: string;
  ingredients: string;
}

interface RemoveIngredientsArgs {
  userId: string;
  ingredients: string;
}

interface AddRecipesArgs {
  userId: string;
  recipes: string;
}

interface RemoveRecipesArgs {
  userId: string;
  recipes: string;
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
    addIngredient: async (_parent: any, { userId, ingredients }: AddIngredientsArgs, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { ingredients: ingredients },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    addRecipes: async (_parent: any, { userId, recipes }: AddRecipesArgs, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { recipes: recipes },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeUser: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    removeIngredient: async (_parent: any, { ingredients }: RemoveIngredientsArgs, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { ingredients: ingredients } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    removeRecipes: async (_parent: any, { recipes }: RemoveRecipesArgs, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { recipes: recipes } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;
