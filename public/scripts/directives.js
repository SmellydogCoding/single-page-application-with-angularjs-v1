(function() {
  'use strict';
  angular.module('app')
  .directive('confirm', function() {
    return {
      templateUrl: 'templates/confirm.html'
    };
  });
}());