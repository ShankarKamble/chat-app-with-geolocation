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

//User service used for User REST endpoint
angular.module('UserChat.User').service("Contact", ['$http','$q', function($http, $q) {
    this.getAllContact = function() {
    var deferred = $q.defer();
     $http.get('getContacts')
       .success(function(data) { 
          deferred.resolve(data);
       }).error(function(msg, code) {
          deferred.reject(msg);
       });
     return deferred.promise;

  }
}]);