(function() {
  'use strict';
  angular.module('app')
  .service('dataService', function($http,errors,httpErrors) {
    
    this.getAllRecipes = function () {
     return $http.get('http://localhost:5000/api/recipes');
    };

    this.getAllCategories = function () {
      return $http.get('http://localhost:5000/api/categories');
    };

    this.getAllFoodItems = function () {
      return $http.get('http://localhost:5000/api/fooditems');
    };

    this.getCategory = function(category) {
      return $http.get('http://localhost:5000/api/recipes?category=' + category);
    };

    this.getID = function (id) {
      return $http.get('http://localhost:5000/api/recipes/' + id);
    };

    this.updateID = function (recipe) {
      return $http.put('http://localhost:5000/api/recipes/' + recipe._id, recipe);
    };

    this.addRecipe = function (recipe) {
      return $http.post('http://localhost:5000/api/recipes', recipe)
    };

    this.deleteRecipe = function (id) {
      return $http.delete('http://localhost:5000/api/recipes/' + id)
    };
    
  });
}());