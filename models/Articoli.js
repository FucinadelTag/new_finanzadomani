var mongoose = require('mongoose');
var timestamps              = require('mongoose-timestamp');
var slugHero                = require('mongoose-slug-hero');

var Schema = mongoose.Schema;

/**
 * Articoli Model
 * ==========
 */

var paragrafiSchema = new Schema({
    titolo: { type: String, required: true, trim: true },
    testo: { type: String},
    immagine: { type: String}
});


var articoliSchema = new Schema({
    titolo: { type: String, required: true, trim: true },
    stato: { type: String, default: 'draft', index: true },
    dataPubblicazione: { type: Date, default: new Date (), index: true},
    immagine: { type: String},
    abstract: { type: String},
    consiglio: { type: String},
    categoria: { type: String},
    paragrafi: [paragrafiSchema]
});


articoliSchema.plugin(timestamps);
articoliSchema.plugin(slugHero, {doc: 'Articoli', field: 'titolo'})


module.exports = mongoose.model('Articoli', articoliSchema );