var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var userObject = require('../lib/userObject');

var menuDestra  = require('../lib/middleware/menuDestra.js');

var index_controller = require('../controllers/indexController');

router.use(menuDestra.setData);

router.get('/', index_controller.index);

router.get('/login',
  function(req, res){
    res.render('login', { env: process.env });
  });

// Perform session logout and redirect to homepage
router.get('/logout', function(req, res){
    req.logout();
    res.redirect(req.session.returnTo || '/user');
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {

    res.redirect(req.session.returnTo || '/user');
  });

module.exports = router