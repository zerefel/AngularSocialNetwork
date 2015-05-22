SocialNetwork.controller('AuthenticationsController', function ($scope, $rootScope, $location, $route, authenticationService, notificationService) {

    var ClearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.login = function () {
        authenticationService.Login($scope.loginInfo,
            function (serverData) {
                notificationService.showInfo("Successfully signed in!");
                authenticationService.SetCredentials(serverData);
                $location.path('/user/home');
                $rootScope.isLoggedIn = true;
                ClearData();
            },
            function (serverError) {
                notificationService.showError("Sign in failed!", serverError)
            });
    };

    $scope.logout = function () {
        notificationService.showInfo("Successfully logged out!");
        ClearData();
        $rootScope.isLoggedIn = false;
        authenticationService.ClearCredentials();
        //mainData.clearParams();
        $route.reload();
    };

    $scope.register = function () {
        authenticationService.Register($scope.registrationInfo,
            function (serverData) {
                notificationService.showInfo("Successfully Registered!");
                authenticationService.SetCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                notificationService.showError("Registration failed!", serverError)
            });
    };

    $scope.editProfile = function() {

    }
});