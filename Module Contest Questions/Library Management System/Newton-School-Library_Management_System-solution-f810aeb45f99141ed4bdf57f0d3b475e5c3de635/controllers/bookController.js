const Book = require('../models/bookModel');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const getBookById = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const addBook = async (req, res) => {
  const { title, author, ISBN, publishedYear, genre, copiesAvailable } =
    req.body;

  try {
    const book = await Book.create({
      title,
      author,
      ISBN,
      publishedYear,
      genre,
      copiesAvailable,
    });

    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const updateInfo = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updateInfo, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res
      .status(200)
      .json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res
      .status(200)
      .json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
