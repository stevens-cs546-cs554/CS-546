const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = require('./users');
const uuid = require('uuid');

let exportedMethods = {
  async getAllPosts() {
    const postCollection = await posts();
    return await postCollection.find({}).toArray();
  },
  async getPostById(id) {
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: id });

    if (!post) throw 'Post not found';
    return post;
  },
  async addPost(title, body, posterId) {
    const postCollection = await posts();
    const userThatPosted = await users.getUserById(posterId);

    let newPost = {
      title: title,
      body: body,
      poster: {
        id: posterId,
        name: `${userThatPosted.firstName} ${userThatPosted.lastName}`
      },
      _id: uuid.v4()
    };

    const newInsertInformation = await postCollection.insertOne(newPost);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';

    return this.getPostById(newInsertInformation.insertedId);
  },
  async removePost(id) {
    const postCollection = await posts();
    const deletionInfo = await postCollection.deleteOne({ _id: id });
    if (deletionInfo.deletedCount === 0)
      throw `Could not delete post with id of ${id}`;
    return true;
  },
  async updatePost(id, title, body, posterId) {
    const postCollection = await posts();
    const userThatPosted = await users.getUserById(posterId);

    let updatedPost = {
      title: title,
      body: body,
      poster: {
        id: posterId,
        name: userThatPosted.name
      }
    };
    const updateInfo = await postCollection.updateOne(
      { _id: id },
      { $set: updatedPost }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';
    return this.getPostById(id);
  }
};

module.exports = exportedMethods;
