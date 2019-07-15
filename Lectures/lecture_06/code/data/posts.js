const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const users = require("./users");
const uuid = require("node-uuid");

let exportedMethods = {
  getAllPosts() {
    return posts().then(postCollection => {
      return postCollection.find({}).toArray();
    });
  },
  getPostById(id) {
    return posts().then(postCollection => {
      return postCollection.findOne({ _id: id }).then(post => {
        if (!post) throw "Post not found";
        return post;
      });
    });
  },
  addPost(title, body, posterId) {
    return posts().then(postCollection => {
      return users.getUserById(posterId).then(userThatPosted => {
        let newPost = {
          title: title,
          body: body,
          poster: {
            id: posterId,
            name: `${userThatPosted.firstName} ${userThatPosted.lastName}`
          },
          _id: uuid.v4()
        };

        return postCollection
          .insertOne(newPost)
          .then(newInsertInformation => {
            return newInsertInformation.insertedId;
          })
          .then(newId => {
            return this.getPostById(newId);
          });
      });
    });
  },
  removePost(id) {
    return posts().then(postCollection => {
      return postCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete post with id of ${id}`;
        } else {
        }
      });
    });
  },
  updatePost(id, title, body, posterId) {
    return posts().then(postCollection => {
      return users.getUserById(posterId).then(userThatPosted => {
        let updatedPost = {
          title: title,
          body: body,
          poster: {
            id: posterId,
            name: userThatPosted.name
          }
        };

        return postCollection
          .updateOne({ _id: id }, updatedPost)
          .then(result => {
            return this.getPostById(id);
          });
      });
    });
  }
};

module.exports = exportedMethods;
