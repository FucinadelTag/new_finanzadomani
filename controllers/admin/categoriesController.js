var PostCategory = require('../../models/PostCategory');

var _ = require('lodash');


exports.list = function(req, res, next) {

    PostCategory.
        find().
        sort('ordine').
        exec(function (err, categorie) {
            if (err) return console.error(err);
            console.log(categorie);

            res.render('admin/categories/index', { categorie: categorie, expressFlash: req.flash('success')})
    });


};

exports.edit = function(req, res, next) {

    const formData = (req.body);
    const id = (req.body._id);

    console.log (id);

    delete formData._id;

    if (id == ''){
        console.log ('aggiungo');


        let categoriaNew = new PostCategory(formData);

        categoriaNew.save(function (err, categoria) {
            if (err) return console.error(err);
            req.flash('success', 'Categoria Creata con successo');
            res.redirect('/admin/categorie');
        });

    } else {

        PostCategory.findOneAndUpdate({_id: id}, formData, { new: true, upsert: false })
            .exec(function (err, updated) {
                req.flash('success', 'Categoria Aggiornata con successo');
                res.redirect('/admin/categorie/vedi/' + updated._id);
            });
    }
};


exports.vedi = function(req, res, next) {

    console.log (req.params);

    let id = req.params.categoriaId;

    PostCategory.findById(id, function (err, categoria) {
        console.log (req.categoria);
        res.render('admin/categories/edit', { categoria: categoria, expressFlash: req.flash('success')})

    });



    //res.render('admin/categories/index', { title: 'Hey', message: 'Hello ADMIN there!' })
};