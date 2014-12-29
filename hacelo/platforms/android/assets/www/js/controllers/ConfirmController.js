/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('confirmCtrl', ['$scope', '$state', '$ionicPopup', 'MessageService', 'ShoppingCartFactory', 'SelectedImagesFactory', function ($scope, $state, $ionicPopup, Messages, ShoppingCartFactory, SelectedImagesFactory) {
    var cart = ShoppingCartFactory.loadShoppingCart();
    /*
     * Create a new order based on the selected: product line, product, and images
     * */
    if (angular.isObject($scope.actualOrder)){
        $scope.actualOrder = null; // trash collector help
    }

    $scope.actualOrder = cart.getDummyOrder(
        SelectedImagesFactory.getProductLine(),
        SelectedImagesFactory.getProduct(),
        SelectedImagesFactory.getToPrintOnes()
    );

    $scope.addToCart = function(){
        // todo: revisar porque no se estan enviando los parametros por URL hacia el estado app.added
        var stateParams = {
                productName: SelectedImagesFactory.getProduct().name
            },
            cache;

        cart.addOrder($scope.actualOrder);

        // Checking if the order was saved
        if(ShoppingCartFactory.saveShoppingCart()) {
            SelectedImagesFactory.clearSelection();
            $state.go("app.added",stateParams);
        } else {
            var cache = angular.isDefined(cache) ? cache: Messages.search("shopping_cart_full");
            $ionicPopup.alert(cache);
        }
    };
}]);