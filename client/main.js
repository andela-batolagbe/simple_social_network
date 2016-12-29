'use strict';

var app = angular.module('socialApp', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'ngStorage', 'ngFileUpload', 'ngToast']);

/**
 * [App Configurations]
 * @param  {angular method} $stateProvider     [app state configuration]
 * @param  {angular method} $urlRouterProvider [routes configuration]
 * @param  {angular method} $locationProvider  [location configuration]
 * @param  {angular method} $mdThemingProvider [for theme configuration]
* @param  {angular method}  ngToastProvider    [for toast notifications configuration]
 */
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', 'ngToastProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, ngToastProvider) {

    $stateProvider
      .state('home', {
        url: "/",
        views: {
          '': {
            templateUrl: '/static/views/home-view.html'
          },
          'addPostView@home': {
            templateUrl: '/static/views/add-post-view.html',
            controller: 'MainCtrl'
          },
          'postsList@home': {
            templateUrl: '/static/views/posts-view.html',
            controller: 'MainCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise("/");
    //use HTML5 mode
    $locationProvider.html5Mode(true);

    $mdThemingProvider
    .theme('default')
    .primaryPalette('green')
    .accentPalette('green')
    .warnPalette('red')

    ngToastProvider.configure({
      animation: 'slide'
    });

  }
]);
