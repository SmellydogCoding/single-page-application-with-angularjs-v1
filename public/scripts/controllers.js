(function() {
  'use strict';
  angular.module('app')
  /** @module controllers for the app */
  .controller('RecipesController', function(dataService,$location,errors,httpErrors) {
    /** used for 'controller as' functionality*/
    const vm = this;
    /** @function */
    vm.init = () => {
      /**
      * hide the error block
      * call the Get All Recipes dataservice to get a list of all recipes
      * set response to recipes scope
      * send response to getCategories function
      */
      vm.hidden = true;
      let allRecipes = dataService.getAllRecipes();
      allRecipes.then(function(response) {
        vm.recipes = response.data;
        vm.getCategories(response.data);
        /**
        * send http errors to the http error factory
        * catch other exceptions
        */
      },httpErrors.display('HTTP Error'))
      .catch(errors.catch());
    }

    vm.selectCategory = (category) => {
      if (category === null) {
        vm.init();
      } else {
        let allRecipesInACategory = dataService.getCategory(category);
        allRecipesInACategory.then(function(response) {
          vm.recipes = response.data;
        },httpErrors.display('HTTP Error'))
        .catch(errors.catch());
      }
    }
    
    vm.getCategories = (data) => {
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
        let deleteARecipe = dataService.deleteRecipe(recipe._id);
        deleteARecipe.then(function(response) {
          vm.init();
        },httpErrors.display('HTTP Error'))
        .catch(errors.catch());  
      }
    }

    vm.init();
  })
  .controller('RecipeDetailController', function($scope,dataService,$location,errors,httpErrors) {
    const vm = this;
    const init = () => {
      const path = $location.path();
      if (path.includes("edit")) {
        let id = path.slice(6);
        let getRecipeByID = dataService.getID(id);
        getRecipeByID.then(function(response) {
          vm.recipe = response.data;
          vm.title = response.data.name;
          vm.editCategory = response.data.category;
        },httpErrors.display('HTTP Error'))
        .catch(errors.catch());
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
      
      let getAllTheCategories = dataService.getAllCategories();
      getAllTheCategories.then(function(response) {
        vm.categories = response.data;
        let index = response.data.findIndex(item => item.name === $scope.editCategory);
        if (index === -1) {
          vm.initial = {"name": "Choose a Category"};
        } else {
          vm.initial = $scope.categories[index];
        }
      },httpErrors.display('HTTP Error'))
        .catch(errors.catch());
        

      let getAllTheFoods = dataService.getAllFoodItems();
      getAllTheFoods.then(function(response) {
        vm.foods = response.data;
      },httpErrors.display('HTTP Error'))
        .catch(errors.catch());
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
        let updateRecipe = dataService.updateID(recipe);
        updateRecipe.then(function(response) {
          $location.path('/');
          }, function(response) {
            collectErrors(response)
        }).catch(errors.catch());
      } else {
        let addNewRecipe = dataService.addRecipe(recipe);
        addNewRecipe.then(function(response) {
          $location.path('/');
          }, function(response) {
            collectErrors(response)
        }).catch(errors.catch());
      }
      
    }

    vm.cancelChanges = () => {
      $location.path('/');
    }

    init();

  });
}());