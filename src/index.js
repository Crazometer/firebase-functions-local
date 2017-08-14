var express = require('express');
var database = require('./database');
var path = require('path');

module.exports = function(options) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('You are running firebase-functions-mock in production, DOH! :-)')
  }

  options = options || {}

  var config = options.config || {}
  var port = options.port || 3001
  var publicPath = options.publicPath || 'public'
  var app = express();
  var httpListener = function (req, res) {
    res.status(404).send('You have not added an "onRequest" handler for your firebase functions');
  };

  app.use(express.static(path.resolve(publicPath)))
  app.all('*', function (req, res, next) {
    httpListener(req, res, next);
  });

  console.log("firebase-functions-mock listening on port 3001")
  app.listen(port);

  return {
    auth: {
      user() {
        console.warn('WARNING: firebase-functions-mock does not support auth events')

        return {
          onCreate(){}
        }
      }
    },

    config: function () { return config },

    database: database,

    https: {
      onRequest: function(cb) {
        httpListener = cb;
      }
    }
  };
};
