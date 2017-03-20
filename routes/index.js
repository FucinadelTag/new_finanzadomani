var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var userObject = require('../lib/userObject');


var menuDestra  = require('../lib/middleware/menuDestra.js');

var index_controller = require('../controllers/indexController');

router.use(menuDestra.setData);

router.get('/', index_controller.index);

router.get('/login',
  function(req, res){
    res.render('login', { env: process.env });
  });

// Perform session logout and redirect to homepage
router.get('/logout', function(req, res){
    req.logout();
    res.redirect(req.session.returnTo || '/user');
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {

  //   var management = new ManagementClient({
  //       token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik16ZEdRalJFT1RBNU0wVTJSRGczUVRaQk4wRXhNekV3T1RKQlFqSTFNRVF3TTBGRk5VTXhOdyJ9.eyJpc3MiOiJodHRwczovL2ZpbmFuemFkb21hbmkuZXUuYXV0aDAuY29tLyIsInN1YiI6ImdBcGh1cUdGNWdqY1dCcDEwbnFHaWVnNDRjRE10Z2VtQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2ZpbmFuemFkb21hbmkuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJleHAiOjE1MjE1MzEyOTksImlhdCI6MTQ4OTk5NTI5OSwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMifQ.QulK6KYC-HLYfjYINdGA_XEOx9FPw4rBvdleJsZNtlQ3hfmTjQXtnw6atxxGeYHlmv3McVFAPviH_2BsDzQv0DOWrVd4maLk6J0-EFKn97uJAYGhjzgMKD2hkXj_9lvfxRH5v_-VTHmGmpw8GPf__orNp2KyuD8UW0AxUW0klmbUPRyWRWBijfRbP-u_BJkPZGhXLUYi366EzD0YZSU3D2hSWUB_WYVsxpooiPvqYxMPHwzhxyzQRbrX2z9aY3Uc4gS3icJhoHN4mmwv5oo0mAaDpdLs5SSWA2p4VjhlWCKiUvyKwSxNg6j4jJN_PZYkuG8mZnn3CkY0kmqMZ8vquw',
  //       domain: 'finanzadomani.eu.auth0.com'
  //   });

  //   management
  // .getUser({ id: 'google-oauth2|114106367821020684959' })
  // .then(function (user) {
  //   console.log(user);
  // })
  // .catch(function (err) {
  //   console.log(err);
  // });

  //   var metadata = {
  //       prova: 'PPPP'
  //   };

  // management.updateUserMetadata ({ id: 'google-oauth2|114106367821020684959' }, metadata)
  //  .then(function (user) {
  //   console.log(user);
  //       management
  //         .getUser({ id: 'google-oauth2|114106367821020684959' })
  //         .then(function (user) {
  //           console.log ('dopoAggiornamento:');
  //           console.log(user);
  //         })
  //         .catch(function (err) {
  //           console.log(err);
  //         });
  // })
  // .catch(function (err) {
  //   console.log(err);
  // });

  //   var options = { method: 'POST',
  //       url: 'https://finanzadomani.eu.auth0.com/oauth/token',
  //       headers: { 'content-type': 'application/json' },
  //       body: '{"client_id":"gAphuqGF5gjcWBp10nqGieg44cDMtgem","client_secret":"aoZyNFXBpMw9AD4h_C37bZ2fLHKvpBlAD5_It7XSsK22gpGDbUQq9cSM2vp6f2b2","audience":"https://finanzadomani.eu.auth0.com/api/v2/","grant_type":"client_credentials"}' };

  //       request(options, function (error, response, body) {
  //         if (error) throw new Error(error);


  //         console.log(body);
  //       });

    res.redirect(req.session.returnTo || '/user');
  });

module.exports = router