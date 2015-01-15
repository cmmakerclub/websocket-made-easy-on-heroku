'use strict';

/**
 * @ngdoc function
 * @name yeomanHerokuAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanHerokuAngularApp
 */
angular.module('yeomanHerokuAngularApp')
  .controller('MainCtrl', function ($scope, mySocket) {
    
    mySocket.on("news", function(msg) {
        console.log("WE GOT NEWS: ", msg);
    });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
