const MongoClient = require('mongodb').MongoClient;
const settings = {
  mongoConfig: {
    serverUrl: 'mongodb://localhost:27017/',
    database: 'lecture6'
  }
};
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};

const json = {
  _id: 1,
  title: 'Inception',
  rating: 4.5,
  reviews: [
    {
      _id: '9e6b393c-4678-4fa3-a714-5c3bba0331cc',
      title: 'Really Good',
      comment: 'This movie was so interesting.',
      reviewer: 'Phil',
      rating: 4.5
    },
    {
      _id: '13fa5b13-6d1f-4807-a033-b2a5cd2c3e22',
      title: 'Bad',
      comment: 'This movie is trite.',
      reviewer: 'Agatha',
      rating: 2
    },
    {
      _id: 'ac0fcaf2-8899-4ddb-bec6-eb7f0f283db4',
      title: 'Perfect',
      comment: 'Leo should win an Oscar for this.',
      reviewer: 'Definitely Not Leo',
      rating: 4
    }
  ],
  cast: [
    'Leonardo DiCaprio',
    'Ellen Page',
    'Ken Watanabe',
    'Joseph Gordon-Levitt',
    'Marion Cotillard',
    'Tom Hardy'
  ],
  info: {
    release: 2015,
    director: 'Christopher Nolan'
  }
};
