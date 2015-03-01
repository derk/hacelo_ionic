/**
 * Created by joseph on 25/01/2015.
 */
controllers.controller('photobookCheckCtrl', ['$scope', '$state', '$ionicPopup','SelectedImagesFactory', 'PhotoPrintConfig','MessageService', 'Utils',function($scope, $state, $ionicPopup, SelectedImagesFactory, PhotoPrintConfig, Messages, Utils) {
    var popup = angular.isDefined(popup) ? popup: Messages.search("photobook_few");


    if(SelectedImagesFactory.getProduct().prices.first_items.quantity   !=  SelectedImagesFactory.getToPrintOnes().length){
        $ionicPopup.alert(popup).then(function(res){
            window.history.back();
        });
    } else {
        $scope.productLines = PhotoPrintConfig.products;
        $scope.images = SelectedImagesFactory.getToPrintOnes();

    }
    
    $scope.saveProductLine = function(pProductLine) {
        SelectedImagesFactory.setProductLine(pProductLine);
        $state.go("app.category");
    };

    $scope.mix = function () {
        $scope.images = Utils.shuffle($scope.images);
        SelectedImagesFactory.clearAndAdd($scope.images);
    };

    /*
     * Se encarga de ingresar en el carrito de compras los datos que ya se encuentran
     * en el array de imagenes, se guardan todos los tipos de fotos asi como la cantidad de cada una
     * y se redirecciona la pantalla de confirmacion.
     * */
    $scope.addToCart = function () {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_check_screen");
        $ionicPopup.confirm(cache).then(function (res) {
            if (res) {
                $state.go("app.confirm");
            }
        });

    };
}]);


controllers.controller('photobookCoverCtrl', ['$scope', '$state', '$ionicPopup','SelectedImagesFactory', 'ShoppingCartFactory', 'PhotoPrintConfig','MessageService', 'Utils',function($scope, $state, $ionicPopup, SelectedImagesFactory, ShoppingCartFactory, PhotoPrintConfig, Messages, Utils) {
    var cart = ShoppingCartFactory.loadShoppingCart();
    $scope.productLines = PhotoPrintConfig.products;
    $scope.images = SelectedImagesFactory.getToPrintOnes();
    $scope.cover = {data :""};

    $scope.saveProductLine = function(pProductLine) {
        SelectedImagesFactory.setProductLine(pProductLine);
        $state.go("app.category");
    };

    $scope.mix = function () {
        $scope.images = Utils.shuffle($scope.images);
        SelectedImagesFactory.clearAndAdd($scope.images);
    };

    $scope.range = function(){
        var el = [];
        for(var x = 0; x < 9; x ++){
            el.push($scope.images[x]);
        }
        return el;
    };

    /*
     * Se encarga de ingresar en el carrito de compras los datos que ya se encuentran 
     * en el array de imagenes, se guardan todos los tipos de fotos asi como la cantidad de cada una
     * y se redirecciona la pantalla de confirmacion.
     * */
    $scope.addToCart = function (t) {
        console.log($scope.cover);
        console.log($scope.range());
        ShoppingCartFactory.saveMessageCover($scope.cover.data,$scope.range());
        window.e = ShoppingCartFactory;
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_check_screen");
            $ionicPopup.confirm(cache).then(function (res) {
                if (res) {
                    $state.go("app.confirm");
                }
            });

    };
}]);
