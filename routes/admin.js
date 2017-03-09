var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var __ = require('underscore');


var index_controller = require('../controllers/admin/indexController');

var categorie_controller = require('../controllers/admin/categoriesController');
var articoli_controller = require('../controllers/admin/articoliController');

router.use(ensureLoggedIn);

router.use(function (req, res, next) {

        console.log (req.session)

        let arrayRoles = req.user._json.authorization.roles;

        if (__.contains(arrayRoles, 'Admin')){
            console.log (req.user._json.authorization);
            next()
        } else {
             res.status(403).send('Non sei autorizzato ad accedere a questa zona del sito')
        }

})

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
router.post('/articoli/paragrafi/edit', articoli_controller.paragrafiEdit);
router.get('/articoli/paragrafi/delete/:articoloId/:paragrafoId', articoli_controller.paragrafiDelete);



module.exports = router