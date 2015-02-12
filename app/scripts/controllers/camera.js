'use strict';

/**
 * @ngdoc function
 * @name yeomanHerokuAngularApp.controller:CameraCtrl
 * @description
 * # CameraCtrl
 * Controller of the yeomanHerokuAngularApp
 */
angular.module('yeomanHerokuAngularApp')
   .controller('CameraCtrl', function ($scope, socket) {
    $scope.message = 'Hello';
    $scope.fps = 3;


    $scope.$watch('fps', function(newValue, oldValue) {
      clearInterval($scope.timer);
      $scope.timer = setInterval($scope.timer_callback, 1000/newValue);
    });      

    $scope.timer_callback = function() {
        if ($scope.streaming) {
          $scope['frame'] ++;
          $scope.image_data = $scope.canvas.toDataURL('image/jpeg');
          socket.emit('frame', $scope.image_data);
        }

        $scope.ctx.drawImage($scope.video, 0, 0, 320, 240);
    }

    $scope.$on('$viewContentLoaded', function() {
      $scope.video = angular.element('#live')[0];
      $scope.canvas = angular.element('#canvas')[0];
      $scope.ctx = $scope.canvas.getContext('2d');
    });

     socket.on('face_data', function(d) {
        $scope.src_gray = 'data:image/jpeg;base64,'+d.image_gray;
        $scope.src_hsv = 'data:image/jpeg;base64,'+d.image_hsv;
        $scope.src_face = 'data:image/jpeg;base64,'+d.image_face;
        $scope.src_orig = d.image_orig;
      })

    $scope.streaming_callback = function(stream) {
      $scope.video.src = window.URL.createObjectURL(stream); 
      $scope.streaming = true;
      $scope.$apply();
    }

    $scope.error_callback = function(err) {
      console.log("Unable to get video stream!")
      $scope.streaming = false;
      $scope.$apply();
    }

    $scope.capture = function() {
        navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia || navigator.msGetUserMedia);

        navigator.getMedia({ video: true, audio: false }, 
            $scope.streaming_callback, 
        $scope.error_callback);

        $scope.capture_num++;

        // socket.get('/camera/use', function(d) {
        //   console.log("lockin...", d);
        // })
      }

      $scope.timer = setInterval($scope.timer_callback, 1000/$scope.fps);

  });
