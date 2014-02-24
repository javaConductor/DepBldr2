'use strict';

var theModule = angular.module('DependencyBuilder', [
      'ngResource',
      'ui.bootstrap'    ]);

theModule.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: "DependencyBuilderCtrl"
      })
      .otherwise({
        redirectTo: '/'
      });
  });
