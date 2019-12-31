# Welcome to the Lecture 4!

## Introduction

This week, we will be learning about MongoDB, our database for this course!

## What is MongoDB?

MongoDB is a document based database; this means that it basically stores entire JavaScript objects in a database store long-term.

Document based databases like MongoDB have some tradeoffs. They do not use the SQL query language, but rather have their own language for sending commands to the database.

MongoDB does, however, share a number of similarities to traditional RDBMS systems; it supports indexing, sharding, clustering, and many other common concepts.

Collections in MongoDB are key-value stores, and are schemaless. Documents inside a collection do not have to have an identical structure. Looking up items by their `_id` field is extremely fast, but querying them is relatively slower than querying RDBMS systems as a result of these two attributes.

### Structure of MongoDB

The general structure of MongoDB is fairly simple:

1.  The highest level is the actual database management system that you interact with (the mongo process; akin to your SQL DB process)
2.  There are many database stored inside the DBMS (database management system)
3.  Each database has many collections; these are similar to tables in SQL databases. Collections do not have a standardize schema, however; they represent groupings based on the content, not simply schema
4.  Each collection has many documents; documents do not have to have an identical schema; these are similar to rows in a table
5.  Each document may have "subdocuments" (nested objects) inside a document; they may also have arrays inside the document

### Using MongoDB

1.  First, we install MongoDB on our system
2.  After that, in our codebase, we install the mongodb node driver as a dependency
3.  From there, in our codebase, we need to start a connection; I prefer having a single module that initializes a single connection, and exports it, as we can see [in mongoConnections.js](https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_04/mongoConnection.js).
4.  Once we have a connection, we can query collections from the connection; to do this simply, we can also make a module that [exports our collections](https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_04/mongoCollections.js)
5.  [We make modules](https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_04/dogs.js) that abstract all our database level logic into simple paradigms that our app code can follow; it is very bad idea to have your database code populated throughout the entirety of your application. Database drivers change, and sometimes you switch databases as your codebases' needs evolve
6.  We then [utilize those modules](https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_04/app.js) in our "app code", which will have little to no knowledge of what our database actually is -- just that there is some asynchronous module that allows us to get / set data.

## CRUD Operations (Create, Read, Update, Delete) Syntax

For most data types you ever create, you will want to setup a module that allows you to easily CRUD those types.

For our examples, we will be using our [dogs module](https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_04/dogs.js).

### Create

We write methods such as `async addDog(name, breeds)` in order to abstract the syntax of creating a dog. In our create methods, we'll always want to do a number of error checks to make sure we prevent dirty data from entering our DB.

Let's take a look at `addDog`:

```
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
}
```

We first check if we're given a name or an array of breeds in the manner that we expect; if these are not 'clean' then we throw, so that the promise returned from the async method rejects.

If the data is clean, then we construct a JavaScript object and use the MongoDB driver's `insertOne` method for the dog collection to insert it into our database.

When we perform an `insertOne`, we get metadata back about the status of the operation; this allows us to check for errors on the DB side of things. It also provides us with the new id that we let the server generate. In MongoDB, all of our documents have a special field, `_id`, which represents their unique document id.

My own preference is to then have the insert operation return the result of the `getById` operation -- the reasons for this are that we may want to setup more complex representations of our data in our application that are not necessarily on the document level, such as querying data in different collections and composing an object that is the result of both queries.

### Read

#### Reading One

```
  async getDogById(id) {
    if (!id) throw "You must provide an id to search for";

    const dogCollection = await dogs();
    const doggo = await dogCollection.findOne({ _id: id });
    if (doggo === null) throw "No dog with that id";

    return doggo;
},
```

Once again, we start by checking that our data module has been provided with the right arguments and that we are given an `id` to search on. We then use the drivers `findOne` method. The `findOne` method takes an object representing the query we want to perform. In our case, we want to simply query the one document that has an `_id` field that equals our `id` variable, so we simply pass a query of `{ _id: id }` to search for that match. We will see more advanced queries next week.

#### Reading Many

```
  async getAllDogs() {
    const dogCollection = await dogs();

    const dogs = await dogCollection.find({}).toArray();

    return dogs;
},
```

To return multiple results, we simply use the `find` operation. To return all results, we pass it an empty query of `{}` to represent the fact that we don't want to perform any searching or filtering. The find operation returns a dbCursor, so we call `.toArray` on it to convert the cursor to our data.

### Update

```
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
```

Updating is generally quite similar to creating a structure; this time, we have to check our arguments for an `id` as well. The major difference is that now our `updateOne` call receives two arguments.

The first argument to `updateOne` is the query to match which document needs updating; in our case, we want to update the single dog that has the `_id` provided to this method, so we use `{ _id: id }` as our query.

The second argument is our update command. For now, we will just replace the object in the database with our newly updated version by providing it with a new copy of the object. We will see other ways of updating a document without replacing next week.

### Delete

```
  async removeDog(id) {
    if (!id) throw "You must provide an id to search for";

    const dogCollection = await dogs();
    const deletionInfo = await dogCollection.removeOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete dog with id of ${id}`;
    }
},
```

Our `removeOne` method also takes a query to target which document to remove. Once again, we're simply matching based on the `_id` field for now.

## Assignment Help

* Most of the database operations you need to setup can be easily adapted from the lecture code!
