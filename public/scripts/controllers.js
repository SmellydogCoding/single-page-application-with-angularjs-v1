(function() {
  'use strict';
  angular.module('app')
  .controller('RecipesController', function($scope,dataService) {
    dataService.getAll(function (response) {
      console.log(response.data);
      $scope.recipes = response.data;
    });
  });
}());