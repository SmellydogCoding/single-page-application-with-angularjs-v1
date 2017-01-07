//
// test/unit/controllers/controllersSpec.js
//
describe("Unit: Testing Controllers", function() {

  beforeEach(angular.mock.module('app'));
  
  let controller1;
  let controller2;
  let scope;
  
  
  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));
  
  it('has a test to test the test', function() {
    expect(2 + 2).toEqual(4);
  });

  it('should have a RecipesController', function() {
    let $scope = {};
    const controller = $controller('RecipesController',{$scope:$scope});
    expect(controller).toBeDefined();
  });

  it('should have a RecipeDetailController', function() {
    let $scope = {};
    const controller = $controller('RecipeDetailController',{$scope:$scope});
    expect(controller).toBeDefined();
  });
  
  it('should remove duplicate categories', function() {
    let $scope = {};
    const controller = $controller('RecipesController',{$scope:$scope});
    let data = [{'category':'dog'},{'category':'cat'},{'category':'horse'},{'category':'dog'},{'category':'cow'}];
    controller.getCategories(data);
    expect(controller.categories).toEqual(['dog','cat','horse','cow']);
  });
  
  it('should take you to the /add route when the addRecipe method is called', inject(function($location) {
    let $scope = {};
    const controller = $controller('RecipesController',{$scope:$scope});
    controller.addRecipe();
    expect($location.path()).toEqual('/add');
  }));

});