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
    };
    
    init();
  })
  .controller('RecipeDetailController', function($scope,dataService,$location) {
    
    const init = () => {
      let id = $location.path();
      id = id.slice(6);

      dataService.getID(id,function(response) {
        $scope.recipe = response.data;
      });
    }

    $scope.ingredientDetails = function(ingredient) {
      if (ingredient === null) {
        $scope.condition = '';
        $scope.amount = '';
      } else {
        $scope.condition = ingredient.condition;
        $scope.amount = ingredient.amount;
      }
    };

    init();

  });
}());