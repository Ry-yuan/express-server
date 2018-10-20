const config = require('./config');
module.exports = () => {
  const mongoose = require('mongoose');
  //链接到数据库
  mongoose.connect(config.mongosePath);

  let db = mongoose.connection;

  db.on('connected', function () {
    console.log('Mongodb connect success');
  });

  db.on('disconected', () => {
    console.log('Mongodb disconected');
  });

  db.on('error', err => {
    console.log("Mondodb error", err);
  });
}