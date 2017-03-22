var FdTUsers  = require('../../models/User');


exports.index = async function(req, res, next) {
    //res.send('HOME');
    let user = await FdTUsers.findOne({_id: '58d05a7c6d607c0e90f7f26e'}).exec();

    console.log (user);

   res.render('account/index', { user: req.user, expressFlash: req.flash('success') });
};

exports.pagamento = function(req, res, next) {
   res.render('account/pagamento', { user: req.user, expressFlash: req.flash('success') });
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