var PostCategory = require('../../models/PostCategory');


exports.list = function(req, res, next) {

    PostCategory.find(function (err, categorie) {
      if (err) return console.error(err);
      console.log(categorie);

      res.render('admin/categories/index', { categorie: categorie})
    })


};

exports.aggiungi = function(req, res, next) {

    var categoria = new PostCategory(req.body);

    console.log (categoria);

    res.redirect('/admin/categorie');

    //res.render('admin/categories/index', { title: 'Hey', message: 'Hello ADMIN there!' })
};


exports.edit = function(req, res, next) {

    console.log (req.params);

    let id = req.params.categoriaId;

    PostCategory.findById(id, function (err, categoria) {
        console.log (req.categoria);
        res.render('admin/categories/edit', { categoria: categoria})

    });



    //res.render('admin/categories/index', { title: 'Hey', message: 'Hello ADMIN there!' })
};