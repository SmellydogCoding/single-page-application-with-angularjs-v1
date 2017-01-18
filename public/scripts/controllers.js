'use strict';

(function () {
  'use strict';

  angular.module('app')
  /**
   * @memberof app
   * @ngdoc controller
   * @name RecipesController
   * @param dataservice {service} data service
   * @param $location {service} location service
   * @param errors {factory} error handler
   * @param httpErrors {factory} http error handler
   */
  .controller('RecipesController', function (dataService, $location, errors, httpErrors) {

    /**
     * @memberof RecipesController
     * @name this
     * @type {constant}
     * @description use controller as vm
    */
    var vm = this;

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
     * @memberof RecipesController
     * @function init
     * @scope recipe
     */
    vm.init = function () {

      vm.hidden = true;
      /**
       * @memberof RecipesController
       * @function getAllRecipes
       * @returns {promise} object containing all recipes
       */
      var allRecipes = dataService.getAllRecipes();
      allRecipes.then(function (response) {
        vm.recipes = response.data;
        vm.getCategories(response.data);
      }, httpErrors.display('HTTP Error')).catch(errors.catch());
    };

    /**
     * calls getCategory data service
     * 
     * handles exceptions and http errors
     * 
     * passes returned object to getCategories function
     * 
     * @memberof RecipesController
     * @function selectCategory
     */
    vm.selectCategory = function (category) {
      if (category === null) {
        vm.init();
      } else {
        /**
        * @memberof RecipesController
        * @function getCategory
        * @param {string} category category choosen by user on the recipe page
        * @returns {promise} object containing all recipes in the specified category
        */
        var allRecipesInACategory = dataService.getCategory(category);
        allRecipesInACategory.then(function (response) {
          vm.recipes = response.data;
        }, httpErrors.display('HTTP Error')).catch(errors.catch());
      }
    };

    /**
     * takes the response from the getAllRecipes data service and extracts all recipe categories and places the result in an array
     * 
     * array has no duplicate categories
     * 
     * After I wrote this function I realized that there was already a getAllCategories data service.  I left this function in the app to practice using Sets. 
     * @memberof RecipesController
     * @function getCategories
     * @param {object} data response from the getAllRecipes data service
     * @returns {array} array with all available categories of recipes
     */
    vm.getCategories = function (data) {
      var categories = new Set();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          categories.add(item.category);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      vm.categories = Array.from(categories);
    };

    /**
     * redirects to the /add route when the add recipe button is clicked by the user
     * @memberof RecipesController
     * @function addRecipe
     */
    vm.addRecipe = function () {
      $location.path('/add');
    };

    /**
     * sets the name of the recipe that the user wants to delete to the toDelete scope
     * 
     * shows delete recipe confirmation dialog box
     * 
     * if user confirms deletion, run deletIt function
     * @memberof RecipesController
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
    vm.deleteRecipe = function (recipe, $index) {
      vm.toDelete = recipe.name;
      vm.hidden = false;
      vm.deleteIt = function () {
        vm.hidden = true;
        var deleteARecipe = dataService.deleteRecipe(recipe._id);
        deleteARecipe.then(function (response) {
          vm.init();
        }, httpErrors.display('HTTP Error')).catch(errors.catch());
      };
    };

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
  .controller('RecipeDetailController', function ($scope, dataService, $location, errors, httpErrors) {

    /**
       * @memberof RecipeDetailController
       * @name this
       * @type {constant}
       * @description use controller as vm
       */
    var vm = this;

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
    var init = function init() {
      var path = $location.path();
      if (path.includes("edit")) {
        var id = path.slice(6);
        var getRecipeByID = dataService.getID(id);
        getRecipeByID.then(function (response) {
          vm.recipe = response.data;
          vm.title = response.data.name;
          vm.editCategory = response.data.category;
        }, httpErrors.display('HTTP Error')).catch(errors.catch());
      } else if (path.includes("add")) {
        vm.recipe = {
          name: "",
          description: "",
          category: "",
          prepTime: 0,
          cookTime: 0,
          ingredients: [{
            foodItem: "",
            condition: "",
            amount: ""
          }],
          steps: [{
            description: ""
          }]
        };
        vm.title = 'Add New Recipe.';
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
      var getAllTheCategories = dataService.getAllCategories();
      getAllTheCategories.then(function (response) {
        vm.categories = response.data;
        var index = response.data.findIndex(function (item) {
          return item.name === $scope.editCategory;
        });
        if (index === -1) {
          vm.initial = { "name": "Choose a Category" };
        } else {
          vm.initial = $scope.categories[index];
        }
      }, httpErrors.display('HTTP Error')).catch(errors.catch());

      /**
      * get all of the food item names
      * 
      * handles exceptions and http errors
      * @memberof RecipeDetailController
      * @function getAllFoodItems
      * @returns {promise} object containing all food names
      */
      var getAllTheFoods = dataService.getAllFoodItems();
      getAllTheFoods.then(function (response) {
        vm.foods = response.data;
      }, httpErrors.display('HTTP Error')).catch(errors.catch());
    };

    /**
     * add food items select and input fields or step input fields to the recipe detail page
     * 
     * @memberof RecipeDetailController
     * @function addItem
     * @param {string} item ingredient or step
     * @returns {array} array with new ingredient or step items
     */
    vm.addItem = function (item) {
      if (item === 'ingredient') {
        vm.recipe.ingredients.push({ amount: "", condition: "", foodItem: "" });
      } else if (item === 'step') {
        vm.recipe.steps.push({ description: "" });
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
    vm.deleteItem = function (item, $index) {
      if (item === 'ingredient') {
        vm.recipe.ingredients.splice($index, 1);
      } else if (item === 'step') {
        vm.recipe.steps.splice($index, 1);
      }
    };

    /**
     * save changes to existing recipe or save new recipe
     * if errors, build error array to display on the recipe detail page
     * @memberof RecipeDetailController
     * @function saveChanges
     * @param {string} recipe recipe to be saved
     */
    vm.saveChanges = function (recipe) {
      /**
       * @memberof RecipeDetailController
       * @name errors
       * @type {array}
       * @description hold any errors
       */
      vm.errors = [];

      /**
       * @memberof RecipeDetailController
       * @function buildErrorArray
       * @param {array} errorArray array containing error data
       * @return {array} array of error messages set to the errors scope 
       */
      var buildErrorArray = function buildErrorArray(errorArray) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = errorArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            vm.errors.push(item.userMessage);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      };

      /**
       * @memberof RecipeDetailController
       * @function collectErrors
       * @param {object} response error response from the api
       */
      var collectErrors = function collectErrors(response) {
        if (response.data.errors.category) {
          buildErrorArray(response.data.errors.category);
        }
        if (response.data.errors.ingredients) {
          buildErrorArray(response.data.errors.ingredients);
        }
        if (response.data.errors.name) {
          buildErrorArray(response.data.errors.name);
        }
        if (response.data.errors.steps) {
          buildErrorArray(response.data.errors.steps);
        }
      };

      /**
      * if current recipe, call the updateID data service
      * 
      * if error, call collectErrors function
      * @memberof RecipeDetailController
      * @function updateID
      * @param {string} recipe recipe to be saved
      */
      if (recipe._id) {
        var updateRecipe = dataService.updateID(recipe);
        updateRecipe.then(function (response) {
          $location.path('/');
        }, function (response) {
          collectErrors(response);
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
        var addNewRecipe = dataService.addRecipe(recipe);
        addNewRecipe.then(function (response) {
          $location.path('/');
        }, function (response) {
          collectErrors(response);
        }).catch(errors.catch());
      }
    };

    /**
     * redirects to the / route when the cancel button is clicked by the user
     * @memberof RecipeDetailController
     * @function cancelChanges
     */
    vm.cancelChanges = function () {
      $location.path('/');
    };

    init();
  });
})();