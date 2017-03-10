var Articoli        = require('../models/Articoli');

exports.index = function(req, res, next) {
    //res.send('HOME');


    Articoli.
        find().
        where('stato').equals('pubblicato').
        sort('-dataPubblicazione').
        populate('categoria').
        limit(5).
        exec(function (err, articoli) {
            if (err) return console.error(err);
            console.log (articoli);
            res.render('index', { articoli: articoli})
    });


    //res.render('index', { title: 'Hey', message: 'Hello there!' })
};