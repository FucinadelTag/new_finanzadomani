var Articoli        = require('../models/Articoli');
var Aziende    = require('../models/Aziende');
var ImgixClient     = require('imgix-core-js');

exports.vedi = function(req, res, next) {

    let codice = req.params.aziendaCodice;

    console.log (codice);



    Aziende.
        findOne().
        where('codice').equals(codice).
        exec(function (err, azienda) {
            if (err) return console.error(err);
            console.log (azienda);
            Articoli.
                find({aziende: azienda._id }).
                where('stato').equals('pubblicato').
                populate('categoria').
                limit(50).
                sort('-dataPubblicazione').
                exec(function (err, articoli){
                    if (err) return console.error(err);
                    console.log (articoli);
                    res.render('aziende/vedi', { azienda: azienda, articoli: articoli})
                });
                            //res.render('aziende/vedi', { azienda: azienda})
                });

};
