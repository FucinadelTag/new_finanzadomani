var Articoli        = require('../models/Articoli');
var PostCategory    = require('../models/PostCategory');
var ImgixClient     = require('imgix-core-js');

exports.vedi = function(req, res, next) {

    let slug = req.params.articoloSlug;

    console.log (slug);



    Articoli.
        findOne().
        where('slug').equals(slug).
        populate('categoria').
        populate('aziende').
        exec(function (err, articolo) {
            if (err) return console.error(err);
            res.render('articoli/vedi', { articolo: articolo})
    });
    //res.render('admin/categories/index', { title: 'Hey', message: 'Hello ADMIN there!' })
};


exports.list = function(req, res, next) {

    let slugCategoria = req.params.categoriaSlug;

    PostCategory.
        findOne().
        where('slug').equals(slugCategoria).
        exec(function (err, categoriaOk) {
            res.locals.categoriaList = categoriaOk;

            Articoli.
                find().
                where('stato').equals('pubblicato').
                where('categoria').equals(categoriaOk._id).
                populate('categoria').
                populate('aziende').
                sort('-dataPubblicazione').
                exec(function (err, articoli) {
                    if (err) return console.error(err);
                    res.render('articoli/list', { articoli: articoli, categoria: categoriaOk})
            });




    });




};