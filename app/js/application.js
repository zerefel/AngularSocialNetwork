var SocialNetwork = angular.module('SocialNetwork', ['ngMessages', 'ngRoute']);

SocialNetwork.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api');

SocialNetwork.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            title: 'Login',
            templateUrl: 'templates/login.html'
        })
        .when('/register', {
            title: 'Register',
            templateUrl: 'templates/registration.html'
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
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
}]);

SocialNetwork.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);