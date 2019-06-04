const mongoCollections = require("./mongoCollections");
const posts = mongoCollections.posts;
const dogs = require("./dogs");

let exportedMethods = {
  async getPostById(id) {
    if (!id) throw "You must provide an id to search for";

    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: id });
    if (post === null) throw "No dog with that id";

    return post;
  },
  async getAllPosts() {
    const postCollection = await posts();

    const posts = await postCollection.find({}).toArray();

    return posts;
  },
  async addPost(title, body, posterId) {
    if (!title) throw "You must provide a title";
    if (!body) throw "You must provide a body";
    if (!posterId) throw "You must specify a poster";

    const postCollection = await posts();
    const dogThatPosted = await dogs.getDogById(posterId);

    const newPostInfo = {
      title: title,
      body: body,
      poster: {
        id: posterId,
        name: dogThatPosted.name
      }
    };

    const insertInfo = await postCollection.insertOne(newPostInfo);
    if (insertInfo.insertedCount === 0) throw "Could not add post";

    const newPost = await this.getPostById(insertInfo.insertedId);

    return newPost;
  },
  async removePost(id) {
    const postCollection = await posts();
    const deletionInfo = await postCollection.removeOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
    0;
  },
  async updatePost(id, title, body, posterId) {
    if (!id) throw "You must provide a post id";
    if (!title) throw "You must provide a title";
    if (!body) throw "You must provide a body";
    if (!posterId) throw "You must specify a poster";

    const postCollection = await posts();
    const dogThatPosted = await dogs.getDogById(posterId);

    let updatedPost = {
      title: title,
      body: body,
      poster: {
        id: posterId,
        name: dogThatPosted.name
      }
    };

    const updatedInfo = await postCollection.replaceOne(
      { _id: id },
      updatedPost
    );

    if (updatedInfo.modifiedCount === 0) {
      throw "could not update post successfully";
    }

    return await this.getPostById(id);
  }
};

module.exports = exportedMethods;
