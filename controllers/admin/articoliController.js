var Articoli        = require('../../models/Articoli');
var PostCategory    = require('../../models/PostCategory');
var Aziende         = require('../../models/Aziende');
var ImgixClient     = require('imgix-core-js');
var AWS             = require ('aws-sdk');
var _               = require('lodash');
var Promise         = require('bluebird');

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

            res.render('admin/articoli/index', { articoli: articoli, expressFlash: req.flash('success')})
    });


};

exports.table = function(req, res, next) {

    let order = req.query.order[0];
    let orderColumn = req.query.columns[order.column].data;
    let orderDir = order.dir;

    const sortObject = {};
    sortObject[orderColumn] = orderDir

    Articoli.dataTables({
        limit: req.query.length,
        skip: req.query.start,
        search: {
          value: req.query.search.value,
          fields: ['titolo', 'stato', 'abstract', 'consiglio']
        },
        sort: sortObject
    }).then(function (table) {
        //console.log (table);
        table.recordsFiltered = table.recordsTotal
        res.json(table); // table.total, table.data
    })

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

    console.log (formData);

    if (_.isEmpty(req.body.aziende)) {
         formData.aziende = null;
    } else {
        formData.aziende = _.split (formData.aziende, ',');
    }

    if (_.isEmpty(req.body.categoria)) {
        delete formData.categoria;
    }

    delete formData._id;
    console.log (formData);



    Articoli.findOneAndUpdate({_id: id}, formData, { new: true, upsert: false })
        .exec(function (err, updated) {
            req.flash('success', 'Articolo Aggiornato con successo');
            res.redirect('/admin/articoli/vedi/' + updated._id);
    });



};


exports.vedi = function(req, res, next) {

    let id = req.params.articoloId;

    let promiseArticoli =   Articoli.
                            findOne().
                            where('_id').equals(id).
                            populate('categoria').
                            exec();

    let promiseCategory =   PostCategory.
                            find().
                            sort('ordine').
                            exec();

    let promiseAzienda =    Aziende.
                            find().
                            sort('titolo').
                            exec();

    let arrayPromises = [promiseArticoli, promiseCategory, promiseAzienda];

    Promise.all(arrayPromises).then(values => {

        res.render('admin/articoli/edit', { articolo: values[0], categorieOk: values[1], aziendeOk: values[2],  expressFlash: req.flash('success')})

    });
};

exports.paragrafiDelete = function(req, res, next) {

    let articoloId = req.params.articoloId;
    const paragrafoId = req.params.paragrafoId;


    Articoli.findById(articoloId, function (err, articolo) {
        let paragrafo = articolo.paragrafi.id(paragrafoId).remove();
        articolo.save(function (err) {
            if (err) console.log(err);
            req.flash('success', 'Paragrafo eliminato con successo');
            res.redirect('/admin/articoli/vedi/' + articoloId + '#/paragrafi');
        });

    });
    //res.render('admin/categories/index', { title: 'Hey', message: 'Hello ADMIN there!' })
};

exports.paragrafiEdit = function(req, res, next) {

    const formData = (req.body);
    const articoloId = formData.articoloId;
    const paragrafoId = (formData._id);

    delete formData._id;
    delete formData.articoloId;

    Articoli.findById(articoloId, function (err, articolo) {

        if (paragrafoId != ''){
            let paragrafo = articolo.paragrafi.id(paragrafoId);

            paragrafo.set (formData);
        } else {
            articolo.paragrafi.push(formData);
        }

        paragrafiSorted = _.sortBy (articolo.paragrafi, ['ordine']);

        articolo.paragrafi = paragrafiSorted;

        articolo.save(function (err) {
            if (err) return console.error(err);
            req.flash('success', 'Paragrafo salvato con successo');
            res.redirect('/admin/articoli/vedi/' + articoloId + '#/paragrafi');
        });

    });

};