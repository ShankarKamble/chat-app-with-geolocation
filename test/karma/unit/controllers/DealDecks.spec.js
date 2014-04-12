(function() {
    'use strict';

    // DealDecks Controller Spec
    describe('DEALDECK controllers', function() {

        describe('DealDecksController', function() {

            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var DealDecksController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                DealDecksController = $controller('DealDecksController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one DealDecks object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('DealDecks').respond([{
                        title: 'An DealDecks about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.DealDecks).toEqualData([{
                        title: 'An DealDecks about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                });

            it('$scope.findOne() should create an array with one DealDecks object fetched ' +
                'from XHR using a DealDecksId URL parameter', function() {
                    // fixture URL parament
                    $routeParams.DealDecksId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testDealDecksData = function() {
                        return {
                            title: 'An DealDecks about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/DealDecks\/([0-9a-fA-F]{24})$/).respond(testDealDecksData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.DealDecks).toEqualData(testDealDecksData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postDealDecksData = function() {
                        return {
                            title: 'An DealDecks about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture expected response data
                    var responseDealDecksData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An DealDecks about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'An DealDecks about MEAN';
                    scope.content = 'MEAN rocks!';

                    // test post request is sent
                    $httpBackend.expectPOST('DealDecks', postDealDecksData()).respond(responseDealDecksData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.title).toEqual('');
                    expect(scope.content).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/DealDecks/' + responseDealDecksData()._id);
                });

            it('$scope.update() should update a valid DealDecks', inject(function(DealDecks) {

                // fixture rideshare
                var putDealDecksData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An DealDecks about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock DealDecks object from form
                var DealDecks = new DealDecks(putDealDecksData());

                // mock DealDecks in scope
                scope.DealDecks = DealDecks;

                // test PUT happens correctly
                $httpBackend.expectPUT(/DealDecks\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/DealDecks\/([0-9a-fA-F]{24})$/, putDealDecksData()).respond();
                /*
                Error: Expected PUT /DealDecks\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An DealDecks about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An DealDecks about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/DealDecks/' + putDealDecksData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid DealDecksId' +
                'and remove the DealDecks from the scope', inject(function(DealDecks) {

                    // fixture rideshare
                    var DealDecks = new DealDecks({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.DealDecks = [];
                    scope.DealDecks.push(DealDecks);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/DealDecks\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(DealDecks);
                    $httpBackend.flush();

                    // test after successful delete URL location DealDecks lis
                    //expect($location.path()).toBe('/DealDecks');
                    expect(scope.DealDecks.length).toBe(0);

                }));

        });

    });
}());