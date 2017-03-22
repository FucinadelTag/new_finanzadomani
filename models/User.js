var mongoose                = require('mongoose');
var timestamps              = require('mongoose-timestamp');
var slugHero                = require('mongoose-slug-hero');


var Schema = mongoose.Schema;


var userSchema = new Schema({
    nome: { type: String, required: false },
    cognome: { type: String, required: false },
    email: { type: String, required: false },
    telefono: { type: String, required: false },
    auth0Id: { type: String, required: true },
    auth0: { type: Schema.Types.Mixed },
    stripeId: { type: String, required: false },
    stripeUser: { type: Schema.Types.Mixed, required: false },
    nuovo: { type: Boolean, required: false, default: true }
});

userSchema.plugin(timestamps);


module.exports = mongoose.model('FdTUser', userSchema );