var Articoli    = require('../../models/Articoli');
var __              = require('underscore');

exports.setData = function(req, res, next) {
    //res.send('HOME');

    let promiseIdeeDiInvestimento = Articoli.
                                    find().
                                    where('stato').equals('pubblicato').
                                    where ('categoria').equals('58b96253aac4c971138d321b').
                                    sort('-dataPubblicazione').
                                    populate('categoria').
                                    limit(5).
                                    exec();

    let arrayPromises = [promiseIdeeDiInvestimento];

    Promise.all(arrayPromises).then(values => {

        res.locals.ideeInvestimento = values[0];

        next()

    });

};