const { User, Book } = require("../models");
const { signToken, AuthenticationError, getProfile } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({
          _id: context.user._id,
        });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create({ ...args });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    //unsure about email/username conundrum
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      const user = context.user;
      if (user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: { ...args } } },
          { new: true, runValidators: true }
        );
        console.log(updatedUser);
        return updatedUser;
      }
      throw AuthenticationError;
      ("You need to be logged in!");
    },
    deleteBook: async (parents, args, context) => {
      const user = context.user;
      if (user) {
        const { bookId } = args;
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
