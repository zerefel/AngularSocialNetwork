var SocialNetwork = angular.module('SocialNetwork', ['ngMessages', 'ngRoute']);

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
            title: function (params) {
                return params.username
            },
            templateUrl: 'templates/user-wall.html',
            controller: 'MainController'
        })
        .when('/user/:username/edit', {
            title: 'Profile',
            templateUrl: 'templates/edit-profile.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

SocialNetwork.directive('compareTo', [function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
}]);

SocialNetwork.run(['$location', '$rootScope', function ($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);