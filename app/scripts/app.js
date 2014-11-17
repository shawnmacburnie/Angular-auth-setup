'use strict';

/**
 * @ngdoc overview
 * @name selfStatsApp
 * @description
 * # selfStatsApp
 *
 * Main module of the application.
 */
angular
  .module('selfStatsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'ui.bootstrap',
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          auth: ["$q", "UserAuthentication",
            function($q, UserAuthentication) {
              var userInfo = UserAuthentication.getUserInfo();

              if (userInfo) {
                return $q.when(userInfo);
              } else {
                return $q.reject({
                  authenticated: false
                });
              }
            }
          ]
        }
      })
      .state('home.about', {
        url: 'about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        parent: 'home',
        resolve: {
          auth: ["$q", "UserAuthentication",
            function($q, UserAuthentication) {
              var userInfo = UserAuthentication.getUserInfo();

              if (userInfo) {
                return $q.when(userInfo);
              } else {
                return $q.reject({
                  authenticated: false
                });
              }
            }
          ]
        }
      });
  }).run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function(userInfo) {
      console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
      if (eventObj.authenticated === false) {
        $location.path("/login");
      }
    });
  });