var express = require('express');
var router = express.Router();
var __ = require('underscore');


var articoli_controller = require('../controllers/articoliController');

//router.get('/', index_controller.index);


//ARTICOLI
router.get('/:categoriaSlug/:articoloSlug', articoli_controller.vedi);
router.get('/:categoriaSlug', articoli_controller.list);



module.exports = router