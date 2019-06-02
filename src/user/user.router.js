/* eslint-disable no-underscore-dangle */

const express = require('express');
const userService = require('./user.service');
const weather = require('./../helpers/weather');

const router = express.Router();

const sessionChecker = (req, res, next) => { // check is user is logged in
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/userpanel');
    } else {
        next();
    }
};

function home(req, res) {
    res.redirect('/login');
}

function signup(req, res) {
    res.clearCookie('user_sid');
    res.render('signup');
}

function createUser(req, res) {
    console.log('req');
    console.log(req.body);
    userService.create(req.body)
        .then((user) => {
            req.session.user = user;
            res.redirect('/userpanel');
        })
        .catch((err) => {
            console.log('CATCH');
            console.log(err);
            res.redirect('/signup');
        });
}

function auth(req, res, next) { 
    userService.authenticate(req).then((user) => {
        if (!user) {
            res.redirect('/login?message=Wrong login or password');
        } else {
            req.session.user = user.userWithoutPass;
            res.redirect('/userpanel');
        }
    }).catch(err => next(err));
}

function login(req, res) {
    res.render('login', { message: req.query.message });
}

function userpanel(req, res) {
    if (req.session.user && req.cookies.user_sid) {
        userService.getCities(req.session.user._id).then((cityList) => {
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
}
function handleCities(req, res) {
    if (req.session.user && req.cookies.user_sid) {
        if (req.body.cityToAdd) {
            weather.getWeatherForCity(req.body.cityToAdd).then((cityResp) => {
                if ((JSON.parse(cityResp.body)).cod === '200') {
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
    } else {
        res.redirect('/login');
    }
}

function logout(req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
}

function deleteUser(req, res) {
    if (req.session.user && req.cookies.user_sid) {
        userService.deleteUser(req.session.user._id);
        res.clearCookie('user_sid');
        res.redirect('/signup');
    } else {
        res.redirect('/signup');
    }
}

router.get('/signup', signup);
router.post('/signup', createUser);
router.get('/', sessionChecker, home);
router.get('/login', sessionChecker, login);
router.post('/login', auth);
router.get('/userpanel', userpanel);
router.post('/userpanel', handleCities);
router.get('/logout', logout);
router.get('/delete', deleteUser);

module.exports = router;
