var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();


var index_controller = require('../controllers/admin/indexController');

var categorie_controller = require('../controllers/admin/categoriesController');
var articoli_controller = require('../controllers/admin/articoliController');

router.get('/', index_controller.index);

//CATEGORIE
router.get('/categorie', ensureLoggedIn, categorie_controller.list);
router.post('/categorie/edit', ensureLoggedIn, categorie_controller.edit);
router.get('/categorie/vedi/:categoriaId', ensureLoggedIn, categorie_controller.vedi);

//ARTICOLI
router.get('/articoli', ensureLoggedIn, articoli_controller.list);
router.post('/articoli/aggiungi', ensureLoggedIn, articoli_controller.aggiungi);
router.post('/articoli/edit', ensureLoggedIn, articoli_controller.edit);
router.get('/articoli/vedi/:articoloId', ensureLoggedIn, articoli_controller.vedi);
router.post('/articoli/paragrafi/edit', ensureLoggedIn, articoli_controller.paragrafiEdit);
router.get('/articoli/paragrafi/delete/:articoloId/:paragrafoId', ensureLoggedIn, articoli_controller.paragrafiDelete);

module.exports = router