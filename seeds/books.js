const { books } = require('../models');

const booksData = [
{
    title: '',
    author: '',
    issue_date: '',
    book_id: 1,
    bookname: '',
    description:
      '',
  },
  {
    title: '',
    artist: '',
    issue_date: '',
    book_id: 2,
    bookname: '',
    description: '',
  },
  {
    title: '',
    author: '',
    issue_date: '',
    book_id: 3,
    bookname: '',
    description: '',
  },
  {
    title: '',
    author: '',
    issue_date: '',
    book_id: 4,
    bookname: '',
    description: '',
  },
  {
    title: '',
    author: '',
    issue_date: '',
    book_id: 5,
    bookname: '',
    description: '',
  },
  {
    title: '',
    author: '',
    issue_date: '',
    book_id: 6,
    bookname: '',
    description:
      '',
  },
  {
    title: '',
    author: '',
    issue_date: '',
    book_id: 7,
    bookname: '',
    description:
      '',
  },
  {
    title: '',
    author: '',
    issue_date: '',
    book_id: 8,
    bookname: '',
    description:
      '',
  },
  {
    title: '',
    author: '',
    issue_date: '',
    book_id: 9,
    bookname: '',
    description:
      '',
  },
];

const seedBooks = () => Books.bulkCreate(booksdata);

module.exports = seedBooks;

