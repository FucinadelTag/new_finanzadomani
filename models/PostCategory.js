var mongoose                = require('mongoose');
var timestamps              = require('mongoose-timestamp');
var slugHero                = require('mongoose-slug-hero');


var Schema = mongoose.Schema;

/**
 * PostCategory Model
 * ==================
 */

var postCategorySchema = new Schema({
    name: { type: String, required: true },
    ordine: { type: Number, required: true, default: 0 },
    description: { type: String, height: 200 }
});

postCategorySchema.plugin(timestamps);
postCategorySchema.plugin(slugHero, {doc: 'PostCategory', field: 'name'})



module.exports = mongoose.model('PostCategory', postCategorySchema );