(function() {
  'use strict';
  angular.module('app')
  .controller('RecipesController', function($scope,dataService) {
    
    const init = () => {
      dataService.getAll(function(response) {
        $scope.recipes = response.data;
        getCategories(response.data);
      });
    }

    $scope.selectCategory = function(category) {
      console.log(category);
      if (category === null) {
        init();
      } else {
        dataService.getCategory(category,function(response) {
          $scope.recipes = response.data;
        });
      }
    };
    
    const getCategories = (data) => {
      let categories = new Set();
      for (let item of data) {
        categories.add(item.category);
      }
      $scope.categories = Array.from(categories);
      console.log('scope.categories', $scope.categories);
    };
    
    init();
  });
}());