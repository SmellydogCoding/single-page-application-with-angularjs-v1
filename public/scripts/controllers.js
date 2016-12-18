(function() {
  'use strict';
  angular.module('app')
  .controller('RecipesController', function($scope,dataService) {
    
    dataService.getAll(function(response) {
      $scope.recipes = response.data;
    });

    $scope.selectCategory = function(category) {
      dataService.getCategory(category,function(response) {
        $scope.recipes = response.data;
      });
    };

  });
}());