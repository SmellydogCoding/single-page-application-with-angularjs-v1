(function() {
  'use strict';
  angular.module('app')
  /**
   * html template for the delete recipe confirmation dialog box
   * @memberof app
   * @ngdoc directive
   * @name confirm
   */
  .directive('confirm', function() {
    return {
      templateUrl: 'templates/confirm.html'
    };
  })
  /**
   * html template for exception errors and http errors
   * @memberof app
   * @ngdoc directive
   * @name errors
   */
  .directive('errors', function() {
    return {
      templateUrl: 'templates/errors.html'
    };
  });
}());