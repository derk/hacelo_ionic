controllers.controller('checkCtrl', ["$scope", "$state", "$ionicPopup", "SelectedImagesFactory", "MessageService", "PreloaderFactory", function($scope, $state, $ionicPopup, SelectedImagesFactory, Messages, preloader) {
    $scope.images = SelectedImagesFactory.getToPrintOnes();
    // keep track of the state of the loading images.
    $scope.isLoading = true;
    $scope.isSuccessful = false;
    $scope.percentLoaded = 0;

    var preload = function (imageLocations) {
        preloader.preloadImages( imageLocations ).then(
            function handleResolve( imageLocations ) {

                // Loading was successful.
                $scope.isLoading = false;
                $scope.isSuccessful = true;
            },
            function handleReject( imageLocation ) {

                // Loading failed on at least one image.
                $scope.isLoading = false;
                $scope.isSuccessful = false;

                console.error( "Image Failed", imageLocation );
                console.info( "Preload Failure" );

            },
            function handleNotify( event ) {

                // Update UI to show progress percentage
                $scope.percentLoaded = event.percent;
            }
        );
    };

    var init = function () {
        /*
         * Ensure that every selected image have at least a quantity equals to one
         * If the image has other quantity already just preserve that value.
         * Also create a new array of image locations (URLs) to be preloaded
         * */
         
        var imageLocations = [];
         for (var i = $scope.images.length - 1; i >= 0; i--) {
             if ($scope.images[i].quantity === 0) {
                 $scope.images[i].quantity = 1;
             }

             imageLocations.push($scope.images[i].images.standard_resolution.url);
        }

        preload(imageLocations);
    };

    /*
     * Se encarga de ingresar en el carrito de compras los datos que ya se encuentran 
     * en el array de imagenes, se guardan todos los tipos de fotos asi como la cantidad de cada una
     * y se redirecciona la pantalla de confirmacion.
     * */
    $scope.addToCart = function () {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_check_screen"),
            numOfItems2Print = SelectedImagesFactory.getPrintItemsCount(),
            numberOfPicksConfirm = {
                "title" : "Estas segur@?",
                "template" : "Escogiste "+numOfItems2Print+" imagen(es), pero podés escoger hasta "+SelectedImagesFactory.getProduct().prices.first_items.quantity+ " por el mismo precio.",
                "cancelText" : "Cancelar",
                "okText" : "Aceptar"
            },
            go2Confirm = function (res) {
                if (res) {
                    $state.go("app.confirm");
                }
            };

        if(numOfItems2Print >= SelectedImagesFactory.getProduct().prices.first_items.quantity){
            $ionicPopup.confirm(cache).then(go2Confirm);

        } else {
            $ionicPopup.confirm(numberOfPicksConfirm).then(function(res){
                if(res){
                    $ionicPopup.confirm(cache).then(go2Confirm);
                }
            });
        }
    };

    init();

}]);