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
            console.log('called');
            //$('#header').css('background-image', 'url(' + serverData.coverImageData + ')');
            $('.header').css('background-image', 'url(' + serverData.coverImageData + ')');
        }, function (error) {
            console.log(' error called');
            if (error.message === "Session token expired or not valid.") {
               // $scope.clearCredentials();
               // $scope.navigateToPage("Your session has expired. Please login again");
            }
            console.log(error);
        });
    };


    $rootScope.$watch(function () {
        return angular.toJson($localStorage);
    }, function () {
        $rootScope.userProfileData = $localStorage.userProfileData;
    });

});