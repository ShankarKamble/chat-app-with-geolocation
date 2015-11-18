//User service used for User REST endpoint
angular.module('UserChat.User').service("Contact", ['$resource', function($resource) {
    this.getAllContact = function() {
    return  $http.post('getContacts', {});;
  }
}]);