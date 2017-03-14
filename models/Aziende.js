var mongoose                = require('mongoose');
var timestamps              = require('mongoose-timestamp');


var Schema = mongoose.Schema;

/**
 * PostCategory Model
 * ==================
 */

var aziendeSchema = new Schema({
    titolo: { type: String, required: true },
    codice: { type: String, required: true },
    isin: { type: String, required: true },
    immagine: { type: String, required: false},
    categoria: { type: String, required: true}
});

aziendeSchema.plugin(timestamps);


module.exports = mongoose.model('Aziende', aziendeSchema );