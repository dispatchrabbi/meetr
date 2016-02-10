const PBKDF2 = require('painless-pbkdf2');

const create = function create(password) {
  return new Promise(function executor(resolve, reject) {
    const pbkdf2 = new PBKDF2();
    pbkdf2.create(password, function cb(err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const verify = function verify(password, hash) {
  return new Promise(function executor(resolve, reject) {
    const pbkdf2 = new PBKDF2(hash);
    pbkdf2.validate(password, function cb(err, valid) {
      if (err) {
        reject(err);
      } else {
        resolve(valid);
      }
    });
  });
};

module.exports = {
  create,
  verify,
};
