'use strict';

angular.module('selfStatsApp')
  .directive('validField', function ($window, $log) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            console.log("linked");
        }
    };
  });