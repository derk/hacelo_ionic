controllers.controller('checkCtrl', ["$scope", "$state", "$ionicPopup", "SelectedImagesFactory", "MessageService", "PreloaderFactory", function($scope, $state, $ionicPopup, SelectedImagesFactory, Messages, preloader) {
    $scope.images = SelectedImagesFactory.getToPrintOnes();
    // keep track of the state of the loading images.
    $scope.isLoading = true;
    $scope.isSuccessful = false;
    $scope.percentLoaded = 0;

    var getImageLocations = function () {
        var images = $scope.images,
            result = [];
        for (var i = images.length - 1; i >= 0; i--) {
            result.push(images[i].images.standard_resolution.url);
        }

        return result;
    };

    var preload = function () {
        preloader.preloadImages( getImageLocations() ).then(
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
         * If the image has other quantity already jus preserve that value
         * */
        for (var i = $scope.images.length - 1; i >= 0; i--) {
            if ($scope.images[i].quantity === 0) {
                $scope.images[i].quantity = 1;
            }
        }

        preload();
    };

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

    init();
}]);