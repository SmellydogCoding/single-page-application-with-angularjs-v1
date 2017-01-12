(function() {
  'use strict';
  angular.module('app')
  .service('dataService', function($http,errors,httpErrors) {
    
    this.getAllRecipes = function () {
     return $http.get('http://localhost:5000/api/recipes');
    };

    this.getAllCategories = function () {
      return $http.get('http://localhost:5000/api/categories')
    };

    this.getAllFoodItems = function () {
      return $http.get('http://localhost:5000/api/fooditems')
    };

    this.getCategory = function(category) {
      return $http.get('http://localhost:5000/api/recipes?category=' + category)
    };

    this.getID = function (id) {
      return $http.get('http://localhost:5000/api/recipes/' + id)
    };

    this.updateID = function (data,success,error) {
      $http.put('http://localhost:5000/api/recipes/' + data._id, data)
      .then(success,error).catch(errors.catch());
    };

    this.addRecipe = function (data,success,error) {
      $http.post('http://localhost:5000/api/recipes', data)
      .then(success,error).catch(errors.catch());
    };

    this.deleteRecipe = function (id) {
      return $http.delete('http://localhost:5000/api/recipes/' + id)
    };
    
  });
}());