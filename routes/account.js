var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
const fdtAccountMenu      = require('../lib/middleware/fdtAccountSetMenu.js');

var user_controller = require('../controllers/account/userController');

router.use(fdtAccountMenu.manageActiveMenu);

router.get('/', ensureLoggedIn, function (req, res, next) {
    res.redirect('/account/dati');
});

router.get('/dati', ensureLoggedIn, user_controller.index);
router.post('/dati/edit', ensureLoggedIn, user_controller.edit);

router.get('/pagamento', ensureLoggedIn, user_controller.pagamento);
router.post('/pagamento/pagamentoEdit', ensureLoggedIn, user_controller.pagamentoEdit);
router.post('/pagamento/fatturazioneEdit', ensureLoggedIn, user_controller.fatturazioneEdit);


module.exports = router;