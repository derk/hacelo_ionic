/**
 * Created by joseph on 25/01/2015.
 */
controllers.controller('photostripCtrl', ['$scope', '$state', '$ionicPopup','SelectedImagesFactory', 'PhotoPrintConfig','MessageService', 'Utils',function($scope, $state, $ionicPopup, SelectedImagesFactory, PhotoPrintConfig, Messages, Utils) {
    var popup = angular.isDefined(popup) ? popup: Messages.search("photostrip_few");
    var pick = {
        picked : false,
        index: null
    };

    var scrollWidth,
        widthScroll;
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
            $scope.groups = [];
        angular.forEach($scope.images, function (e, i) {
            group.push({url:e, checked : false});
            if ( (i + 1 ) % 4 == 0 ) {
                $scope.groups.push(group);
                group = [];
            }
        });

        return $scope.groups;
    };

    $scope.getHeight = function () {
        var width = screen.width;
        return (width * 0.333) * 0.8;
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

    $scope.pick = function (i, a, image) {
        if (image.checked) {
            var index = (i * 4) + a; 
            if (pick.picked == true) {
                var tmp = $scope.images[index];
                var tmp2 = $scope.images[pick.index];
                $scope.images[index] = tmp2;
                $scope.images[pick.index] = tmp;
                pick = {picked:false, index: null};
                $scope.createGroups();
            } else {
                pick = {picked:true, index: index};  
            }
            
        } else {
            pick = {picked:false, index: null};
        }
    };

    $scope.cleanCheck = function () {
        for (var i = $scope.groups.length - 1; i >= 0; i--) {
            for (var y = $scope.groups[i].length - 1; y >= 0; y--) {
                $scope.groups[i][y].checked = false;
            };
        };
        window.g = $scope.groups;
    };

    $scope.getScrollWidth = function () {
        return getHeight() * 36;
    };
    
    var makeScroll = function () {
        myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false, mouseWheel: true });
    };

    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    
    $scope.createGroups();
    makeScroll();
}]);
