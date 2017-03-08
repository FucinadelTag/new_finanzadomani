var _   = require ('lodash');

exports.manageActiveMenu = function(req, res, next) {

    let path = req.path;

    let arrayRequest = _.split (path, '/', 3);

    const activeMenu = _.last (arrayRequest);

    var arrayMenu = [
        {
            key : 'articoli',
            nome: 'Articoli',
            active: ''
        },
        {
            key : 'categorie',
            nome: 'Categorie',
            active: ''
        }
    ]

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