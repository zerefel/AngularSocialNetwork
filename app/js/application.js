var SocialNetwork = angular.module('SocialNetwork', ['ngMessages', 'ngRoute', 'ngStorage', 'ui.bootstrap']);

SocialNetwork.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api');

SocialNetwork.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            title: 'Welcome',
            templateUrl: 'templates/welcome.html',
            controller: 'MainController'
        })
        .when('/login', {
            title: 'Login',
            templateUrl: 'templates/login.html',
            controller: 'MainController'
        })
        .when('/register', {
            title: 'Register',
            templateUrl: 'templates/registration.html',
            controller: 'MainController'
        })
        .when('/user/home', {
            title: 'Home',
            templateUrl: 'templates/user-home.html',
            controller: 'MainController'
        })
        .when('/user/:username', {
            title: 'Profile',
            templateUrl: 'templates/user-wall.html',
            controller: 'MainController'
        })
        .when('/user/:username/edit', {
            title: 'Profile',
            templateUrl: 'templates/edit-profile.html',
            controller: 'MainController'
        })
        .when('/user/:username/requests', {
            title: 'Friend Requests',
            templateUrl: 'templates/friends-requests.html',
            controller: 'MainController'
        })
        .when('/user/:username/friends', {
            title: 'Friends',
            templateUrl: 'templates/friends.html',
            controller: 'MainController'
        })
        .when('/user/:username/friends', {
            title: 'Friends',
            templateUrl: 'templates/friends.html',
            controller: 'MainController',
            resolve: {
                factory: redirectGuestToHome()
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});

SocialNetwork.run(['$location', '$rootScope', function ($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });

    //localStorage.$watch(function () {
    //    return $location.path();
    //}, function (newValue, oldValue) {
    //    //if ($scope.loggedIn == false && newValue != '/login') {
    //    //    $location.path('/login');
    //    //}
    //});
}]);


function redirectGuestToHome() {
    if (!sessionStorage['accessToken']) {
        window.location('#/');
    }
}

function loadUserHomePage() {
    if (sessionStorage['accessToken']) {
        var splitted = window.location.href.split('#');
        window.location.replace(splitted[0] + '#/');
    }
}