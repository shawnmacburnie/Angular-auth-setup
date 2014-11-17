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

    $scope.logout = function() {
        UserAuthentication.logout();
        $state.go("login");
    };

  });
