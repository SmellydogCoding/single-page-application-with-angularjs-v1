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

    this.getAllCategories = function () {
      $http.get('http://localhost:5000/api/categories')
      .then(function success(response) {
        return response.data;
      },
        function error(response) {
          console.log('something went wrong');
        });
    };

    this.getAllFoodItems = function () {
      $http.get('http://localhost:5000/api/fooditems')
      .then(function success(response) {
        return response.data;
      },
        function error(response) {
          console.log('something went wrong');
        });
    };

    this.getCategory = function (category) {
      $http.get('http://localhost:5000/api/recipes?category=' + category)
      .then(function success(response) {
        return response.data;
      },
        function error(response) {
          console.log('something went wrong');
        });
    };

    this.getID = function (id) {
      $http.get('http://localhost:5000/api/recipes/' + id)
      .then(function success(response) {
        return response.data;
      },
        function error(response) {
          console.log('something went wrong');
        });
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

    this.deleteRecipe = function (id,data) {
      $http.delete('http://localhost:5000/api/recipes' + id, data)
      .then(function success(response) {
        return response.data;
      },
        function error(response) {
          console.log('something went wrong');
        });
    };
  
  });
}());