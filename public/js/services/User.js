//User service used for User REST endpoint
angular.module('UserChat.User').factory("User", ['$resource', function($resource) {
    return $resource('User/:UserChatsId', {
        UserChatsId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);