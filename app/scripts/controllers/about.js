'use strict';

/**
 * @ngdoc function
 * @name yeomanHerokuAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yeomanHerokuAngularApp
 */
angular.module('yeomanHerokuAngularApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
