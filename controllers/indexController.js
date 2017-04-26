var Articoli        = require('../models/Articoli');
var PostCategory    = require('../models/PostCategory');
var __              = require('underscore');


exports.index = function(req, res, next) {
    //res.send('HOME');


    let PromisesCategoriesInHome = PostCategory.find().where('inhome').equals('si').sort('ordine').exec();

    PromisesCategoriesInHome.then (function(categorie) {

        const arrayIdCategorie = __.pluck(categorie, '_id');

        let promiseArticoli =   Articoli.
                                find().
                                where('stato').equals('pubblicato').
                                where ('categoria').in(arrayIdCategorie).
                                sort('-dataPubblicazione').
                                populate('categoria').
                                limit(10).
                                exec();


        var arrayPromises = [promiseArticoli];

        __.each (categorie, function (categoria){
            let promiseCategoria =  Articoli.
                                    find().
                                    where('categoria').equals(categoria._id).
                                    where('stato').equals('pubblicato').
                                    sort('-dataPubblicazione').
                                    populate('categoria').
                                    limit(10).
                                    exec();

            arrayPromises.push (promiseCategoria);
        });

        console.log (arrayPromises);

        Promise.all(arrayPromises).then(values => {
            res.render('index', { articoli: values[0], news: values[1], analisi_tecnica: values[2], pillole: values[3]})

        });


        // Articoli.
        //     find().
        //     where('stato').equals('pubblicato').
        //     where ('categoria').in(arrayIdCategorie).
        //     sort('-dataPubblicazione').
        //     populate('categoria').
        //     limit(10).
        //     exec(function (err, articoli) {
        //         if (err) return console.error(err);
        //         res.render('index', { articoli: articoli})
        // });

    });




    //res.render('index', { title: 'Hey', message: 'Hello there!' })
};