exports.init = function(req, res, next) {
    //res.send('HOME');
    console.log ('palla');
    res.locals.user = req.user;
    res.locals.env = process.env;

    next()

};