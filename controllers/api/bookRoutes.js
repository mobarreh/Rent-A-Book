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
  try {
      const output = `
      <html>
      <body>
      <p>You rented out a book</p>
      <h3>Rent-A-Book Receipt</h3>
      <ul>
          </ul>
          <h3>Message</h3>
          <p>Thank you for renting ${req.body.name}</p>
          <p><strong>Price: ${req.body.price}</strong></p>
          <p><strong>Description</strong></p>
          <p><strong>${req.body.description}</strong></p>
          </body>
          </html>
        `;
      const transporter = nodemailer.createTransport({ 
        service : "gmail",
        auth: {
          type: 'OAuth2',
          user: "bookrent21@gmail.com", 
          pass: "Password999@",
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        },
      });
  
      const mailOptions = {
        from: 'bookrent21@gmail.com',
        to: 'mohamedbarreh8@gmail.com',
        subject: "Rook Receipt",
        html: output,
      };
  
      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });
      return;
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
