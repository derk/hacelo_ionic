/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('cartCtrl', function($scope, StorageFactory, Market) {
    $scope.items = StorageFactory.init();
    $scope.subtotal = 0;

    angular.forEach($scope.items.market, function(value){
        $scope.subtotal = $scope.subtotal + value.price;
    });

    $scope.delete = function ($index) {
        StorageFactory.deleteNode($index);
        init();
    };

    var init = function(){
        $scope.items = StorageFactory.init();
        $scope.subtotal = 0;

        angular.forEach($scope.items.market, function(value){
            $scope.subtotal = $scope.subtotal + value.price;
        });
    };

    init();
});