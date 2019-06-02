const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const routes = require('./src/user/user.router');

const app = express(); // create epxress

const PORT = 9000;
app.set('port', PORT); // set app port
app.set('view engine', 'ejs'); // set view engine to ejs
app.use(morgan('dev')); // user morgan for info about requests while dev
app.use(bodyParser.urlencoded({ extended: true })); // parse incoming requests to req.body
app.use(cookieParser()); // use cookie parser
app.use(session({ // init express-session to track cross-session user
    key: 'user_sid',
    secret: 'somerandonstuffs', // should be kept somewhere else
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    },
}));

app.use((req, res, next) => { // clear cookies
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

app.use('/', routes); // attach API router

app.use((req, res) => { // 404 handling
    res.status(404).send('Sorry, no such page!');
});

// START THE APP!
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));

module.exports = app; // for testing
