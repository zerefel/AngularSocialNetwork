SocialNetwork.controller('RegisterController', function($scope, authenticationService, notificationService) {
    $scope.register = function () {
        authenticationService.Register($scope.registrationInfo,
            function(serverData) {
                //notifyService.showInfo("Successful Register!");
                authenticationService.SetCredentials(serverData);
                //ClearData();
                //$location.path('/user/home');
            },
            function (serverError) {
                //notifyService.showError("Unsuccessful Register!", serverError)
            });
    };
});