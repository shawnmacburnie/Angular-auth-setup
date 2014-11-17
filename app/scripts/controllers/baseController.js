'use strict';


angular.module('selfStatsApp')
    .controller('BaseController', function($scope, $state, $rootScope) {
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams) {
            console.log("failed to change routes");
            $state.go("login");
        });
    });