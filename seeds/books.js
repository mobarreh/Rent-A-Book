const { Books } = require('../models');

const booksData = [
  {
    id: 1,
    book_name: 'Harry Potter and Goblet of Fire',
    availability: true,
    price: 15.0,
    filename: 'harry-potter-1.png',
    user_id: 4,
  },
  {
    id: 2,
    book_name: 'Harry Potter and the Philosphers Stone',
    availability: true,
    price: 10.0,
    filename: 'harry-potter-2.png',
    user_id: 2,
  },
  {
    id: 3,
    book_name: 'Harry Potter and the Prisoner of Azkaban',
    availability: false,
    price: 14.0,
    filename: 'harry-potter-3.png',
    user_id: 1,
  },
  {
    id: 4,
    book_name: 'Harry Potter and the Order of the Phoenix',
    availability: true,
    price: 13.0,
    filename: 'harry-potter-4.png',
    user_id: 5,
  },
  {
    id: 5,
    book_name: 'Harry Potter and the Half-Blood Prince',
    availability: true,
    price: 11.0,
    filename: 'harry-potter-5.png',
    user_id: 3,
  },
];

const seedBooks = () => Books.bulkCreate(booksData);

module.exports = seedBooks;

