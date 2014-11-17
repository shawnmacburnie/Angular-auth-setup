'use strict';

/**
 * @ngdoc function
 * @name selfStatsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the selfStatsApp
 */
angular.module('selfStatsApp')
  .controller('MainCtrl', function ($scope, $state, UserAuthentication) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.logout = function() {
        UserAuthentication.logout();
        $state.go("login");
    };

  });
