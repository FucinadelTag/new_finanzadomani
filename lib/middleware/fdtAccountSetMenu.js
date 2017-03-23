var _   = require ('lodash');
var __ = require('underscore');

exports.manageActiveMenu = function(req, res, next) {

    let path = req.path;

    let arrayRequest = _.split (path, '/', 2);

    const activeMenu = _.last (arrayRequest);

    const arrayMenu = [];

        arrayMenu.push ({
            key : 'dati',
            nome: '<i class="user icon"></i> I tuoi dati personali',
            active: ''
        });

        arrayMenu.push ({
            key : 'abbonamento',
            nome: '<i class="newspaper icon"></i> Abbonamento',
            active: ''
        })

        arrayMenu.push ({
            key : 'pagamento',
            nome: '<i class="credit card alternative icon"></i> Fatturazione e pagamento',
            active: ''
        })


    _.forEach (arrayMenu, function (menu){
        if (menu.key == activeMenu) {
            menu.active = 'active';
        } else {
            menu.active = '';
        }
    });
    res.locals.accountMenu = arrayMenu;

    next()

};