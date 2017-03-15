var mongoose                = require('mongoose');
var timestamps              = require('mongoose-timestamp');
var slugHero                = require('mongoose-slug-hero');
var dataTables              = require('mongoose-datatables');


var Schema = mongoose.Schema;

/**
 * Articoli Model
 * ==========
 */

var paragrafiSchema = new Schema({
    titolo: { type: String, required: true, trim: true },
    testo: { type: String},
    immagine: { type: String},
    ordine: { type: Number, required: false, default: 0 },
    layout: {type: String, default: 'img_sinistra'}
});


var articoliSchema = new Schema({
    titolo: { type: String, required: true, trim: true },
    stato: { type: String, default: 'draft', index: true },
    dataPubblicazione: { type: Date, default: new Date (), index: true},
    immagine: { type: String},
    abstract: { type: String},
    consiglio: { type: String},
    categoria: { type: String, ref: 'PostCategory' },
    paragrafi: [paragrafiSchema],
    aziende: [{ type: Schema.Types.ObjectId, ref: 'Aziende' }]
});

articoliSchema.virtual('url').get(function () {
  return '/articoli/' + this.categoria.slug + '/' + this.slug;
});


articoliSchema.plugin(dataTables, {
    totalKey: 'recordsTotal'
});
articoliSchema.plugin(timestamps);
articoliSchema.plugin(slugHero, {doc: 'Articoli', field: 'titolo'})


module.exports = mongoose.model('Articoli', articoliSchema );