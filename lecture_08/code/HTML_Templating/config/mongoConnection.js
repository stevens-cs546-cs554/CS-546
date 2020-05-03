const MongoClient = require('mongodb').MongoClient;

const mongoConfig = {
  serverUrl: 'mongodb://localhost:27017/',
  database: 'advancedApiBasedBlog'
};

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};
