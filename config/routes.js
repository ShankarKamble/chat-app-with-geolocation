module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    //Setting up the users api
    app.post('/users', users.create);

    //Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //DealDecks Routes
    var DealDecks = require('../app/controllers/DealDecks');
    app.get('/DealDecks', DealDecks.all);
    app.post('/DealDecks', auth.requiresLogin, DealDecks.create);
    app.get('/DealDecks/:DealDecksId', DealDecks.show);
    app.put('/DealDecks/:DealDecksId', auth.requiresLogin, auth.DealDecks.hasAuthorization, DealDecks.update);
    app.del('/DealDecks/:DealDecksId', auth.requiresLogin, auth.DealDecks.hasAuthorization, DealDecks.destroy);

    //Finish with setting up the DealDecksId param
  //  app.param('DealDecksId', DealDecks.dealDecksId);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
