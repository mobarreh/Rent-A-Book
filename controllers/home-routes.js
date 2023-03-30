const router = require("express").Router();
const { Books, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const dbBooksData = await Books.findAll({});
    const books = dbBooksData.map((books) =>
      books.get({ plain: true })
    );
    res.render("home", {
      books,
    });
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;