var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/todo', function(err, db) {
    db.collection('todo_items').find({}).toArray(function(err, docs) {
      res.render('index', {todos: docs});
      // res.render('index', { title: '2DO' });
    });
  });
});

router.get('/pandah', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/todo', function(err, db) {
    db.collection('todo_items').insertOne(
      {name: req.query.task},
      function(err) {
        res.redirect('/');
      }
    )
  });
});

router.get('/delete', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/todo', function(err, db) {
    db.collection('todo_items').deleteOne(
     {"_id" : ObjectId(req.query.id)},
      function(err) {
        console.log(err);
        res.redirect('/');
      }
    )
  });
});

module.exports = router;
