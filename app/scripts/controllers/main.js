'use strict';

/**
 * @ngdoc function
 * @name yeomanHerokuAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanHerokuAngularApp
 */
angular.module('yeomanHerokuAngularApp')
  .controller('MainCtrl', function ($scope, socket) {

    socket.on("socket", function(msg) {
      $scope.socket_id = msg.socket_id;
      $scope.$apply();
    });
    
    socket.on("socket-data", function(msg) {
      $scope.temperature = msg.p1;

      $scope.$apply(function() {


      });


    });



  });
