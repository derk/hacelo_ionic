/**
 * Created by joseph on 25/01/2015.
 */
controllers.controller('landingCtrl', ['$scope', '$ionicLoading','ShoppingCartFactory','MessageService',function($scope, $ionicLoading, ShoppingCartFactory, MessageService) {
    $scope.cart = null;

    $ionicLoading.show({
        template: 'Cargando... '
    });

    ShoppingCartFactory.load().then(function(e){
        $scope.cart = e;
        $ionicLoading.hide();
    });

}]);
