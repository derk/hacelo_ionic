/**
 * Created by joseph on 25/01/2015.
 */
controllers.controller('photostripCtrl', ['$scope', '$state', '$ionicPopup','SelectedImagesFactory', 'PhotoPrintConfig','MessageService', 'Utils',function($scope, $state, $ionicPopup, SelectedImagesFactory, PhotoPrintConfig, Messages, Utils) {
    var popup = angular.isDefined(popup) ? popup: Messages.search("photostrip_few");
    $scope.groups = [];

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

    $scope.getMod = function (index) {
        return index % 4;
    };

    $scope.createGroups = function () {
        var jumps = 0,
            group = [];
        angular.forEach($scope.images, function (e, i) {
            group.push(e);
            if ( (i + 1 ) % 4 == 0 ) {
                $scope.groups.push(group);
                group = [];
            }
        });
        window.g = $scope.groups;
    };

    $scope.getHeight = function () {
        var width = screen.width;
        return width * 0.333;
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

    $scope.createGroups();
}]);
