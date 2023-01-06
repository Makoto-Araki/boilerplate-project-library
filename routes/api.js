/*
 *
 *
 *       Complete the API routing below
 *       
 *       
 */

'use strict';

// Import
const mongoose = require('mongoose');

// Schema
const bookSchema = new mongoose.Schema({
  title: String,
  comments: [String],
});

// Model
const Book = new mongoose.model('Book', bookSchema);

module.exports = function (app) {

  app.route('/api/books')

    // GET - URL/api/books
    .get(function (req, res){
      Book
      .find({})
      .exec((err, doc) => {
        if (!err) {
          let result = [];

          // Create object array of books
          for (let i = 0; i < doc.length; i++) {
            let object = {};
            object.comments = doc[i].comments;
            object._id = doc[i]._id;
            object.title = doc[i].title;
            object.commentcount = doc[i].comments.length;
            object.__v = doc[i].__v;
            result.push(object);
          }
          
          return res.json(result);
        } else {
          console.error(err);
        }
      });
    })

    // POST - URL/api/books
    .post(function (req, res){

      // Hold value
      let title = req.body.title;
      let entry = new Book();

      // Required field check
      if (title === '') {
        return res.send('missing required field title');
      }

      // Title is inserted
      entry.title = title;
      entry.save((err, doc) => {
        if (!err) {
          return res.json({
            _id: doc._id,
            title: title,
          });
        } else {
          console.error(err);
        }
      });
    })

    // DELETE - URL/api/books
    .delete(function(req, res){
      Book.deleteMany(
        {},
        (err, doc) => {
          if (!err) {
            return res.send('complete delete successful');
          } else {
            console.error(err);
          }
        }
      );
    });

  /* ---------------------------------------------------------------------- */
  
  app.route('/api/books/:id')

    // GET - URL/api/books/:id
    .get(function (req, res){
      let bookid = req.params.id;
      Book
      .find({ _id: bookid })
      .exec((err, doc) => {
        if (!err) {
          let myobject = {};

          // Create object for json
          myobject.comments = doc[0].comments;
          myobject._id = doc[0]._id;
          myobject.title = doc[0].title;
          myobject.commentcount = doc[0].comments.length;
          myobject.__v = doc[0].__v;
          
          return res.json(myobject);
        } else {
          console.error(err);
        }
      });
    })

    // POST - URL/api/books/:id
    .post(function(req, res){

      // Hold value
      let bookid = req.params.id;
      let comment = req.body.comment;

      // Required field check
      if (comment === '') {
        return res.send('missing required field comment');
      }

      // Comment is inserted
      Book.findOneAndUpdate(
        { _id: { $eq: bookid } },
        { $push: { comments: comment } },
        { upsert: false, new: true},
        (err, doc) => {
          if (!err) {
            if (doc !== null) {
              
              // Return document information
              return res.json({
                comments: doc.comments,
                _id: doc._id,
                title: doc.title,
                commentcount: doc.comments.length,
                __v: doc.__v,
              });
              
            } else {
              return res.send('no book exists');
            }
          } else {
            console.error(err);
          }
        }
      );
    })

    // DELETE - URL/api/books/:id
    .delete(function(req, res){
      let bookid = req.params.id;
      Book.findOneAndDelete(
        { _id: { $eq: bookid } },
        (err, doc) => {
          if (!err) {
            if (doc !== null) {
              return res.send('delete successful');
            } else {
              return res.send('no book exists');
            }
          } else {
            console.error(err);
          }
        }
      );
    });
  
};
