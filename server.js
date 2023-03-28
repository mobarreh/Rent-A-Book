//Importing packages
const path = require("path");
const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");

// Initializing sequelize with sessions
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// Cookie session
const sess = {
    secret: "Rent A Book Secret",
    cookie: {
        maxAge: 1800,
        httpOnly: false,
        secure: false,
        sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
    db: sequelize,
    }),
};
app.use(session(sess));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
    console.log(
        `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and Rent A Book!!`)
    );
});