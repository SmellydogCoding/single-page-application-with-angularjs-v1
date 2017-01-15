(function() {
  'use strict';
  angular.module('app', ['ngRoute'])
  .run(function($rootScope) {
    $rootScope.addError = (message) => {
      $rootScope.errorMessage = message;
      console.log($rootScope.errorMessage);
    }
  })
  /**
   * Take errors from the controllers and pass them to the default error handler
   * @memberof app
   * @ngdoc factory
   * @name errors
   * @param $rootScope {service} $rootScope
   */
  .factory("errors", function($rootScope) {
    return {
      catch: function(message){
        return function(reason){
          $rootScope.addError({message: 'Something Went Wrong!', reason: reason});
        };
      }
    };
  })
  /**
   * Take http errors from the controllers and pass them to the default error handler
   * @memberof app
   * @ngdoc factory
   * @name httpErrors
   * @param $rootScope {service} $rootScope
   */
  .factory("httpErrors", function($rootScope) {
    return {
      display: function(message) {
        return function(reason) {
          $rootScope.addError({message: 'Something went Wrong! (HTTP Error)', reason: reason});
          console.log(reason);
          console.log(message);
        };
      }
    };
  })
  /**
   * Takes custom error messages and injects them into the default error handler
   * @memberof app
   * @ngdoc config
   */
  .config(function($provide){
    $provide.decorator("$exceptionHandler", function($delegate, $injector){
      return function(exception, cause){
        var $rootScope = $injector.get("$rootScope");
        $rootScope.addError({message:"Exception", reason:exception});
        $delegate(exception, cause);
      };
    });
  });
}());