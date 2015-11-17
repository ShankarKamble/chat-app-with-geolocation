/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('underscore');

/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {

    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.user.online = false;
    exports.update(req.user)
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    req.user.online = true;
    exports.update(req.user)
    res.redirect('/#!/User');
};

/**
 * Create user
 */
exports.create = function(req, res) {
    var user = new User(req.body);
    var message = null;
    user.online = true;
    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            switch(err.code){
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.render('users/signup', {
                message: message,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/#!/User');
        });
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

/**
 * List of User
 */
exports.all = function(req, res) {

    User.find({email: {'$ne':req.user.email }}).exec(function(err, UserChats) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            
            res.jsonp(UserChats);
        }
    });
};

/**
 * Update a User
 */
exports.update = function(user) {
    user = _.extend(User,user);
    user.save(function(err) {
        //res.jsonp(user);
    });
};

/**
 * Update a User
 */
exports.updateUser = function(req, res) {
    var user = req.body.user;
    var userupdate = req.user;
    userupdate.lat = user.lat;
    userupdate.longt = user.longt;
    userupdate.online = true;

    userupdate.name = "Test user";
    userupdate.username = "test";
    userupdate.email = "testuser@gmail.com";

    user = _.extend(User,userupdate);
    user.save(function(err) {
        //res.jsonp(user);
    });


};