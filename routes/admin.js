var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/admin/indexController');

var categorie_controller = require('../controllers/admin/categoriesController');
var articoli_controller = require('../controllers/admin/articoliController');

router.get('/', index_controller.index);

//CATEGORIE
router.get('/categorie', categorie_controller.list);
router.post('/categorie/edit', categorie_controller.edit);
router.get('/categorie/vedi/:categoriaId', categorie_controller.vedi);

//ARTICOLI
router.get('/articoli', articoli_controller.list);
router.post('/articoli/aggiungi', articoli_controller.aggiungi);
router.post('/articoli/edit', articoli_controller.edit);
router.get('/articoli/vedi/:articoloId', articoli_controller.vedi);

module.exports = router