var _   = require ('lodash');
var __ = require('underscore');

exports.manageActiveMenu = function(req, res, next) {

    let path = req.path;

    let arrayRequest = _.split (path, '/', 2);

    const activeMenu = _.last (arrayRequest);

    const arrayMenu = [];

    if (req.user.inGroup('Staff')){

        arrayMenu.push ({
            key : 'articoli',
            nome: 'Articoli',
            active: ''
        });

        arrayMenu.push ({
            key : 'aziende',
            nome: 'Aziende',
            active: ''
        })
    }

    if (req.user.inGroup('Admin')){

        arrayMenu.push ({
            key : 'categorie',
            nome: 'Categorie',
            active: ''
        });
    }

    _.forEach (arrayMenu, function (menu){
        if (menu.key == activeMenu) {
            menu.active = 'active';
        } else {
            menu.active = '';
        }
    });
    res.locals.adminMenu = arrayMenu;

    next()

};
