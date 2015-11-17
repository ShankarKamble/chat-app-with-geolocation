angular.module('UserChat.system').controller('HeaderController', ['$scope', 'Global','$location', function ($scope, Global, $location) {
    $scope.global = Global;
// Header Menu
    $scope.menu = [{
        "title": "Users",
        "link": "User"
    },
    {
        "title": "Contact",
        "link": "Contact"
    }];

    $scope.isCollapsed = false;
    if(!$scope.global.authenticated){
    	$location.path('/');
    }
}]);