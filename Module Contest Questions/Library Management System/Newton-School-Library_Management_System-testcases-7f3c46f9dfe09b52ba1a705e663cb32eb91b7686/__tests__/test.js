const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../src/app');
const Book = require('../models/bookModel');

chai.use(chaiHttp);
const expect = chai.expect;

const prodURI = 'mongodb://mongoService:27017/document';

describe('Book Controller', () => {
  before(async () => {
    await mongoose.connect(prodURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB');

    const initialBook = [
      {
        title: 'Test Book',
        author: 'Test Author',
        ISBN: '1234567890',
        publishedYear: 2021,
        genre: 'Test Genre',
        copiesAvailable: 10,
      },
    ];

    await Book.deleteMany({});
    await Book.insertMany(initialBook);
  });

  it('should return all books', async () => {
    const res = await chai.request(app).get('/api/v1/');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
  });

  it('should return a single book by ID', async () => {
    const newBook = {
      title: 'New Test Book',
      author: 'New Test Author',
      ISBN: '9876543210',
      publishedYear: 2022,
      genre: 'New Test Genre',
      copiesAvailable: 5,
    };

    const createRes = await chai.request(app).post('/api/v1/').send(newBook);
    expect(createRes).to.have.status(201);

    const res = await chai
      .request(app)
      .get(`/api/v1/${createRes.body.book._id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.title).to.equal(newBook.title);
  });

  it('should add a new book', async () => {
    const newBook = {
      title: 'New Test Book',
      author: 'New Test Author',
      ISBN: '9876543200',
      publishedYear: 2022,
      genre: 'New Test Genre',
      copiesAvailable: 5,
    };
    const res = await chai.request(app).post('/api/v1/').send(newBook);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message', 'Book added successfully');
    expect(res.body.book).to.have.property('title', newBook.title);
  });

  it('should update an existing book', async () => {
    const book = await Book.findOne({});
    const updatedBookData = {
      title: 'Updated Test Book',
      copiesAvailable: 20,
    };
    const res = await chai
      .request(app)
      .put(`/api/v1/${book._id}`)
      .send(updatedBookData);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Book updated successfully');
    expect(res.body.book).to.have.property('title', updatedBookData.title);
    expect(res.body.book).to.have.property(
      'copiesAvailable',
      updatedBookData.copiesAvailable
    );
  });

  it('should delete an existing book', async () => {
    const book = await Book.findOne({});
    const res = await chai.request(app).delete(`/api/v1/${book._id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Book deleted successfully');
    expect(res.body.book).to.have.property('title', book.title);
  });

  after(async () => {
    await Book.deleteMany({});
  });
});
