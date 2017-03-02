var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/admin/indexController');

var categorie_controller = require('../controllers/admin/categoriesController');

router.get('/', index_controller.index);
router.get('/categorie', categorie_controller.list);
router.post('/categorie/aggiungi', categorie_controller.aggiungi);
router.get('/categorie/edit/:categoriaId', categorie_controller.edit);

module.exports = router