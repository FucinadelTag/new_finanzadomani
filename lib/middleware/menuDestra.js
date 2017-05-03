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
                                    limit(3).
                                    exec();


    let promiseAppuntamenti = Articoli.
                                    find().
                                    where('stato').equals('pubblicato').
                                    where ('categoria').equals('59098bbee9ecff1494079623').
                                    sort('-dataPubblicazione').
                                    populate('categoria').
                                    limit(1).
                                    exec();

    let arrayPromises = [promiseIdeeDiInvestimento, promiseAppuntamenti];

    Promise.all(arrayPromises).then(values => {

        res.locals.ideeInvestimento = values[0];
        res.locals.appuntamentiSettimana = values[1];

        next()

    });

};