module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    //Setting up the users api
    app.post('/users', users.create);

    //Setting up the users api
    app.post('/users/update', users.updateUser);


    //Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //User Routes

    app.get('/User', users.all);

    app.get('/getContacts', users.all);

    //Finish with setting up the UserChatsId param
  //  app.param('UserChatsId', User.UserChatsId);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
