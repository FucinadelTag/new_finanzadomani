var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var __ = require('underscore');


var index_controller = require('../controllers/admin/indexController');

var categorie_controller = require('../controllers/admin/categoriesController');
var articoli_controller = require('../controllers/admin/articoliController');
var aziende_controller = require('../controllers/admin/aziendeController');

const fdtAdminMenu      = require('../lib/middleware/fdtAdminSetMenu.js');
const uploadImageS3     = require('../lib/middleware/uploadImageS3.js');

router.use(ensureLoggedIn);

router.use(function (req, res, next) {

        console.log (req.session)

        let arrayGroups = req.user._json.authorization.groups;

        console.log (req.user._json.authorization);

        if (__.contains(arrayGroups, 'Staff')){

            next()
        } else {
             res.status(403).send('Non sei autorizzato ad accedere a questa zona del sito')
        }

})

//FdTMiddelware
router.use(fdtAdminMenu.manageActiveMenu);
router.use(uploadImageS3.uploadImageS3);





router.get('/', index_controller.index);


//AZIENDE
router.get('/aziende', aziende_controller.list);
router.post('/aziende/edit', aziende_controller.edit);
router.get('/aziende/vedi/:aziendaId', aziende_controller.vedi);

//CATEGORIE
router.get('/categorie', categorie_controller.list);
router.post('/categorie/edit', categorie_controller.edit);
router.get('/categorie/vedi/:categoriaId', categorie_controller.vedi);

//ARTICOLI
router.get('/articoli', articoli_controller.list);
router.get('/articoli/table', articoli_controller.table);
router.post('/articoli/aggiungi', articoli_controller.aggiungi);
router.post('/articoli/edit', articoli_controller.edit);
router.get('/articoli/vedi/:articoloId', articoli_controller.vedi);
router.post('/articoli/paragrafi/edit', articoli_controller.paragrafiEdit);
router.get('/articoli/paragrafi/delete/:articoloId/:paragrafoId', articoli_controller.paragrafiDelete);



module.exports = router