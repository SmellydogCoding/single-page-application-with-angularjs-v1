(function() {
  'use strict';
  angular.module('app')
  .service('dataService', function($http,errors,httpErrors) {
    
    this.getAllRecipes = function (callback) {
      $http.get('http://localhost:5000/api/recipes')
      .then(callback,httpErrors.display('HTTP Error'))
      .catch(errors.catch());
    };

    this.getAllCategories = function (callback) {
      $http.get('http://localhost:5000/api/categories')
      .then(callback,httpErrors.display('HTTP Error'))
      .catch(errors.catch());
    };

    this.getAllFoodItems = function (callback) {
      $http.get('http://localhost:5000/api/fooditems')
      .then(callback,httpErrors.display('HTTP Error'))
      .catch(errors.catch());
    };

    this.getCategory = function(category,callback) {
      $http.get('http://localhost:5000/api/recipes?category=' + category)
      .then(callback,httpErrors.display('HTTP Error'))
      .catch(errors.catch());
    };

    this.getID = function (id,callback) {
      $http.get('http://localhost:5000/api/recipes/' + id)
      .then(callback,httpErrors.display('HTTP Error'))
      .catch(errors.catch());
    };

    this.updateID = function (data,success,error) {
      $http.put('http://localhost:5000/api/recipes/' + data._id, data)
      .then(success,error).catch(errors.catch());
    };

    this.addRecipe = function (data,success,error) {
      $http.post('http://localhost:5000/api/recipes', data)
      .then(success,error).catch(errors.catch());
    };

    this.deleteRecipe = function (id,callback) {
      $http.delete('http://localhost:5000/api/recipes/' + id)
      .then(callback,httpErrors.display('HTTP Error'))
      .catch(errors.catch());
    };
    
  });
}());