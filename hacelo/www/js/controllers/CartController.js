/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('cartCtrl', ['$scope', '$ionicPopup', 'MessageService', 'ShoppingCartFactory','Payment', function($scope, $ionicPopup, Messages, ShoppingCartFactory,Payment) {
    $scope.cart = ShoppingCartFactory.loadShoppingCart();
    console.log($scope.cart);
    $scope.removeOrder = function (pOrderToRemove) {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_order_delete"),
            confirmPopup = $ionicPopup.confirm(cache);

        confirmPopup.then(function (res) {
            if (res) {
                ShoppingCartFactory.removeOrder(pOrderToRemove.id);
            }
        });
    };

    $scope.minus = function(order){

    };

}]);


/**
 * Created by Raiam on 02/01/2015.
 */
controllers.controller('cartCheckoutCtrl', ['$scope', '$state', '$ionicLoading','$ionicPopup', 'MessageService', 'ShoppingCartFactory','PlacesConfig','Payment', function($scope, $state, $ionicLoading, $ionicPopup, Messages, ShoppingCartFactory, PlacesConfig, Payment) {
    
    $scope.cart = ShoppingCartFactory.loadShoppingCart();
    $scope.sucursal = true;
    $scope.provinces = [];
    $scope.cantones = [];
    $scope.districts = [];
    $scope.info = {};  

    var places = PlacesConfig.places;

    angular.forEach(Object.keys(places), function(v){
        $scope.provinces.push({"name":v});
    });


    $scope.showCanton = function(){
        $scope.cantones = [];
        $scope.districts = [];

         angular.forEach(Object.keys(places[$scope.info.province.name].Cantones), function(v){
            $scope.cantones.push({"name":v});
        });
    };

    $scope.showDistrict = function(){
        $scope.districts = [];

         angular.forEach(places[$scope.info.province.name].Cantones[$scope.info.canton.name], function(v){
            $scope.districts.push({"name":v});
        });
    };


    $scope.show = function() {
        $ionicLoading.show({
          template: 'Calculando Transporte'
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.changeSucursal = function(s){
       $scope.sucursal = s;
    };

    $scope.saveInformation = function(){
        ShoppingCartFactory.saveCustomer($scope.info.name, $scope.info.last, $scope.info.phone,  $scope.info.email, $scope.info.province.name, $scope.info.canton.name, $scope.info.district.name, $scope.info.exact);
    };

    $scope.calculatePrice = function(){

        if($scope.sucursal == true){
            ShoppingCartFactory.saveTravel(0);
            $state.go("app.redeem");
        } else {
            $scope.show();
            Payment.sendWeight($scope.cart.getWeight()).then(function(response){
                ShoppingCartFactory.saveTravel(response.message.precio);
                $scope.hide();
                $state.go("app.redeem");
            });
        }
        
    };
    
}]);


/**
 * Created by Raiam on 02/01/2015.
 */

controllers.controller('redeemCtrl', ['$scope', '$ionicPopup', '$state', 'MessageService', 'ShoppingCartFactory', 'Payment', function($scope, $ionicPopup, $state, Messages, ShoppingCartFactory, Payment) {
    
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

    $scope.submit = function(){
        ShoppingCartFactory.savePayment($scope.userData.card, $scope.userData.month.value, $scope.userData.year.value,$scope.userData.emisor.value );
        $state.go("app.confirm-order");
        /*Payment.makePay(1, $scope.cart.customer.firstName, $scope.cart.customer.secondSurname, $scope.userData.emisor.value, $scope.userData.card, $scope.userData.month.value, $scope.userData.year.value, $scope.cart.computeSubTotal(), $scope.cart.travel.price).then(function(e){
            if(e.error != ""){
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Hubo un error al procesar tu pago, intntalo mas tarde.'
                });
            } else {
                $state.go("app.processing-order");
            }
        });*/
    };

}]);