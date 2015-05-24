SocialNetwork.controller('MainController', function ($scope, $rootScope, $localStorage, authenticationService, $routeParams, $location) {

    var path = $location.path();
    if ((path.indexOf("user") != -1) && !authenticationService.isLoggedIn()) {
        $location.path('#/');
    }

    $scope.username = authenticationService.GetUsername();
    $scope.profileImage = localStorage['profileImage'];
    $scope.name = localStorage['name'];
    $scope.isLogged = authenticationService.isLoggedIn();

    $scope.isWallOwnerMe = function() {
        return $routeParams.username === authenticationService.GetUsername();
    };

    $scope.getWallOwnerData = function () {
        authenticationService.GetProfileDataForSpecificUser($routeParams.username, function(serverData) {
            $scope.wallOwner = serverData;
            $scope.contentLoaded = true;
            $scope.isWallOwnerFriend = serverData.isFriend;
            $scope.hasPendingFriendRequest = serverData.hasPendingRequest;
            if(serverData.coverImageData) {
                $('.header').css('background-image', 'url(' + serverData.coverImageData + ')');
            } else {
                $('.header').css('background-image', 'url(./images/default-cover-photo.jpg)');
            }
        }, function (error) {
        });
    };

    $rootScope.$watch(function () {
        return angular.toJson($localStorage);
    }, function () {
        $rootScope.userProfileData = $localStorage.userProfileData;
    });

});