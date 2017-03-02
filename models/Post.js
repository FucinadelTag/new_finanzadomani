var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * Post Model
 * ==========
 */


var postSchema = new Schema({
	title: { type: String, required: true },
    state: { type: Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Date, index: true},
    image: { type: Schema.Types.Mixed },
    abstract: { type: String},
    categories: [{ type: Schema.Types.ObjectId, ref: 'PostCategory' }]
});


var Post  = mongoose.model('Post', postSchema);