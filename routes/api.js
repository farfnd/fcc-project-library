/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const { getBooks, getBook, addBook, addComment, deleteBooks, deleteBook } = require('../mongoose.js');

module.exports = function(app) {

  app.route('/api/books')
    .get(function(req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      getBooks(data => res.json(data));
    })

    .post(function(req, res) {
      let title = req.body.title;
      if (!title) res.send("missing required field title");

      //response will contain new book object including atleast _id and title
      addBook(title, data => res.json(data));
    })

    .delete(function(req, res) {
      //if successful response will be 'complete delete successful'
      deleteBooks(data => res.send("complete delete successful"));
    });



  app.route('/api/books/:id')
    //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    .get(function(req, res) {
      let bookid = req.params.id;
      getBook(bookid, (err, data) => {
        if (err) return res.send(err);
        res.json(data);
      });
    })

    .post(function(req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) return res.send("missing required field comment");

      //json res format same as .get
      addComment(bookid, comment, (err, data) => {
        if (err) return res.send(err);
        res.json(data);
      });
    })

    .delete(function(req, res) {
      let bookid = req.params.id;
      deleteBook(bookid, (err, data) => {
        if (err) return res.send(err);
        //if successful response will be 'delete successful'
        res.send("delete successful");
      });
    });

};
