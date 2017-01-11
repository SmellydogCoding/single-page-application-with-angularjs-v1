(function() {
  'use strict';
  angular.module('app', ['ngRoute'])
  .run(function($rootScope) {
    $rootScope.addError = (message) => {
      $rootScope.errorMessage = message;
      console.log($rootScope.errorMessage);
    }
  })
  .factory("errors", function($rootScope) {
    return {
      catch: function(message){
        return function(reason){
          $rootScope.addError({message: 'Something Went Wrong!', reason: reason});
        };
      }
    };
  })
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