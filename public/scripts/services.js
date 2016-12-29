(function() {
  'use strict';
  angular.module('app')
  .service('dataService', function($http) {
    
    this.getAll = function (callback) {
      $http.get('http://localhost:5000/api/recipes')
      .then(callback,
        function error(response) {
          console.log('something went wrong');
        });
    };

    this.getAllCategories = function (callback) {
      $http.get('http://localhost:5000/api/categories')
      .then(callback,
        function error(response) {
          console.log('something went wrong');
        });
    };

    this.getAllFoodItems = function (callback) {
      $http.get('http://localhost:5000/api/fooditems')
      .then(callback,
        function error(response) {
          console.log('something went wrong');
        });
    };

    this.getCategory = function(category,callback) {
      $http.get('http://localhost:5000/api/recipes?category=' + category)
      .then(callback,
        function error(response) {
          console.log('something went wrong');
        }).catch(function(e) {console.log(e)});
    };

    this.getID = function (id,callback) {
      $http.get('http://localhost:5000/api/recipes/' + id)
      .then(callback,
        function error(response) {
          console.log('something went wrong');
        }).catch(function(e) {console.log(e)});
    };

    this.updateID = function (id,data) {
      $http.put('http://localhost:5000/api/recipes/' + id, data)
      .then(function success(response) {
        return response.data;
      },
        function error(response) {
          console.log('something went wrong');
        });
    };

    this.addRecipe = function (data) {
      $http.put('http://localhost:5000/api/recipes', data)
      .then(function success(response) {
        return response.data;
      },
        function error(response) {
          console.log('something went wrong');
        });
    };

    this.deleteRecipe = function (id) {
      $http.delete('http://localhost:5000/api/recipes/' + id)
      .then(function success(response) {
        return response.data;
      },
        function error(response) {
          console.log('something went wrong');
        });
    };
  
  });
}());