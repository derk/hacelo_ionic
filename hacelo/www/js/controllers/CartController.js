/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('cartCtrl', function($scope, StorageService, ShoppingCartFactory) {
    $scope.items = StorageService.load();
    console.log(ShoppingCartFactory.loadShoppingCart().orders[0]);
    $scope.subtotal = 0;

    angular.forEach($scope.items.orders, function(value){
        $scope.subtotal = $scope.subtotal + value.price;
    });

    $scope.delete = function ($index) {
        StorageService.deleteNode($index);
        init();
    };

    var init = function(){
        $scope.items = StorageService.load();
        $scope.subtotal = 0;

        angular.forEach($scope.items.market, function(value){
            $scope.subtotal = $scope.subtotal + value.price;
        });
    };

    init();
});