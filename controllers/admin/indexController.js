exports.index = function(req, res, next) {
    //res.send('HOME');
    res.render('admin/index', { title: 'Hey', message: 'Hello ADMIN there!' })
};