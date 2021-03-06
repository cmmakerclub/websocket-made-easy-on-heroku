'use strict';

/**
 * @ngdoc overview
 * @name yeomanHerokuAngularApp
 * @description
 * # yeomanHerokuAngularApp
 *
 * Main module of the application.
 */
angular
  .module('yeomanHerokuAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'btford.socket-io',
    'ngSanitize',
    'ngTouch'
  ])
  .factory('socket', function (socketFactory) {
    return socketFactory();
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/camera', {
        templateUrl: 'views/camera.html',
        controller: 'CameraCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
