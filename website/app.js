// ROOT_URL = 'http://testing.berkeley-pbl.com';
ROOT_URL = 'http://localhost:3000'
var token = '6461766964626c697540676d61696c2e636f6d';
// var token = getParameterByName('token');
var email = 'davidbliu@gmail.com';
var app = angular.module('pblApp', ['ngRoute']);
app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/points.html',
            controller  : 'PointsController'
        })
        .when('/tabling', {
            templateUrl : 'views/tabling.html',
            controller  : 'TablingController'
        })
        .when('/bb', {
            templateUrl : 'views/bb.html',
            controller  : 'BBController'
        })
        .otherwise({
          'redirect_to': '/'
        });
});

function tokenizedURL(url){
    if(url.indexOf('?') != -1){
        tokenized = url + '&token='+token;
    }
    else{
        tokenized =  url + '?token='+token;
    }
    return tokenized;
}
