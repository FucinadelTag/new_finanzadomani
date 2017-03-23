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
            res.redirect('/account/dati');
    });



};

exports.pagamento = function(req, res, next) {

    req.user.getDatiCartaCredito ();
   res.render('account/pagamento', { user: req.user, expressFlash: req.flash('success') });
};


exports.pagamentoEdit = async function(req, res, next) {

    const formData = (req.body);
    const id = formData._id;


    let userOk = await FdTUsers.findOneAndUpdate({_id: id}, {nome_carta: formData.nome_carta, stripeToken: formData.stripeToken}, { new: true, upsert: false }).exec();

    let userUpdated = await req.user.updateStripeUserCreditCard(userOk);

    req.flash('success', 'Carta di credito aggiornata con successo');
    res.redirect('/account/pagamento');

};


exports.fatturazioneEdit = function(req, res, next) {

    const formData = (req.body);
    const id = formData._id;


    let indirizzo_fatturazione = {
        ragionesociale: formData.ragionesociale,
        codicefiscale_iva: formData.codicefiscale_iva,
        address_line1: formData.address_line1,
        address_city: formData.address_city,
        address_state: formData.address_state,
        address_zip: formData.address_zip
    }


    FdTUsers.findOneAndUpdate({_id: id}, {indirizzo_fatturazione: indirizzo_fatturazione}, { new: true, upsert: false })
        .exec(function (err, updated) {

            req.flash('success', 'Dati di Fatturazione Aggiornati con successo');
            res.redirect('/account/pagamento');
    });

};