(function() {
  'use strict';
  angular.module('app')
  .directive('confirm', function() {
    return {
      templateUrl: 'templates/confirm.html'
    };
  })
  .directive('errors', function() {
    return {
      templateUrl: 'templates/errors.html'
    };
  });
}());