angular.module('dealdeck.DealDecks').controller('DealDecksController', [
    '$scope', '$routeParams', '$location', 'Global', 'DealDecks',
    function ($scope, $routeParams, $location, Global, DealDecks) {
        // Initailize varable
        $scope.global = Global;
        $scope.isLoad = true;
        $scope.hearts = [];
        $scope.diamonds = [];
        $scope.spades = [];
        $scope.clubs = [];
        $scope.percentage = "";

        // Create structure of deck 
        $scope.build = function (cardNames, cardSuits) {
            var deck = [];
            for (var s = 0; s < cardSuits.length; s++) {
                for (var n = 0; n < cardNames.length; n++) {
                    value = cardNames[n] + ' of ' + cardSuits[s]
                    deck.push(value);
                    switch (cardSuits[s]) {
                    case 'Hearts':
                        $scope.hearts.push(value);
                        break;
                    case 'Diamonds':
                        $scope.diamonds.push(value);
                        break;
                    case 'Spades':
                        $scope.spades.push(value);
                        break;
                    case 'Clubs':
                        $scope.clubs.push(value);
                        break;
                    }
                }
            }

            return deck;
        }

        // Set 52 decks
        $scope.decksValues = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack',
            'Queen', 'King'
        ]
        $scope.decks = $scope.build($scope.decksValues, ['Spades',
            'Clubs', 'Diamonds', 'Hearts'
        ])

        // check paged is loaded or not
        $scope.Load = function () {
            return $scope.isLoad === true;
        };

        // click on deal 
        $scope.dealDecks = function () {
            $scope.isLoad = false;
            $scope.shuffleDecks();
            $scope.calculatePercenatge();
        };

        //shuffle Decks
        $scope.riffleShuffleDecks = function () {
            var decksLength = $scope.decks.length/2;
            forwordDeck=$scope.decks.slice(0,decksLength)
            backwordDeck=$scope.decks.slice(decksLength,$scope.decks.length)
            $scope.decks.length = 0;
            for (var i = 0; i < decksLength; i++) {
                $scope.decks.push(forwordDeck[i])
                $scope.decks.push(backwordDeck[i])
            }
        };

        //shuffle Decks
        $scope.shuffleDecks = function () {
            for(var i = 1; i<=7; i++){
                $scope.riffleShuffleDecks();
            }
            $scope.spades = $scope.decks.slice(0, 13);
            $scope.clubs = $scope.decks.slice(13, 26);
            $scope.diamonds = $scope.decks.slice(26, 39);
            $scope.hearts = $scope.decks.slice(39, 52);
            $scope.percentage = "";
        };


        // calcualte percentage
        $scope.calculatePercenatge = function () {
            var percentage = $scope.checkHorizonalValues($scope.spades,
                'Spades', 0);
            percentage = $scope.checkHorizonalValues($scope.clubs, 'Clubs',
                percentage);
            percentage = $scope.checkHorizonalValues($scope.diamonds,
                'Diamonds', percentage);
            percentage = $scope.checkHorizonalValues($scope.hearts,
                'Hearts', percentage);
            percentage = (percentage * (100 / 104)).toFixed(2) + " %";
            $scope.percentage = percentage;
            var decks = new DealDecks({
                config: $scope.decks,
                percentage: percentage
            });
            decks.$save(function (response) {});
        };

        // Check horizontal row is correct or not
        $scope.checkHorizonalValues = function (deckSuits, cardSuits,
            percentage) {
            for (var i = 0; i < deckSuits.length; i++) {
                if (deckSuits[i].toString().indexOf(cardSuits) !== -1  ) {
                    percentage++;
                }
                if(deckSuits[i].toString().indexOf($scope.decksValues[i].toString()) !== -1){
                    percentage++;
                }
            }
            return percentage;
        };

        // get history of deal deck
        $scope.getAllDealDecks = function () {
            DealDecks.query(function (dealDecks) {
                $scope.DealDecks = dealDecks;
                for (var i = 0; i < $scope.DealDecks.length; i++) {
                    $scope.DealDecks[i].configDeck = $scope.DealDecks[i]
                        .config.split(',');
                }
            });
        };

    }
]);