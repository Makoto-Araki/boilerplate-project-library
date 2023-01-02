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
  count: Number,
  comments: [String],
});

// Model
const Book = new mongoose.model('Book', bookSchema);

module.exports = function (app) {
  app.route('/api/books')

    // GET - URL/api/books
    .get(function (req, res){
      //response will be array of book objects
      //json res format:
      // [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    // POST - URL/api/books
    .post(function (req, res){
      let title = req.body.title;
      let entry = new Book();
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



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
