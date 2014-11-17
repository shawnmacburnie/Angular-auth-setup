'use strict';

angular.module('selfStatsApp')
  .controller('LoginController', function ($scope,$state, UserAuthentication) {
    $scope.loginForm = {};
    if(UserAuthentication.getUserInfo()) {
        $state.go("home");
    }
    $scope.login = function() {
        UserAuthentication.login($scope.loginForm.username, $scope.loginForm.password).then(function(data){
            //console.log(data);
            $state.go("home");
        });
    };
  });