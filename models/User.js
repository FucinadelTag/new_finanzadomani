var mongoose                = require('mongoose');
var timestamps              = require('mongoose-timestamp');
var slugHero                = require('mongoose-slug-hero');


var Schema = mongoose.Schema;

var indirizzoSchema = new Schema({
    nome: { type: String, required: false, trim: true },
    cognome: { type: String, required: false, trim: true },
    ragionesociale: { type: String, required: false, trim: true },
    codicefiscale_iva: { type: String, required: false, trim: true },
    address_line1: { type: String, required: false, trim: true },
    address_city: { type: String, required: false, trim: true },
    address_state: { type: String, required: false, trim: true },
    address_zip: { type: Number, required: false, trim: true }
});


var userSchema = new Schema({
    nome: { type: String, required: false },
    cognome: { type: String, required: false },
    email: { type: String, required: false },
    telefono: { type: String, required: false },
    auth0Id: { type: String, required: true },
    auth0: { type: Schema.Types.Mixed },
    stripeId: { type: String, required: false },
    stripeToken: { type: String, required: false },
    nome_carta: { type: String, required: false },
    stripeUser: { type: Schema.Types.Mixed, required: false },
    nuovo: { type: Boolean, required: false, default: true },
    indirizzo_fatturazione: indirizzoSchema,
});

userSchema.plugin(timestamps);


module.exports = mongoose.model('FdTUser', userSchema );