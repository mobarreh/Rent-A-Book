const router = require("express").Router();
const { Books, User } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    const dbBooksData = await Books.findAll({
      include: [
        {
          model: Books,
          attributes: ['filename', 'book_name'],
        },
      ],
    });
    const books = dbBooksData.map((books) =>
      books.get({ plain: true })
    );
    res.render("homepage", {
      books,
      loggedIn: req.session.loggedIn,
    });
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/books/:id', withAuth, async (req, res) => {
  try {
    const dbBooksData = await books.findByPk(req.params.id, {
      include: [
        {
          model: Books,
          attributes: [
            'id',
            'book_name',
            'availability',
            'price',
            'filename',
            'user_id',
          ],
        },
      ],
    });
    const books = dbBooksData.get({ plain: true });
    res.render('books', { books, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;