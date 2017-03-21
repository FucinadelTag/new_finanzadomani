var mongoose                = require('mongoose');
var timestamps              = require('mongoose-timestamp');
var slugHero                = require('mongoose-slug-hero');


var Schema = mongoose.Schema;


var userSchema = new Schema({
    auth0Id: { type: String, required: true },
    auth0: { type: Schema.Types.Mixed },
    stripeId: { type: String, required: false },
    stripeUser: { type: Schema.Types.Mixed, required: false },
    nuovo: { type: Boolean, required: false, default: true }
});

userSchema.plugin(timestamps);


module.exports = mongoose.model('FdTUser', userSchema );