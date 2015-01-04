/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('cartCtrl', ['$scope', '$ionicPopup', 'MessageService', 'ShoppingCartFactory','Payment', function($scope, $ionicPopup, Messages, ShoppingCartFactory,Payment) {
    $scope.cart = ShoppingCartFactory.loadShoppingCart();

    $scope.removeOrder = function (pOrderToRemove) {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_order_delete"),
            confirmPopup = $ionicPopup.confirm(cache);

        confirmPopup.then(function (res) {
            if (res) {
                ShoppingCartFactory.removeOrder(pOrderToRemove.id);
            }
        });
    };

}]);


/**
 * Created by Raiam on 02/01/2015.
 */
controllers.controller('cartCheckoutCtrl', ['$scope', '$state', '$ionicPopup', 'MessageService', 'ShoppingCartFactory','Payment', function($scope, $state, $ionicPopup, Messages, ShoppingCartFactory, Payment) {
    
    $scope.cart = ShoppingCartFactory.loadShoppingCart();
    $scope.sucursal = true;

    $scope.changeSucursal = function(s){
       $scope.sucursal = s;
    };

    $scope.calculatePrice = function(){

        if($scope.sucursal == true){
            console.log("entrro");
            ShoppingCartFactory.saveTravel(0);
            $state.go("app.redeem");
        } else {
            console.log("entrro 2");
            Payment.sendWeight($scope.cart.getWeight()).then(function(response){
                ShoppingCartFactory.saveTravel(response.message.precio);
                $state.go("app.redeem");
            });
        }
        
    };
    
}]);


/**
 * Created by Raiam on 02/01/2015.
 */

controllers.controller('redeemCtrl', ['$scope', '$ionicPopup', 'MessageService', 'ShoppingCartFactory', function($scope, $ionicPopup, Messages, ShoppingCartFactory) {
    
    $scope.cart = ShoppingCartFactory.loadShoppingCart();
    $scope.userData = {};
    $scope.years = [];
    $scope.months = [];
    $scope.emisor = [
        {
            "name": "American Express", 
            "value": "AMEX"
        },
        {
            "name": "VISA", 
            "value": "VISA"
        },
        {
            "name": "Master Card", 
            "value": "MasterCard"
        }
    ]

    for(var el = 2015; el <= 2050; el++){
        $scope.years.push({"name": el, "value": el});
    }

    for(var el = 1; el <= 12; el++){
        $scope.months.push({"name": el, "value": el});
    }


    $scope.userData.year = $scope.years[0];
    $scope.userData.month = $scope.months[0];
    $scope.userData.emisor = $scope.emisor[0];

    console.log($scope.cart);
    window.el = $scope.cart;
    $scope.submit = function(){
        Payment.makePay(1, $scope.cart.customer.firstName, $scope.cart.customer.secondSurname, $scope.userData.emisor.value, $scope.userData.card, $scope.userData.month.value, $scope.userData.month.value, $scope.cart.computeSubTotal(), $scope.cart.travel.price);
    };

}]);