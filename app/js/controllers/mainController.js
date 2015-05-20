SocialNetwork.controller('MainController', function($scope, $location, mainData, authentication, notificationService) {
    var path = $location.path();
    if ((path.indexOf("user") != -1) && !authentication.isLoggedIn()) {
        $location.path('/');
    }
});