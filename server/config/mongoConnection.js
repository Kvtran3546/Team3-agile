// mongoConnection.js

const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl);
    _db = await _connection.db(mongoConfig.database);
  }
  return _db;
};

const closeConnection = async () => {
  try {
    await _connection.close();
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
};

module.exports = {
  dbConnection,
  closeConnection,
};
