const connectors = require('./connectors');

const User = require('../db/models/user');
const Healer = require('../db/models/healer');
const Comment = require('../db/models/comment');

const resolvers = {
  Query: {
    users() {
      return connectors.User.getUsers()
        .then((users) => {
          return users.map((user) => {
            return {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            };
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    healer(root, args) {
      if (args.id) {
        return Healer.findById(args.id)
      } else {
          console.log('ajajaj');
          return Healer.find({});
      }
    },
    healers(parentValue, args){
      return Healer.find({});
    },
    comments(root, args) {
      if (args.id) {
        return Comment.findById(args.id)
      } else if(args.document && args.entity) {
        return Comment.find({entity: args.entity, document: args.document})
      } else {
          console.log('ajajaj');
          return Comment.find({});
      }
    }
  },
  Mutation: {
    signUp(root, args) {
      const errors = [];

      return connectors.Auth.signUp(args)
        .then(token => ({
          token,
          errors
        }))
        .catch((err) => {
          if (err.code && err.message) {
            errors.push({
              key: err.code,
              value: err.message
            });
            return { token: null, errors };
          }

          throw new Error(err);
        });
    },
    signIn(root, args) {
      const errors = [];

      return connectors.Auth.signIn(args)
        .then(token => ({
          token,
          errors
        }))
        .catch((err) => {
          if (err.code && err.message) {
            errors.push({
              key: err.code,
              value: err.message
            });

            return { token: null, errors };
          }

          throw new Error(err);
        });
    },
    addComment(root, args) {
      const errors = [];
      const comment = new Comment({
        userId: args.userId,
        entity: args.entity,
        document: args.document,
        text: args.text,
        parentId: args.parentId,
        createdAt: new Date(),
      });
      comment.save(function (err, commentInserted) {
        if (err) return console.error(err);
        console.debug(commentInserted._id + " saved to comments collection.");
      });
      return comment;
    },
  }
};

module.exports = resolvers;