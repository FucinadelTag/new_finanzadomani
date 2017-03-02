var mongoose = require('mongoose');

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


module.exports = mongoose.model('PostCategory', postCategorySchema );