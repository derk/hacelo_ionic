controllers.controller('confirmOrderCtrl', ['$scope', '$state' ,'$ionicPopup','$ionicLoading', 'MessageService', 'ShoppingCartFactory','Payment','CartService', function($scope, $state, $ionicPopup, $ionicLoading, Messages, ShoppingCartFactory,Payment, CartService) {
    $scope.cart = ShoppingCartFactory.loadShoppingCart();
    $scope.master = {checked:false};
  
   $scope.show = function() {
        $ionicLoading.show({
          template: 'Realizando Pago...'
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };
   
   $scope.pay = function(){
   		$scope.show();
      if (angular.isDefined($scope.cart.coupon.code) && $scope.cart.coupon.code != "")  {
          CartService.redeem($scope.cart.coupon.code, true).then(function(e){
            $scope.payment();           
          });
      } else {
          $scope.payment();           
      }
   };

   $scope.isDisabled = function (e) {
    return !e;
   };

   $scope.payment = function () {
      Payment.makePay(1, $scope.cart.customer.firstName, $scope.cart.customer.secondSurname, $scope.cart.payment.type, $scope.cart.payment.card, $scope.cart.payment.month, $scope.cart.payment.year, $scope.cart.computeSubTotal(), $scope.cart.travel.price, $scope.cart.coupon.price | 0).then(function(e){
        $scope.hide();
        if(e.error != ""){
          $ionicPopup.alert({
            title: 'Error',
            template: 'Hubo un error al procesar tu pago, intentalo mas tarde.'
          });
        } else {
            $state.go("app.processing-order");
        }
      });
   };

}]);