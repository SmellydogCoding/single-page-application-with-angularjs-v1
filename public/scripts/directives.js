(function() {
  'use strict';
  angular.module('app')
  /**
   * html template for the delete recipe confirmation dialog box
   * @memberof app
   * @ngdoc directive
   * @name confirm
   * @example
    * <div class="confirmWrapper">
    * <div class="confirm">
    * <p>
    * Are you sure that you want to delete<br>the {{vm.toDelete}} recipe?
    * </p>
    * <button ng-click="vm.deleteIt()">Yes</button>
    * <button ng-click="vm.hidden = true">No</button>
    * </div>
    *</div>
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
   * @name errors~
   * @example
    * <div class="errors" ng-hide="!errorMessage.message">
    * <p>{{errorMessage.message}}</p>
    * <p ng-hide="!errorMessage.reason.data">What happened: {{errorMessage.reason.data}}</p>
    * <p ng-hide="!errorMessage.reason.message">What happened: {{errorMessage.reason.message}}</p>
    * <p ng-hide="!errorMessage.reason.status">Why it happened: {{errorMessage.reason.status}} {{errorMessage.reason.statusText}}</p>
    * <p ng-hide="!errorMessage.reason.stack">Why it happened: {{errorMessage.reason.stack}}</p>
    * <p>Please wait a few minutes and try again.<br>If you keep getting the same error message, please tell the website owner.</p>
    * </div>
   */
  .directive('errors', function() {
    return {
      templateUrl: 'templates/errors.html'
    };
  });
}());