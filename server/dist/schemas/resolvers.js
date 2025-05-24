import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        user: async (_parent, { userId }) => {
            return await User.findOne({ _id: userId });
        },
        me: async (_parent, _args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
    },
    Mutation: {
        addUser: async (_parent, { input }) => {
            const user = await User.create({ ...input });
            const token = signToken(user.name, user.email, user._id);
            return { token, user };
        },
        login: async (_parent, { email, password }) => {
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
        addIngredient: async (_parent, { userId, ingredients }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: userId }, {
                    $addToSet: { ingredients: ingredients },
                }, {
                    new: true,
                    runValidators: true,
                });
            }
            throw AuthenticationError;
        },
        addRecipes: async (_parent, { userId, recipes }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: userId }, {
                    $addToSet: { recipes: recipes },
                }, {
                    new: true,
                    runValidators: true,
                });
            }
            throw AuthenticationError;
        },
        removeUser: async (_parent, _args, context) => {
            if (context.user) {
                return await User.findOneAndDelete({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
        removeIngredient: async (_parent, { ingredients }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { ingredients: ingredients } }, { new: true });
            }
            throw AuthenticationError;
        },
        removeRecipes: async (_parent, { recipes }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { recipes: recipes } }, { new: true });
            }
            throw AuthenticationError;
        },
    },
};
export default resolvers;
