var express = require('express');
var router = express.Router();
var __ = require('underscore');


var aziende_controller = require('../controllers/aziendeController');

//router.get('/', index_controller.index);


//ARTICOLI
router.get('/:aziendaCodice', aziende_controller.vedi);



module.exports = router