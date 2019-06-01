const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const weather = require('./helpers/weather');
// var User = require('./models/user');
const userService = require('./user/user.service');

// invoke an instance of express application.
const app = express();

const PORT = 9000;


app.set('port', PORT); //set app port
app.set('view engine', 'ejs'); //set view engine to ejs
app.use(morgan('dev')); // user morgan for info about requests while dev
app.use(bodyParser.urlencoded({ extended: true })); // parse incoming requests to req.body
app.use(cookieParser()); // use cookie parser
app.use(session({ //init express-session to track cross-session user
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    },
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

const sessionChecker = (req, res, next) => { //check is user is logged in
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/userpanel');
    } else {
        next();
    }
};

app.get('/', sessionChecker, (req, res) => { // homepage
    res.redirect('/login');
});

app.route('/signup') // signup route
    .get(sessionChecker, (req, res) => {
        res.render('signup');
    })
    .post((req, res) => {
        userService.create(req.body)
            .then((user) => {
                req.session.user = user;
                res.redirect('/userpanel');
            })
            .catch((error) => {
                console.log(error);
                res.redirect('/signup');
            });
    });

app.route('/login') //log in route
    .get(sessionChecker, (req, res) => {
        res.render('login');
    })
    .post((req, res, error) => {
        const { username } = req.body;
        const { password } = req.body;
        userService.authenticate({ username, password }).then((user) => {
            if (!user) {
                res.redirect('/login');
            } else {
                req.session.user = user.userWithoutPass;
                res.redirect('/userpanel');
                userId = req.session.user.id;
            }

        });
    });

app.route('/userpanel') // user panel route and logic
    .get((req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            userService.getCities(req.session.user._id)
                .then((cityList) => {
                    console.log(cityList);
                    (weather.getWeatherForCities(cityList))
                        .then((response, body) => {
                            // console.log(body);
                            console.log('response.body');
                            console.log(response.length);
                            console.log(response[0].body);
                            res.render('userpanel', { cities: cityList });
                            userId = req.session.user.id;
                        });
                });
        } else {
            res.redirect('/login');
        }
    })
    .post((req, res) => { // add and delete city logic
        if (req.session.user && req.cookies.user_sid) {
            if (req.body.cityToAdd) {
                userService.addCity(req.session.user._id, req.body.cityToAdd);
            }
            if (req.body.cityToDelete) {
                userService.deleteCity(req.session.user._id, req.body.cityToDelete);
            }
            res.redirect('/userpanel');
        } else {
            res.redirect('/login');
        }
    });

app.get('/logout', (req, res) => { // route for logout
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.get('/delete', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        userService.delete(req.session.user._id);
        res.clearCookie('user_sid');
        res.redirect('/signup');
    } else {
        res.redirect('/signup');
    }
});

app.use((req, res, next) => {  // 404 handling
    res.status(404).send("Sorry can't find that!");
});

// START THE APP!
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
