SocialNetwork.controller('AuthenticationsController', function ($scope, $rootScope, $location, $route, authenticationService, notificationService, $localStorage) {

    var ClearData = function () {
        $scope.loginInfo = "";
        $scope.registrationInfo = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.login = function () {
        authenticationService.Login($scope.loginInfo,
            function (serverData) {
                notificationService.showInfo("Successfully signed in!");
                authenticationService.SetCredentials(serverData);

                authenticationService.GetUserProfileData(function (successData) {
                    authenticationService.setProfilePicture(successData.profileImageData);
                    $rootScope.userProfileData = successData;
                    $localStorage.userProfileData = successData;
                    $location.path('/user/home');
                    ClearData();
                });
            }, function (serverError) {
                notificationService.showError("Sign in failed!", serverError)
            });
    };

    $scope.logout = function () {
        console.log('called');
        notificationService.showInfo("Successfully logged out!");
        ClearData();
        $rootScope.isLoggedIn = false;
        authenticationService.ClearCredentials();
        localStorage.removeItem('ngStorage-userProfileData');
        $route.reload();
    };

    $scope.register = function () {
        authenticationService.Register($scope.registrationInfo,
            function (serverData) {
                notificationService.showInfo("Successfully Registered!");
                authenticationService.SetCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            }, function (serverError) {
                notificationService.showError("Registration failed!", serverError.message)
            });
    };

    $scope.changePassword = function () {
        authenticationService.ChangePassword($scope.changePasswordInfo, function (successData) {
            notificationService.showInfo("You have successfully changed your password.");
            $location.path('/user/home');
        }, function (error) {
            notificationService.showError("Error changing your password." + error.message);
        });
    }

});