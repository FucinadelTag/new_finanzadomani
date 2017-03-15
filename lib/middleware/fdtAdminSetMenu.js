var _   = require ('lodash');
var __ = require('underscore');

exports.manageActiveMenu = function(req, res, next) {

    let path = req.path;

    let arrayRequest = _.split (path, '/', 3);

    const activeMenu = _.last (arrayRequest);

    const arrayMenu = [];

    let arrayGroups = req.user._json.authorization.groups;

    if (__.contains(arrayGroups, 'Staff')){

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

    if (__.contains(arrayGroups, 'Admin')){

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

    console.log (arrayMenu);

    res.locals.adminMenu = arrayMenu;

    next()

};