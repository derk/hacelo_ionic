/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('cartCtrl', function($scope, ShoppingCartFactory) {
    $scope.cart = ShoppingCartFactory.loadShoppingCart();

    $scope.removeOrder = function (pOrderToRemove) {
        // es posible que luego tengamos que agregar un mensaje de confirmacion aca.
        ShoppingCartFactory.removeOrder(pOrderToRemove.id);
    };
});