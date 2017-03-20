var AccessToken         = require('../../models/AccessToken');
var request             = require("request");
var ManagementClient    = require('auth0').ManagementClient;

exports.refreshAuth0Token = function(req, res, next) {

       var options = { method: 'POST',
            url: 'https://finanzadomani.eu.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: '{"client_id":"gAphuqGF5gjcWBp10nqGieg44cDMtgem","client_secret":"aoZyNFXBpMw9AD4h_C37bZ2fLHKvpBlAD5_It7XSsK22gpGDbUQq9cSM2vp6f2b2","audience":"https://finanzadomani.eu.auth0.com/api/v2/","grant_type":"client_credentials"}' };

            request(options, function (error, response, body) {
              if (error) throw new Error(error);

                let tokenData = JSON.parse(body);

                let query = {servizio: 'authO'}
                let options = { upsert: true, new: true, setDefaultsOnInsert: false };

                    // Find the document
                    AccessToken.findOneAndUpdate(query, tokenData, options, function(error, result) {
                        if (error) throw new Error(error);
                        console.log (result);
                        // do something with the document
                        res.json(result);
                    });

                // AccessToken.update({servizio: 'authO'}, obj, {upsert: true, new: true}, function (err, success) {
                //     console.log(success);
                // });
            });

        //res.redirect(req.session.returnTo || '/user');

    //res.render('admin/categories/index', { title: 'Hey', message: 'Hello ADMIN there!' })
};