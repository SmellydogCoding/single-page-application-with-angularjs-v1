(function() {
  'use strict';
  angular.module('app')
  /**
   * @memberof app
   * @ngdoc controller
   * @name RecipeController
   * @param dataservice {service} data service
   * @param $location {service} location service
   * @param errors {factory} error handler
   * @param httpErrors {factory} http error handler
   */
  .controller('RecipesController', function(dataService,$location,errors,httpErrors) {
    
    /**
     * @memberof RecipeController
     * @attr {expression} controllerAs vm
     */
    const vm = this;
   
    /**
     * Initialize the recipe page
     * 
     * hides delete recipe confirmation dialog box
     * 
     * calls getAllRecipes data service
     * 
     * handles exceptions and http errors
     * 
     * passes returned object to getCategories function
     * 
     * @memberof RecipeController
     * @function init
     * @scope recipe
     */
    vm.init = () => {
      
      vm.hidden = true;
    /**
     * @memberof RecipeController
     * @function getAllRecipes
     * @returns {promise} object containing all recipes
     */
      let allRecipes = dataService.getAllRecipes();
      allRecipes.then(function(response) {
        vm.recipes = response.data;
        vm.getCategories(response.data);
      },httpErrors.display('HTTP Error'))
      .catch(errors.catch());
    }

    /**
     * calls getCategory data service
     * 
     * handles exceptions and http errors
     * 
     * passes returned object to getCategories function
     * 
     * @memberof RecipeController
     * @function selectCategory
     */
    vm.selectCategory = (category) => {
      if (category === null) {
        vm.init();
      } else {
     /**
     * @memberof RecipeController
     * @function getCategory
     * @param {string} category category choosen by user on the recipe page
     * @returns {promise} object containing all recipes in the specified category
     */
        let allRecipesInACategory = dataService.getCategory(category);
        allRecipesInACategory.then(function(response) {
          vm.recipes = response.data;
        },httpErrors.display('HTTP Error'))
        .catch(errors.catch());
      }
    }
    
    /**
     * takes the response from the getAllRecipes data service and extracts all recipe categories and places the result in an array
     * 
     * array has no duplicate categories
     * 
     * After I wrote this function I realized that there was already a getAllCategories data service.  I left this function in the app to practice using Sets. 
     * @memberof RecipeController
     * @function getCategories
     * @param {object} data response from the getAllRecipes data service
     * @returns {array} array with all available categories of recipes
     */
    vm.getCategories = (data) => {
      let categories = new Set();
      for (let item of data) {
        categories.add(item.category);
      }
      vm.categories = Array.from(categories);
    };

    /**
     * redirects to the /add route when the add recipe button is clicked by the user
     * @memberof RecipeController
     * @function addRecipe
     */
    vm.addRecipe = () => {
      $location.path('/add');
    }
    
    /**
     * sets the name of the recipe that the user wants to delete to the toDelete scope
     * 
     * shows delete recipe confirmation dialog box
     * 
     * if user confirms deletion, run deletIt function
     * @memberof RecipeController
     * @function deleteRecipe
     * @param {object} recipe the recipe on the recipe page where the user clicks the delete button
     * @param {number} $index the index position of the recipe object in the recipes scope
     * calls deleteRecipe data service
     * 
     * reinitializes recipe page if no errors
     * 
     * handles exceptions and http errors
     * 
     * @function deleteIt
     * @returns {promise} returns either no data or errors
     */
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

  /**
   * @memberof app
   * @ngdoc controller
   * @name RecipeDetailController
   * @param $scope {service} $scope service
   * @param dataservice {service} data service
   * @param $location {service} location service
   * @param errors {factory} error handler
   * @param httpErrors {factory} http error handler
   */
  .controller('RecipeDetailController', function($scope,dataService,$location,errors,httpErrors) {
    const vm = this;

    /**
     * Initialize the recipe detail page
     * 
     * if editing current recipe: 
     * 
     * gets the recipe id from the url path
     * 
     * calls the getID service
     * 
     * sets response to the recipe, title, and editCategory scope
     * 
     * if editing new recipe:
     * 
     * creates new object and sets it to recipe scope
     * 
     * sets title scope
     * 
     * call the getAllCategories data service
     * 
     * Call getAllFoodItems data service
     * 
     * @memberof RecipeDetailController
     * @function init
     * @returns {promise} object containing all recipes
     * @returns {object} recipe object with blank data
     */
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
      
     /**
     * get all of the recipe categories
     * 
     * if editing current recipe, set default category to recipe category
     * 
     * if new recipe, set default category to Choose a Category
     * 
     * handles exceptions and http errors
     * @memberof RecipeDetailController
     * @function getAllCategories
     * @returns {promise} object containing all categories
     */
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
        
     /**
     * get all of the food item names
     * 
     * handles exceptions and http errors
     * @memberof RecipeDetailController
     * @function getAllFoodItems
     * @returns {promise} object containing all food names
     */
      let getAllTheFoods = dataService.getAllFoodItems();
      getAllTheFoods.then(function(response) {
        vm.foods = response.data;
      },httpErrors.display('HTTP Error'))
        .catch(errors.catch());
    }
    
    /**
     * add food items select and input fields or step input fields to the recipe detail page
     * 
     * @memberof RecipeDetailController
     * @function addItem
     * @param {string} item ingredient or step
     * @returns {array} array with new ingredient or step items
     */
    vm.addItem = (item) => {
      if (item === 'ingredient') {
        vm.recipe.ingredients.push({amount: "amount", condition: "condition", foodItem: ""});
      } else if (item === 'step') {
        vm.recipe.steps.push({description: "description"});
      }
    };

     /**
     * delete food items select and input fields or step input fields from the recipe detail page
     * @memberof RecipeDetailController
     * @function deleteItem
     * @param {string} item ingredient or step
     * @param {number} $index the index position of the recipe object in the recipes scope
     * @returns {array} array with ingredient or step items removed
     */
    vm.deleteItem = (item,$index) => {
      if (item === 'ingredient') {
        vm.recipe.ingredients.splice($index,1);
      } else if (item === 'step') {
        vm.recipe.steps.splice($index,1);
      }
      
    }

    /**
     * save changes to existing recipe or save new recipe
     * if errors, build error array to display on the recipe detail page
     * @memberof RecipeDetailController
     * @function saveChanges
     * @param {string} recipe recipe to be saved
     */
    vm.saveChanges = (recipe) => {
      /**
       * @memberof RecipeDetailController
       * @property errors {array} hold any errors
       */
      vm.errors = [];

      /**
       * @memberof RecipeDetailController
       * @function buildErrorArray
       * @param {array} errorArray array containing error data
       * @return {array} array of error messages set to the errors scope 
       */
      const buildErrorArray = (errorArray) => {
        for (let item of errorArray) {
          vm.errors.push(item.userMessage);
        }
      }

      /**
       * @memberof RecipeDetailController
       * @function collectErrors
       * @param {object} response error response from the api
       */
      const collectErrors = (response) => {
        if (response.data.errors.category) { buildErrorArray(response.data.errors.category) }
        if (response.data.errors.ingredients) { buildErrorArray(response.data.errors.ingredients) }
        if (response.data.errors.name) { buildErrorArray(response.data.errors.name) }
        if (response.data.errors.steps) { buildErrorArray(response.data.errors.steps) }
      }

      /**
     * if current recipe, call the updateID data service
     * 
     * if error, call collectErrors function
     * @memberof RecipeDetailController
     * @function updateID
     * @param {string} recipe recipe to be saved
     */
      if (recipe._id) {
        let updateRecipe = dataService.updateID(recipe);
        updateRecipe.then(function(response) {
          $location.path('/');
          }, function(response) {
            collectErrors(response)
        }).catch(errors.catch());
     /**
     * if new recipe, call the addRecipe data service
     * 
     * if error, call collectErrors function
     * @memberof RecipeDetailController
     * @function addRecipe
     * @param {string} recipe recipe to be saved
     */
      } else {
        let addNewRecipe = dataService.addRecipe(recipe);
        addNewRecipe.then(function(response) {
          $location.path('/');
          }, function(response) {
            collectErrors(response)
        }).catch(errors.catch());
      }
      
    }

    /**
     * redirects to the / route when the cancel button is clicked by the user
     * @memberof RecipeDetailController
     * @function cancelChanges
     */
    vm.cancelChanges = () => {
      $location.path('/');
    }

    init();

  });
}());