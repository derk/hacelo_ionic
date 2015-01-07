controllers.controller('confirmOrderCtrl', ['$scope', '$ionicPopup', 'MessageService', 'ShoppingCartFactory','Payment', function($scope, $ionicPopup, Messages, ShoppingCartFactory,Payment) {
    $scope.cart = ShoppingCartFactory.loadShoppingCart();

   console.log($scope.cart);

}]);