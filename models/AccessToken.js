var mongoose                = require('mongoose');
var timestamps              = require('mongoose-timestamp');
var slugHero                = require('mongoose-slug-hero');


var Schema = mongoose.Schema;


var accessTokenSchema = new Schema({
    servizio: { type: String, unique: true },
    access_token: { type: String, required: true },
    expires_in: { type: Number, required: true },
    scope: { type: String, required: false },
    token_type: { type: String, required: false, default: 'Bearer' }
});


module.exports = mongoose.model('AccessToken', accessTokenSchema );