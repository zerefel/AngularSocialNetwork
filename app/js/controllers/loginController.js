SocialNetwork.controller('LoginController', function($scope, authenticationService, notificationService) {
    $scope.login = function () {
        authenticationService.Login($scope.loginInfo,
            function(serverData) {
                notificationService.showInfo("Successful Login!");
                authenticationService.SetCredentials(serverData);
                //ClearData();
            },
            function (serverError) {
                notificationService.showError("Unsuccessful Login!", serverError)
            });
    };
});