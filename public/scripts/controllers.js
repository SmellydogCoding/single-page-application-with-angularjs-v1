(function() {
  'use strict';
  angular.module('app')
  .controller('RecipesController', function(dataService,$location) {
    const vm = this;
    const init = () => {
      vm.hidden = true;
      dataService.getAllRecipes(function(response) {
        vm.recipes = response.data;
        getCategories(response.data);
      });
    }

    vm.selectCategory = function(category) {
      if (category === null) {
        init();
      } else {
        dataService.getCategory(category,function(response) {
          vm.recipes = response.data;
        });
      }
    };
    
    const getCategories = (data) => {
      let categories = new Set();
      for (let item of data) {
        categories.add(item.category);
      }
      vm.categories = Array.from(categories);
    };

    vm.addRecipe = () => {
      $location.path('/add');
    }
    
    vm.deleteRecipe = (recipe,$index) => {
      vm.toDelete = recipe.name;
      vm.hidden = false;
      vm.deleteIt = () => {
        vm.hidden = true;
        dataService.deleteRecipe(recipe._id,function(response) {
          if (response.data === '') {
            init();
          } else {
            console.log('something weird just happened:',response);
          }
        });
      }
    }

    init();
  })
  .controller('RecipeDetailController', function($scope,dataService,$location) {
    const vm = this;
    const init = () => {
      const path = $location.path();
      if (path.includes("edit")) {
        let id = path.slice(6);
        dataService.getID(id,function(response) {
          vm.recipe = response.data;
          vm.title = response.data.name;
          vm.editCategory = response.data.category;
        });
      } else if (path.includes("add")) {
        vm.recipe = {
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
        vm.title = 'Add New Recipe.'
      }
      
      dataService.getAllCategories(function (response) {
        vm.categories = response.data;
        let index = response.data.findIndex(item => item.name === $scope.editCategory);
        if (index === -1) {
          vm.initial = {"name": "Choose a Category"};
        } else {
          vm.initial = $scope.categories[index];
        }
      });

      dataService.getAllFoodItems(function (response) {
        vm.foods = response.data;
      });
    }
    
    vm.addItem = (item) => {
      if (item === 'ingredient') {
        vm.recipe.ingredients.push({amount: "amount", condition: "condition", foodItem: ""});
      } else if (item === 'step') {
        vm.recipe.steps.push({description: "description"});
      }
    };

    vm.deleteItem = (item,$index) => {
      if (item === 'ingredient') {
        vm.recipe.ingredients.splice($index,1);
      } else if (item === 'step') {
        vm.recipe.steps.splice($index,1);
      }
      
    }

    vm.saveChanges = (recipe) => {

      vm.errors = [];

      const buildErrorArray = (errorArray) => {
        for (let item of errorArray) {
          vm.errors.push(item.userMessage);
        }
      }

      const collectErrors = (response) => {
        if (response.data.errors.category) { buildErrorArray(response.data.errors.category) }
        if (response.data.errors.ingredients) { buildErrorArray(response.data.errors.ingredients) }
        if (response.data.errors.name) { buildErrorArray(response.data.errors.name) }
        if (response.data.errors.steps) { buildErrorArray(response.data.errors.steps) }
      }

      if (recipe._id) {
        dataService.updateID(recipe,function(response) {
          $location.path('/');
          }, function(response) {
            collectErrors(response)
        });
      } else {
        dataService.addRecipe(recipe,function(response) {
          $location.path('/');
          }, function(response) {
            collectErrors(response)
        });
      }
      
    }

    vm.cancelChanges = () => {
      $location.path('/');
    }

    init();

  });
}());