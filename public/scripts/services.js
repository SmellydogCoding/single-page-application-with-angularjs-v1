(function() {
  'use strict';
  angular.module('app')
  /**
   * @memberof app
   * @ngdoc service
   * @name dataService
   * @param $http {service} http service
   * @param errors {factory} error handler
   * @param httpErrors {factory} http error handler
   */
  .service('dataService', function($http,errors,httpErrors) {
    /**
     * @memberof dataService
     * @function getAllRecipes
     * @returns {promise} object (response from the api) containing all recipes
     */
    this.getAllRecipes = function () {
     return $http.get('http://localhost:5000/api/recipes');
    };

    /**
     * @memberof dataService
     * @function getAllCategories
     * @returns {promise} object (response from the api) containing all available recipe categories
     */
    this.getAllCategories = function () {
      return $http.get('http://localhost:5000/api/categories');
    };

    /**
     * @memberof dataService
     * @function getAllFoodItems
     * @returns {promise} object (response from the api) containing all food item names
     */
    this.getAllFoodItems = function () {
      return $http.get('http://localhost:5000/api/fooditems');
    };

    /**
     * @memberof dataService
     * @function getCategory
     * @param {string} category category selected by the user
     * @returns {promise} object (response from the api) containing all recipes in the selected category
     */
    this.getCategory = function(category) {
      return $http.get('http://localhost:5000/api/recipes?category=' + category);
    };

    /**
     * @memberof dataService
     * @function getID
     * @param {string} ID id of the selected recipe
     * @returns {promise} object (response from the api) containing the recipe that matches the selected ID
     */
    this.getID = function (id) {
      return $http.get('http://localhost:5000/api/recipes/' + id);
    };

    /**
     * @memberof dataService
     * @function updateID
     * @param {object} recipe object containing the selected recipe to be updated
     * @returns {promise} object (response from the api) containing no data if successful or containing errors
     */
    this.updateID = function (recipe) {
      return $http.put('http://localhost:5000/api/recipes/' + recipe._id, recipe);
    };

    /**
     * @memberof dataService
     * @function addRecipe
     * @param {object} recipe object containing the recipe to be added
     * @returns {promise} object (response from the api) containing no data if successful or containing errors
     */
    this.addRecipe = function (recipe) {
      return $http.post('http://localhost:5000/api/recipes', recipe)
    };

    /**
     * @memberof dataService
     * @function deleteRecipe
     * @param {string} id ID of the recipe to be deleted
     * @returns {promise} object (response from the api) containing no data if successful or containing errors
     */
    this.deleteRecipe = function (id) {
      return $http.delete('http://localhost:5000/api/recipes/' + id)
    };
    
  });
}());