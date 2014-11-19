'use strict';

angular.module('selfStatsApp')
    .controller('LoginController', function($scope, $state, UserAuthentication,SHA256) {
        $scope.loginForm = {};
        $scope.ERROR = {
            username: '',
            password: ''
        }
        if (UserAuthentication.getUserInfo()) {
            $state.go("home");
        }
        $scope.login = function() {
            // if (fieldsValid()) {
            //     UserAuthentication.login($scope.loginForm.username, $scope.loginForm.password).then(function(data) {
            //         //console.log(data);
            //         $state.go("home");
            //     });
            // }
            console.log(SHA256.hash($scope.loginForm.username));
        };
        $('.loginContainer').on('keyup', function(e) {
            if (e.which == 13 || event.keyCode == 13) {
                e.preventDefault();
                console.log("keyPressed");
                $scope.login();
            }
        });

        function fieldsValid() {
            return $scope.loginForm.username && $scope.loginForm.password;
        }
    });