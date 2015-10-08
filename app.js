var myApp = angular.module('PBLApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'HomeController'
        })
        .when('/tabling', {
            templateUrl : 'views/tabling.html',
            controller  : 'TablingController'
        })
        .when('/share', {
            templateUrl : 'views/share.html',
            controller  : 'ShareController'
        })
        .when('/tablingSignup', {
            templateUrl : 'views/tablingSignup.html',
            controller  : 'TablingSignupController'
        })
        .otherwise({
          'redirect_to': '/'
        });
});