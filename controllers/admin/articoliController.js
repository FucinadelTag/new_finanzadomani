var Articoli        = require('../../models/Articoli');
var PostCategory    = require('../../models/PostCategory');
var ImgixClient     = require('imgix-core-js');
var AWS             = require ('aws-sdk');

AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: 'finanzadomani.immagini'}
});

var _ = require('lodash');


exports.list = function(req, res, next) {

    Articoli.
        find().
        sort('-dataPubblicazione').
        exec(function (err, articoli) {
            if (err) return console.error(err);
            console.log(articoli);

            res.render('admin/articoli/index', { articoli: articoli, expressFlash: req.flash('success')})
    });


};

exports.aggiungi = function(req, res, next) {

    const formData = (req.body);

    let articoloNew = new Articoli({titolo: formData.titolo, stato: 'draft'});

    articoloNew.save(function (err, articolo) {
        if (err) return console.error(err);
        req.flash('success', 'Articolo Creato con successo');
        res.redirect('/admin/articoli');
    });

};

exports.edit = function(req, res, next) {

    const formData = (req.body);
    const id = (req.body._id);

    if (req.files.immagine) {

        var imageData = req.files.immagine;

        const imageDataName = id +'_'+ imageData.name;

        formData.immagine = imageDataName;

        s3.putObject({
            Body: imageData.data,
            Key: imageDataName
        }, function(error, data) {
            if (error) {
                console.log(error);
            } else {
                console.log("success uploading to s3");
            }
        });
    }

    console.log (formData);

    Articoli.findOneAndUpdate({_id: id}, formData, { new: true, upsert: false })
        .exec(function (err, updated) {
            req.flash('success', 'Articolo Aggiornato con successo');
            res.redirect('/admin/articoli/vedi/' + updated._id);
    });



};


exports.vedi = function(req, res, next) {

    let id = req.params.articoloId;



    Articoli.findById(id, function (err, articolo) {
        PostCategory.
            find().
            sort('ordine').
            exec(function (err, categorie) {
                if (err) return console.error(err);
                res.locals.categorie = categorie;
                res.render('admin/articoli/edit', { articolo: articolo, expressFlash: req.flash('success')})
        });


    });
    //res.render('admin/categories/index', { title: 'Hey', message: 'Hello ADMIN there!' })
};