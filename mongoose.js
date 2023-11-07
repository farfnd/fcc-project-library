let mongoose = require('mongoose');
const myUri = process.env['MONGO_URI'];

mongoose.connect(myUri, { useNewUrlParser: true, useUnifiedTopology: true });

let bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  comments: [String]
}, {
  versionKey: false
})

const Book = mongoose.model('Book', bookSchema);

const getBooks = (done) => {
  Book
    .find({})
    .then(data => {
      data = data.map(book => ({
        title: book.title,
        _id: book._id,
        commentcount: book.comments.length
      }));
      done(data);
    })
    .catch(error => console.log(error));
};

const getBook = (id, done) => {
  Book
    .findById(id)
    .then(data => {
      if (!data) {
        done("no book exists");
      } else {
        done(null, data);
      }
    })
    .catch(error => {
      console.log(error);
      done("no book exists");
    });
};

const addBook = (title, done) => {
  Book
    .create({ title })
    .then(data => done(data))
    .catch(error => console.log(error));
};


const addComment = (id, comment, done) => {
  Book
    .findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      { new: true }
    )
    .then(data => {
      if (data === null) {
        done("no book exists");
      } else {
        done(null, data);
      }
    })
    .catch(error => {
      console.log(error);
      done("no book exists");
    });
}

const deleteBooks = (done) => {
  Book
    .deleteMany()
    .then(data => done(data))
    .catch(error => console.log(error));
};

const deleteBook = (id, done) => {
  Book
    .findOneAndDelete({ _id: id })
    .then(data => {
      if (data === null) {
        done("no book exists");
      } else {
        done(null, data);
      }
    })
    .catch(error => {
      console.log(error);
      done("no book exists");
    });
};


exports.getBooks = getBooks;
exports.getBook = getBook;
exports.addBook = addBook;
exports.addComment = addComment;
exports.deleteBooks = deleteBooks;
exports.deleteBook = deleteBook;