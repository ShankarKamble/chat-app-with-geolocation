//DealDecks service used for DealDecks REST endpoint
angular.module('dealdeck.DealDecks').factory("DealDecks", ['$resource', function($resource) {
    return $resource('DealDecks/:DealDecksId', {
        DealDecksId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);