/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('confirmCtrl', ['$scope', 'ShoppingCartFactory', 'SelectedImagesFactory', function ($scope, ShoppingCartFactory, SelectedImagesFactory) {
    var cart = ShoppingCartFactory.loadShoppingCart();
    $scope.actualOrder = ShoppingCartFactory.getActualOrder();

    if(angular.isUndefined($scope.actualOrder)){
        var dummyOrder = cart.getDummyOrder(
            SelectedImagesFactory.getProductLine(),
            SelectedImagesFactory.getProduct(),
            SelectedImagesFactory.getImagesAfterEdited()
        );
        $scope.actualOrder = dummyOrder;
    }

    $scope.addToCart = function(){
        ShoppingCartFactory.setActualOrder($scope.actualOrder);
        cart.addOrder($scope.actualOrder);
        ShoppingCartFactory.saveShoppingCart();
    };
}]);