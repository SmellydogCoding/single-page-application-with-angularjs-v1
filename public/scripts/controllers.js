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

    $scope.addRecipe = () => {
      $location.path('/add');
    }
    
    $scope.deleteRecipe = (recipe,$index) => {
      dataService.deleteRecipe(recipe._id,function(response) {
        if (response.data === '') {
          init();
        } else {
          console.log('something weird just happened:',response);
        }
      });
    }

    init();
  })
  .controller('RecipeDetailController', function($scope,dataService,$location) {
    
    const init = () => {
      const path = $location.path();
      if (path.includes("edit")) {
        let id = path.slice(6);
        dataService.getID(id,function(response) {
          $scope.recipe = response.data;
          $scope.title = response.data.name;
          $scope.editCategory = response.data.category;
        });
      } else if (path.includes("add")) {
        $scope.recipe = {
          name: "",
          description: "",
          category: "",
          prepTime: 0,
          cookTime: 0,
          ingredients: [
            {
              foodItem: "",
              condition: "",
              amount: ""
            }
          ],
          steps: [
            {
              description: ""
            }
          ]
        }
        $scope.title = 'Add New Recipe.'
      }

      dataService.getAllCategories(function (response) {
        $scope.categories = response.data;
        let index = response.data.findIndex(item => item.name === $scope.editCategory);
        if (index === -1) {
          $scope.initial = {"name": "Choose a Category"};
        } else {
          $scope.initial = $scope.categories[index];
        }
      });

      dataService.getAllFoodItems(function (response) {
        $scope.foods = response.data;
      });
    }
    
    $scope.addItem = (item) => {
      if (item === 'ingredient') {
        $scope.recipe.ingredients.push({amount: "amount", condition: "condition", foodItem: ""});
      } else if (item === 'step') {
        $scope.recipe.steps.push({description: "description"});
      }
    };

    $scope.deleteItem = (item,$index) => {
      if (item === 'ingredient') {
        $scope.recipe.ingredients.splice($index,1);
      } else if (item === 'step') {
        $scope.recipe.steps.splice($index,1);
      }
      
    }

    $scope.saveChanges = (recipe) => {
      dataService.addRecipe(recipe,function(response) {
        // redirect home
      }, function(response) {
        console.log(response);
        $scope.errors = [];
        const buildErrorArray = (errorArray) => {
          for (let item of errorArray) {
            $scope.errors.push(item.userMessage);
          }
        }
        if (response.data.errors.category) { buildErrorArray(response.data.errors.category) }
        if (response.data.errors.ingredients) { buildErrorArray(response.data.errors.ingredients) }
        if (response.data.errors.name) { buildErrorArray(response.data.errors.name) }
        if (response.data.errors.steps) { buildErrorArray(response.data.errors.steps) }
        console.log($scope.errors);
      });
    }

    $scope.cancelChanges = () => {
      $location.path('/');
    }

    init();

  });
}());