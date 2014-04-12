/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    DealDecks = mongoose.model('DealDecks');

//Globals
var user;
var DealDecks;

//The tests
describe('<Unit Test>', function() {
    describe('Model DealDecks:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                DealDecks = new DealDecks({
                    title: 'DealDecks Title',
                    content: 'DealDecks Content',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return DealDecks.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                DealDecks.title = '';

                return DealDecks.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            DealDecks.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            DealDecks.remove().exec();
            User.remove().exec();
            done();
        });
    });
});