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
  getPostsByTag(tag) {
    return posts().then(postCollection => {
      return postCollection.find({ tags: tag }).toArray();
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
  addPost(title, body, tags, posterId) {
    return posts().then(postCollection => {
      return users.getUserById(posterId).then(userThatPosted => {
        let newPost = {
          title: title,
          body: body,
          poster: {
            id: posterId,
            name: `${userThatPosted.firstName} ${userThatPosted.lastName}`
          },
          tags: tags,
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
  updatePost(id, updatedPost) {
    return posts().then(postCollection => {
      let updatedPostData = {};

      if (updatedPost.tags) {
        updatedPostData.tags = updatedPost.tags;
      }

      if (updatedPost.title) {
        updatedPostData.title = updatedPost.title;
      }

      if (updatedPost.body) {
        updatedPostData.body = updatedPost.body;
      }

      let updateCommand = {
        $set: updatedPostData
      };

      return postCollection
        .updateOne({ _id: id }, updateCommand)
        .then(result => {
          return this.getPostById(id);
        });
    });
  },
  renameTag(oldTag, newTag) {
    let findDocuments = {
      tags: oldTag
    };

    let firstUpdate = {
      $pull: oldTag
    };

    let secondUpdate = {
      $addToSet: newTag
    };

    return postCollection
      .updateMany(findDocuments, firstUpdate)
      .then(result => {
        return postCollection.updateMany(findDocuments, secondUpdate);
      })
      .then(secondUpdate => {
        return this.getPostsByTag(newTag);
      });
  }
};

module.exports = exportedMethods;
