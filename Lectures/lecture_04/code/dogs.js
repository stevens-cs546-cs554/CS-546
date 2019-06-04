const mongoCollections = require("./mongoCollections");
const dogs = mongoCollections.dogs;

module.exports = {
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getDogById(id) {
    if (!id) throw "You must provide an id to search for";

    const dogCollection = await dogs();
    const doggo = await dogCollection.findOne({ _id: id });
    if (doggo === null) throw "No dog with that id";

    return doggo;
  },

  async getAllDogs() {
    const dogCollection = await dogs();

    const dogs = await dogCollection.find({}).toArray();

    return dogs;
  },

  async addDog(name, breeds) {
    if (!name) throw "You must provide a name for your dog";

    if (!breeds || !Array.isArray(breeds))
      throw "You must provide an array of breeds";

    if (breeds.length === 0) throw "You must provide at least one breed.";
    const dogCollection = await dogs();

    let newDog = {
      name: name,
      breeds: breeds
    };

    const insertInfo = await dogCollection.insertOne(newDog);
    if (insertInfo.insertedCount === 0) throw "Could not add dog";

    const newId = insertInfo.insertedId;

    const dog = await this.getDogById(newId);
    return dog;
  },
  async removeDog(id) {
    if (!id) throw "You must provide an id to search for";

    const dogCollection = await dogs();
    const deletionInfo = await dogCollection.removeOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete dog with id of ${id}`;
    }
  },
  async updateDog(id, name, breeds) {
    if (!id) throw "You must provide an id to search for";

    if (!name) throw "You must provide a name for your dog";

    if (!breeds || !Array.isArray(breeds))
      throw "You must provide an array of breeds";

    if (breeds.length === 0) throw "You must provide at least one breed.";

    const dogCollection = await dogs();
    const updatedDog = {
      name: name,
      breeds: breeds
    };

    const updateInfo = await dogCollection.updateOne({ _id: id }, updatedDog);
    if (updatedInfo.modifiedCount === 0) {
      throw "could not update dog successfully";
    }

    return await this.getDogById(id);
  }
};
