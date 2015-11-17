

angular.module('UserChat.User').controller('UserChatsController', [
    '$scope', '$routeParams', '$location', 'Global', 'User', 'socket', '$http','$timeout',
    function ($scope, $routeParams, $location, Global, User, socket, $http, $timeout) {
        // Initailize varable
        $scope.global = Global;
        $scope.isUserPresent = false;
        $scope.markers = [];
        $scope.getAllUsers = function () {
            User.query(function (users) {
                $scope.Users = users;
                $scope.markers = [];
                for (var i = 0; i < users.length; i++) {
                    var info = {
                        name: users[i].name,
                        lat: users[i].lat,
                        long: users[i].longt
                    };
                    createMarker(info);
                }
            });
        };


        socket.on('send:message', function (message) {

            if ( $scope.global.user.name === message.touser ) {
                $scope.toUser = message.user;
                $scope.isUserPresent = true;
                $scope.messages.push({
                    user: message.user,
                    text: message.text,
                    touser: $scope.toUser,
                });
            }
        });

        $scope.messages = [];

        $scope.sendMessage = function () {
            socket.emit('send:message', {
                text: $scope.message,
                touser: $scope.toUser,
                user: $scope.global.user.name
            });

            // add the message to our model locally
            $scope.messages.push({
                user: $scope.global.user.name,
                text: $scope.message,
                touser: $scope.toUser
            });

            // clear message box
            $scope.message = '';
        };

        $scope.setToUser = function (username) {
            if(username !== $scope.global.user.name){
                $scope.messages = [];
                $scope.toUser = username
                $scope.isUserPresent = true;
            }
        }

        $scope.hideModel = function () {
            $scope.isUserPresent = false;
        }

        $scope.lat = "0";
        $scope.lng = "0";
        $scope.accuracy = "0";
        $scope.error = "";
        $scope.model = {
            myMap: undefined
        };

        $scope.showResult = function () {
            return $scope.error == "";
        }


        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(20.0000, 77.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);



        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function (info) {

            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.long),
                title: info.name
            });
            marker.content = '<div class="infoWindowContent">' + info.name + '</div>';

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);

        }



        $scope.openInfoWindow = function (e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }


        $scope.showPosition = function (position) {
            var info = {
                name: $scope.global.user.name,
                lat: position.coords.latitude,
                long: position.coords.longitude
            };
            createMarker(info);
            $scope.updateUserDeatails(info);
        }

        $scope.showError = function (error) {
            switch (error.code) {
            case error.PERMISSION_DENIED:
                $scope.error = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                $scope.error = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                $scope.error = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                $scope.error = "An unknown error occurred."
                break;
            }
            $scope.$apply();
        }

        $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError, {
                    maximumAge: 75000,
                    timeout: 30000,
                    enableHighAccuracy: true
                });
            } else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }

        $scope.updateUserDeatails = function (info) {
            $scope.global.user.longt = info.long;
            $scope.global.user.lat = info.lat;
            $http.post('users/update', {
                'user': $scope.global.user
            });
        }
        $scope.showResult = function () {
            return $scope.error == "";
        }

        $timeout(function () {$scope.getAllUsers}, 5000);
        $scope.getLocation();



    }
]);



angular.module('UserChat.User').controller('ContactController', [
    '$scope', '$routeParams', '$location', 'Global', 'Contact', '$http','$timeout',
    function ($scope, $routeParams, $location, Global, Contact, $http, $timeout) {
        // Initailize varable
        $scope.global = Global;
        $scope.getAllUsers = function () {
            Contact.getAllContact().then(function (contact) {
                $scope.Users = contact;
            });
        };


       
       

        $scope.updateUserDeatails = function (info) {
            $scope.global.user.longt = info.long;
            $scope.global.user.lat = info.lat;
            $http.post('users/update', {
                'user': $scope.global.user
            });
        }
      
       



    }
]);