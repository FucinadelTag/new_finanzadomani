var Articoli        = require('../models/Articoli');
var PostCategory    = require('../models/PostCategory');
var __              = require('underscore');


exports.index = function(req, res, next) {
    //res.send('HOME');


    let PromisesCategoriesInHome = PostCategory.find().where('inhome').equals('si').exec();

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

        let promiseIdeeDiInvestimento = Articoli.
                                        find().
                                        where('stato').equals('pubblicato').
                                        where ('categoria').equals('58b96253aac4c971138d321b').
                                        sort('-dataPubblicazione').
                                        populate('categoria').
                                        limit(10).
                                        exec();

        let arrayPromises = [promiseArticoli, promiseIdeeDiInvestimento];

        Promise.all(arrayPromises).then(values => {

            res.render('index', { articoli: values[0], ideeInvestimento: values[1]})

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