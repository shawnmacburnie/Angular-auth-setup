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
          auth: ["ResolverService",
            function(ResolverService) {
              return ResolverService();
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
          auth: ["ResolverService",
            function(ResolverService) {
              return ResolverService();
            }
          ]
        }
      });
  }).run(function($rootScope, $location, $http, UserAuthentication) {
    UserAuthentication.init();
  });