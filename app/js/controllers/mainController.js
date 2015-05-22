SocialNetwork.controller('MainController', function ($scope, authenticationService, $routeParams, $location) {

        var path = $location.path();
        if ((path.indexOf("user") != -1) && !authenticationService.isLoggedIn()) {
            $location.path('/');
        }

        $scope.username = authenticationService.GetUsername();
        $scope.profileImage = localStorage['profileImage'];
        $scope.name = localStorage['name'];
        $scope.isLogged = authenticationService.isLoggedIn();

});