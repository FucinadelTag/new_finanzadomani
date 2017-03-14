var Aziende = require('../../models/Aziende');

var _ = require('lodash');


exports.list = function(req, res, next) {

    Aziende.
        find().
        sort('titolo').
        exec(function (err, aziende) {
            if (err) return console.error(err);
            res.render('admin/aziende/index', { aziende: aziende, expressFlash: req.flash('success')})
    });


};

exports.edit = function(req, res, next) {

    const formData = (req.body);
    const id = (req.body._id);

    console.log (id);

    delete formData._id;

    if (id == ''){
        console.log ('aggiungo');


        let aziendaNew = new Aziende(formData);

        aziendaNew.save(function (err, categoria) {
            if (err) return console.error(err);
            req.flash('success', 'Azienda Creata con successo');
            res.redirect('/admin/aziende');
        });

    } else {

        Aziende.findOneAndUpdate({_id: id}, formData, { new: true, upsert: false })
            .exec(function (err, updated) {
                req.flash('success', 'Azienda Aggiornata con successo');
                res.redirect('/admin/aziende/vedi/' + updated._id);
            });
    }
};


exports.vedi = function(req, res, next) {

    console.log (req.params);

    let id = req.params.aziendaId;

    Aziende.findById(id, function (err, azienda) {
        console.log (req.categoria);
        res.render('admin/aziende/edit', { azienda: azienda, expressFlash: req.flash('success')})

    });



    //res.render('admin/categories/index', { title: 'Hey', message: 'Hello ADMIN there!' })
};