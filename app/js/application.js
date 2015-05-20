var SocialNetwork = angular.module('SocialNetwork', ['ngRoute']);

SocialNetwork.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api');

SocialNetwork.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'templates/login.html'
        })
        .when('/register', {
            templateUrl: 'templates/registration.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});