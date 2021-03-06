describe("Unit Testing Controllers", function() {

  beforeEach(angular.mock.module('app'));
  
  let $scope;
  let getAllRecipesMock;
  let getAllInACategoryMock;
  
  beforeEach(inject(function(_$controller_,_$rootScope_,$q) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    
    getAllRecipesMock = {
      getAllRecipes: function(callback) {
        let response = {
          data: [{name: "all the recipes"}]
        };
        var deferred = $q.defer();
        deferred.resolve(response);
        return deferred.promise;
      }            
    }

    deleteRecipesMock = {
      deleteRecipes: function(callback) {
        let response = {
          data: [{name: "recipe deleted"}]
        };
        var deferred = $q.defer();
        deferred.resolve(response);
        return deferred.promise;
      }            
    }

  }));
  
  it('has a test to test that tests are testing', function() {
    expect(2 + 2).toEqual(4);
  });

  it('should have a RecipesController', function() {
    const controller = $controller('RecipesController',{$scope:$scope});
    expect(controller).toBeDefined();
  });

  it('should have a RecipeDetailController', function() {
    const controller = $controller('RecipeDetailController',{$scope:$scope});
    expect(controller).toBeDefined();
  });

  it('should call the getAllRecipes service and return all the recipes', inject(function() {
    const controller = $controller('RecipesController',{$scope:$scope,dataService:getAllRecipesMock});
    $scope.$digest();
    expect(controller.recipes).toEqual([{name: "all the recipes"}]);
  }));
  
  it('should remove duplicate categories', function() {
    const controller = $controller('RecipesController',{$scope:$scope});
    let data = [{'category':'dog'},{'category':'cat'},{'category':'horse'},{'category':'dog'},{'category':'cow'}];
    controller.getCategories(data);
    expect(controller.categories).toEqual(['dog','cat','horse','cow']);
  });
  
  it('should take you to the /add route when the addRecipe method is called', inject(function($location) {
    const controller = $controller('RecipesController',{$scope:$scope});
    controller.addRecipe();
    expect($location.path()).toEqual('/add');
  }));

});