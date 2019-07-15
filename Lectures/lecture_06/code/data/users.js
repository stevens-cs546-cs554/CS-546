const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("node-uuid");

let exportedMethods = {
  getAllUsers() {
    return users().then(userCollection => {
      return userCollection.find({}).toArray();
    });
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  getUserById(id) {
    return users().then(userCollection => {
      return userCollection.findOne({ _id: id }).then(user => {
        if (!user) throw "User not found";
        return user;
      });
    });
  },
  addUser(firstName, lastName) {
    return users().then(userCollection => {
      let newUser = {
        firstName: firstName,
        lastName: lastName,
        _id: uuid.v4()
      };

      return userCollection
        .insertOne(newUser)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getUserById(newId);
        });
    });
  },
  removeUser(id) {
    return users().then(userCollection => {
      return userCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete user with id of ${id}`;
        }
      });
    });
  },
  updateUser(id, firstName, lastName) {
    return this.getUserById(id).then(currentUser => {
      let updatedUser = {
        firstName: name,
        lastName: lastName
      };

      return userCollection.updateOne({ _id: id }, updatedUser).then(() => {
        return this.getUserById(id);
      });
    });
  }
};

module.exports = exportedMethods;
