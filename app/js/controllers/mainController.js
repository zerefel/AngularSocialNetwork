SocialNetwork.controller('MainController', function ($scope, $rootScope, $localStorage, authenticationService, $routeParams, $location) {

    var path = $location.path();
    if ((path.indexOf("user") != -1) && !authenticationService.isLoggedIn()) {
        $location.path('/');
    }

    $scope.username = authenticationService.GetUsername();
    $scope.profileImage = localStorage['profileImage'];
    $scope.name = localStorage['name'];
    $scope.isLogged = authenticationService.isLoggedIn();


    $scope.getWallOwnerData = function () {
        authenticationService.GetProfileDataForSpecificUser($routeParams.username, function(serverData) {
            $scope.wallOwner = serverData;
            $scope.contentLoaded = true;
            $('.header').css('background-image', 'url(' + serverData.coverImageData + ')');
        }, function (error) {
        });
    };

    $scope.setHoverEvents = function () {
        $('.userName').unbind('mouseenter');
        $('.userName').unbind('mouseleave');
        $('.hover-box').unbind('mouseenter');
        $('.hover-box').unbind('mouseleave');

        $('.userName').mouseenter(function (event) {
            var x = event.clientX;
            var y = event.clientY;
            var username = $(this).data('id');

            $('.hover-box')
                .css('position', 'absolute')
                .css('visibility', 'visible')
                .css('top', y - 10)
                .css('left', x - 10);

            authenticationService.GetProfileDataForSpecificUser(username, function(serverData) {
                $scope.userPreviewData = serverData;
            }, function(error) {
                console.log(error);
            });
        });

        $('.hover-box').mouseenter(function() {
            $('.hover-box')
                .css('visibility', 'visible');
        });

        $('.hover-box').mouseleave(function() {
            $('.hover-box')
                .css('visibility', 'hidden');

            $scope.userPreviewData = null;
        });

        $('.userName').mouseleave(function () {
            $('.hover-box')
                .css('visibility', 'hidden');
        });
    };


    $rootScope.$watch(function () {
        return angular.toJson($localStorage);
    }, function () {
        $rootScope.userProfileData = $localStorage.userProfileData;
    });

});