var FdTUsers  = require('../../models/User');


exports.index = function(req, res, next) {
    //res.send('HOME');
   res.render('account/index', { user: req.user, expressFlash: req.flash('success') });
};


exports.edit = function(req, res, next) {

    const formData = (req.body);
    const id = (req.body._id);

    FdTUsers.findOneAndUpdate({_id: id}, formData, { new: true, upsert: false })
        .exec(function (err, updated) {
            req.flash('success', 'Dati Aggiornati con successo');
            res.redirect('/account');
    });



};