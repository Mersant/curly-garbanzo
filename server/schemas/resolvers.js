const { AuthenticationError } = require('apollo-server-express');
const { User, Messages } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users:async () => {
            return User.find().populate('messageHistory');
        },
        user: async () => { 
            return User.findOne({username}).populate('messageHistory');
        },
       messages: async (parent,{username}) => {
        const params = username ? {username} : {}; 
        return Messages.find(params).sort({createdAt:-1});
       }
    },

    Mutation: {
        addUser: async (parent, { username, password }) => {
            const user = await User.create({ username,password });
            const token = signToken(user);
            return { token, user };
        },
        login: async(parent,{username,password})=> {
            const user = await User.findOne({username});
            if (!user){
                throw new AuthenticationError("User with this username does not exist!");
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError("Incorrect password!");
            }
            const token = signToken(user);
            return {token,user};
        },
        addMessage: async (parent,{messageText})=>{
            const message = await Messages.create({messageText});
            await User.findOneAndUpdate(
                {username:this.username},
                {$addToSet: {messages:message._id}} // Need to add message to the presently logged in user, unsure of how to do that
            );
        }

    }
}

module.exports = resolvers;