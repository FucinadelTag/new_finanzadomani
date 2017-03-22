var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var user_controller = require('../controllers/account/userController');

// Get the user profile
router.get('/', ensureLoggedIn, user_controller.index);
router.post('/edit', ensureLoggedIn, user_controller.edit);

router.get('/pagamento', ensureLoggedIn, user_controller.pagamento);
router.post('/pagamento/edit', ensureLoggedIn, user_controller.pagamentoEdit);


module.exports = router;