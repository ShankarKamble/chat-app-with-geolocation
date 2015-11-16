/**
 * Module dependencies.
 */
var express = require('express'),
 session = require('express-session'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 favicon = require('static-favicon'),
 methodOverride = require('method-override')
 compression = require('compression'),
    mongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    helpers = require('view-helpers'),
     logger = require('morgan'),
    config = require('./config');
   ;

module.exports = function(app, passport, db) {
    app.set('showStackError', true);    
    
    //Prettify HTML
    app.locals.pretty = true;

    //Should be placed before express.static
    app.use(compression({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    //Setting the fav icon and static folder
    app.use(favicon());
    app.use(express.static(config.root + '/public'));

    //Don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(logger('dev'));
    }

    //Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    //Enable jsonp
    app.enable("jsonp callback");

  //  app.configure(function() {
        //cookieParser should be above session
        app.use(cookieParser());

        // request body parsing middleware should be above methodOverride
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(methodOverride());

        //express/mongo session storage
        app.use(session({
            secret: 'MEAN',
            resave: true,
                  saveUninitialized: true,
            //store: new mongoStore({
            //    db: db.connection.db,
              //  collection: 'sessions'
           // })
        }));

        //connect flash for flash messages
        app.use(flash());

        //dynamic helpers
        app.use(helpers(config.app.name));

        //use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        //routes should be at the last
      // app.use(app.router());

       
        

    //});
};
