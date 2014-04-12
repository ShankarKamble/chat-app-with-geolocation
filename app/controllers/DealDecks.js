/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    DealDecks = mongoose.model('DealDecks'),
    _ = require('underscore');


/**
 * Find DealDecks by id
 */
exports.dealDecks = function(req, res, next, id) {
    DealDecks.load(id, function(err, DealDecks) {
        if (err) return next(err);
        if (!DealDecks) return next(new Error('Failed to load DealDecks ' + id));
        req.DealDecks = DealDecks;
        next();
    });
};

/**
 * Create a DealDecks
 */
exports.create = function(req, res) {
    var dealDecks = new DealDecks(req.body);
    dealDecks.user = req.user;

    dealDecks.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                DealDecks: dealDecks
            });
        } else {
            res.jsonp(dealDecks);
        }
    });
};

/**
 * Update a DealDecks
 */
exports.update = function(req, res) {
    var dealDecks = req.DealDecks;

    dealDecks = _.extend(dealDecks, req.body);

    dealDecks.save(function(err) {
        res.jsonp(dealDecks);
    });
};

/**
 * Delete an DealDecks
 */
exports.destroy = function(req, res) {
    var dealDecks = req.DealDecks;

    dealDecks.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(dealDecks);
        }
    });
};

/**
 * Show an DealDecks
 */
exports.show = function(req, res) {
    res.jsonp(req.DealDecks);
};

/**
 * List of DealDecks
 */
exports.all = function(req, res) {
    DealDecks.find().sort('-created').populate('user', 'name username').exec(function(err, dealDecks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(dealDecks);
        }
    });
};
