module.exports = {
  /*
   * This function mostly exists to promisify the connection process.
   */
  connect: function _connect(mongoose, dbUrl, dbName) {
    return new Promise(function _promise(resolve, reject) {
      const connection = mongoose.connect('mongodb://' + dbUrl + '/' + dbName).connection;

      connection.once('open', function connectionDidOpen() {
        resolve(connection);
      });

      connection.once('error', function errorDidHappen(err) {
        reject(err);
      });
    });
  },
};
