angular.module('UserChat.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
// Header Menu
    $scope.menu = [{
        "title": "Users",
        "link": "User"
    }];

    $scope.isCollapsed = false;
}]);