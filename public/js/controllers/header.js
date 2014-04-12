angular.module('dealdeck.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
// Header Menu
    $scope.menu = [{
        "title": "DealDecks",
        "link": "DealDecks"
    }, {
        "title": "History",
        "link": "DealDecks/history"
    }];
    
    $scope.isCollapsed = false;
}]);