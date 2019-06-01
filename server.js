const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const app = express(); // create epxress

const PORT = 9000;
app.set('port', PORT); // set app port
app.set('view engine', 'ejs'); // set view engine to ejs
app.use(morgan('dev')); // user morgan for info about requests while dev
app.use(bodyParser.urlencoded({ extended: true })); // parse incoming requests to req.body
app.use(cookieParser()); // use cookie parser
app.use(session({ // init express-session to track cross-session user
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    },
}));
app.use('/', require('./src/user/user.router'));

// This middleware will check if user's cookie is still saved in browser and user is not set,
// then automatically log the user out.
// This usually happens when you stop your express server after login,
// your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

// const sessionChecker = (req, res, next) => { // check is user is logged in
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/userpanel');
//     } else {
//         next();
//     }
// };

// app.get('/', sessionChecker, (req, res) => { // homepage
//     res.redirect('/login');
// });

// app.route('/signup') // signup route
//     .get((req, res) => {
//         res.clearCookie('user_sid');
//         res.render('signup');
//     })
//     .post((req, res) => {
//         userService.create(req.body)
//             .then((user) => {
//                 req.session.user = user;
//                 res.redirect('/userpanel');
//             })
//             .catch((error) => {
//                 console.log(error);
//                 res.redirect('/signup');
//             });
//     });

/* app.route('/login') // log in route
    .get(sessionChecker, (req, res) => {
        // console.log(req.query);
        res.render('login', { message: req.query.message });
    }); */
   /* .post((req, res) => {
      //  const { username } = req.body;
       // const { password } = req.body;
        userService.authenticate(req{ username, password }).then((user) => {
            if (!user) {
                res.redirect('/login?message=Wrong login or password');
            } else {
                req.session.user = user.userWithoutPass;
                res.redirect('/userpanel');
            }
        });
    }); */

/* app.route('/userpanel') // user panel route and logic
    .get((req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            // console.log(req.session.user);
            userService.getCities(req.session.user._id).then((cityList) => {
                // console.log('cityList');
                // console.log(cityList);
                (weather.getWeatherForCities(cityList))
                    .then((response) => {
                        const forecast = weather.parseWeatherResponse(response);
                        res.render('userpanel', {
                            cities: cityList,
                            fore: forecast,
                            user: req.session.user.username,
                            message: req.query.message,
                        });
                    });
            });
        } else {
            res.redirect('/login');
        }
    }); */
   /* .post((req, res) => { // add and delete city logic
        if (req.session.user && req.cookies.user_sid) {
            //  console.log('REQQQ BODY');
            // console.log(req.body);
            if (req.body.cityToAdd) {
                weather.getWeatherForCity(req.body.cityToAdd).then((cityResp) => {
                    //  console.log(JSON.parse(cityResp.body));
                    if ((JSON.parse(cityResp.body)).cod === '200') {
                        console.log('if');
                        userService.addCity(req.session.user._id, req.body.cityToAdd).then(() => {
                            res.redirect('/userpanel');
                        });
                    } else {
                        res.redirect('/userpanel?message=City not found');
                    }
                });
            }
            if (req.body.cityToDelete) {
                userService.deleteCity(req.session.user._id, req.body.cityToDelete).then(() => {
                    res.redirect('/userpanel');
                });
            }
            // res.redirect('/userpanel');
        } else {
            res.redirect('/login');
        }
    }); */

// app.get('/logout', (req, res) => { // route for logout
//     if (req.session.user && req.cookies.user_sid) {
//         res.clearCookie('user_sid');
//         res.redirect('/');
//     } else {
//         res.redirect('/login');
//     }
// });

// app.get('/delete', (req, res) => {
//     if (req.session.user && req.cookies.user_sid) {
//         userService.delete(req.session.user._id);
//         res.clearCookie('user_sid');
//         res.redirect('/signup');
//     } else {
//         res.redirect('/signup');
//     }
// });

app.use((req, res) => { // 404 handling
    res.status(404).send('Sorry, no such page!');
});

// START THE APP!
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
