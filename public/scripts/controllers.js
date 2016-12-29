(function() {
  'use strict';
  angular.module('app')
  .controller('RecipesController', function($scope,dataService,$location) {
    
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

//    $scope.deleteRecipe = (recipe,$index) => {
//      console.log(recipe._id);
//      dataService.deleteRecipe(recipe._id,function(response){
//      console.log(response);
//      init();
//    });
//      $scope.recipes.splice($index,1);
//    }

    $scope.addRecipe = () => {
      $location.path('/add');
    }
    
    init();
  })
  .controller('RecipeDetailController', function($scope,dataService,$location) {
    
    const init = () => {
      let id = $location.path();
      id = id.slice(6);
      let category;
      console.log(id);

      dataService.getID(id,function(response) {
        $scope.recipe = response.data;
        $scope.title = response.data.name || 'Add New Recipe.';
        category = response.data.category;
      });

      dataService.getAllCategories(function (response) {
        $scope.categories = response.data;
        let index = response.data.findIndex(item => item.name === category);
        if (index === -1) {
          $scope.initial = {"name": "Choose a Category"};
        } else {
          $scope.initial = $scope.categories[index];
        }
      });

      dataService.getAllFoodItems(function (response) {
        $scope.foods = response.data;
        $scope.foodDefault = $scope.foods[4];
      });
    }
    
    $scope.addIngredient = () => {
//      console.log($scope.recipe);
      let ingredient = '';
      $scope.recipe.ingredients.push('');
    };

    $scope.ingredientDetails = function(ingredient) {
      if (ingredient === null) {
        $scope.condition = '';
        $scope.amount = '';
      } else {
        $scope.condition = ingredient.condition;
        $scope.amount = ingredient.amount;
      }
    };

    $scope.cancelChanges = () => {
      $location.path('/');
    }

    init();

  });
}());