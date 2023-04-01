const router = require("express").Router();
const { Books, User } = require("../models");

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

module.exports = router;