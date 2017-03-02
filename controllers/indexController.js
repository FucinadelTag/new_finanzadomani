exports.index = function(req, res, next) {
    //res.send('HOME');
    res.render('index', { title: 'Hey', message: 'Hello there!' })
};