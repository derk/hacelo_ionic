/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('confirmCtrl', ['$scope', 'ShoppingCartFactory', 'SelectedImagesFactory', function ($scope, ShoppingCartFactory, SelectedImagesFactory) {
    var cart = ShoppingCartFactory.loadShoppingCart();
    $scope.actualOrder = ShoppingCartFactory.getActualOrder();

    if(angular.isObject($scope.actualOrder) === false){
        var dummyOrder = cart.getDummyOrder(
            SelectedImagesFactory.getProductLine(),
            SelectedImagesFactory.getProduct(),
            SelectedImagesFactory.getImagesAfterEdited()
        );
        $scope.actualOrder = dummyOrder;
    }

    $scope.addToCart = function(){
        cart.addOrder($scope.actualOrder);
        ShoppingCartFactory.saveShoppingCart();
        ShoppingCartFactory.setActualOrder(null); // remove already saved order
        SelectedImagesFactory.clearSelection(); // remove already selected images as well the productLine and product
    };
}]);