const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');
const nodemailer = require('nodemailer'); 

router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!bookData) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/send", async (req, res) => {
  try {/* 
    const eUse = await User.findOne({
      where: { email: req.session.email },
    }); */
    console.log("fdgfhvhAAAAA", req.session)
    const uEmail = "mjunaid@live.co.uk";   //console.log(uEmail);
    if (!uEmail) {
      res.status(400).json({ message: "user email error" });
      return;
    }
    const output = `
    <p>You rented out a book</p>
    <h3>Rent-A-Book Receipt</h3>
    <ul>
        </ul>
        <h3>Message</h3>
        <p>Thank you for renting this book</p>
      `;
    const transporter = nodemailer.createTransport({ 
      service : "gmail",
      auth: {
        user: "bookrent02@gmail.com", 
        pass: "password999",
      },
    });

    const mailOptions = {
      from: 'bookrent02@gmail.com',
      to: uEmail.email,
      subject: "Rook Receipt",
      text: "Thanks for renting with is!",
      html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: ", info.response);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
