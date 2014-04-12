/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * DealDecks Schema
 */
var DealDeckschema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    config: {
        type: String,
        default: '',
        trim: true
    },
    percentage: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
DealDeckschema.path('config').validate(function(config) {
    return config.length;
}, 'config cannot be blank');

/**
 * Statics
 */
DealDeckschema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('DealDecks', DealDeckschema);
