var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/admin/indexController');

var categorie_controller = require('../controllers/admin/categoriesController');

router.get('/', index_controller.index);
router.get('/categorie', categorie_controller.list);
router.post('/categorie/aggiungi', categorie_controller.aggiungi);

module.exports = router