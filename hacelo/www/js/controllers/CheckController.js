controllers.controller('checkCtrl', ["$scope", "$state", "$ionicPopup", "SelectedImagesFactory", "MessageService", function($scope, $state, $ionicPopup, SelectedImagesFactory, Messages) {
    $scope.images = SelectedImagesFactory.getToPrintOnes();

    /*
     * Se encarga de ingresar en el carrito de compras los datos que ya se encuentran 
     * en el array de imagenes, se guardan todos los tipos de fotos asi como la cantidad de cada una
     * y se redirecciona la pantalla de confirmacion.
     * */
    $scope.addToCart = function () {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_check_screen"),
            confirmPopup = $ionicPopup.confirm(cache);

        confirmPopup.then(function (res) {
            if (res) {
                SelectedImagesFactory.setImagesAfterEdited($scope.images);
                $state.go("app.confirm");
            }
        });
    };

    /*
    * Ensure that every selected image have at least a quantity equals to one
    * If don't have other preview value
    * */
    var initQuantity = function(){
        angular.forEach($scope.images, function(image){
            if (image.quantity === 0) {
                image.quantity = 1;
            }
        });
    };
    initQuantity();
}]);