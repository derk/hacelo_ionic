controllers.controller('PhotoSourceCtrl', ['$scope', '$state', 'SelectedImagesFactory', 'MessageService', 'FileReader','$ionicLoading', 'PreloaderFactory', function ($scope,   $state,   SelectedImagesFactory,   MessageService,   FileReader,  $ionicLoading, preloader) {
    $scope.isLoading = true;
    $scope.isSuccessful = false;
    $scope.percentLoaded = 0;

    var imageStack = SelectedImagesFactory.getAll(),
        isMobile = {
            Android: navigator.userAgent.match(/Android/i),
            iOS: navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        productLine = SelectedImagesFactory.getProductLine();

    $scope.imageStack = imageStack;
    $scope.gallery = SelectedImagesFactory.getGallery();
    $scope.loading = false;
    
    $scope.$watch('loading', function (newValue) {
        if (newValue) {
            $ionicLoading.show({
                template: MessageService.search('looking-for-images')
            });
        } else {
            $ionicLoading.hide();
        }
    });

    var updateImageStack = function (albumImages) {
        for (var i = albumImages.length - 1; i >= 0; i--) {
            imageStack.push( angular.copy( albumImages[i] ) );
        }
    };

    $scope.go = function(index){
        $scope.loading = true;
        $scope.gallery.albums[index].initImages().then(function () {
            updateImageStack( $scope.gallery.albums[index].images );
            $ionicLoading.hide();
            $state.go('app.album', {'albumIndex': index});
        });
    };

    $scope.goToConfirm = function () {

        if(angular.isDefined(productLine.mandatory)){
            $state.go('app.photobook-check');
        } else if (angular.isDefined(productLine.isStrip)) {
            $state.go('app.photostrip');
        } else {
            $state.go('app.check');
        }
    };


    $scope.goToIosGallery = function () {
        if (isMobile.iOS) {
            $scope.loading = true;

            FileReader.openIosGallery().then(function(gallery) {
                $scope.loading = false;
                angular.forEach(gallery.albums[0].images, function(image) {
                    image.toPrint = true;
                });

                if ( angular.isUndefined($scope.gallery.albums) ) {
                    SelectedImagesFactory.setGallery(gallery);
                    $scope.gallery = gallery;
                } else {
                    $scope.gallery.albums[0].images.concat( gallery.albums[0].images );
                    SelectedImagesFactory.setGallery($scope.gallery);
                }
            });
        }
    };


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
                $scope.isSuccessful = true;

                console.error( "Image Failed", imageLocation );
                console.info( "Preload Failure" );

            },
            function handleNotify( event ) {

                // Update UI to show progress percentage
                $scope.percentLoaded = event.percent;
            }
        );
    };

    var init = function (obj) {
        /*
         * Ensure that every selected image have at least a quantity equals to one
         * If the image has other quantity already just preserve that value.
         * Also create a new array of image locations (URLs) to be preloaded
         * */
         
        var imageLocations = [];
         for (var i = obj.albums.length - 1; i >= 0; i--) {
             imageLocations.push(obj.albums[i].images[0].images.standard_resolution.url);
        }
        preload(imageLocations);
    };


    var androidInit = function () {
        $scope.loading = true;

        FileReader.scanFileSystem().then(function(gallery) {
            $scope.loading = false;
            SelectedImagesFactory.setGallery(gallery);
            $scope.gallery = gallery;
            init($scope.gallery);
            console.log($scope.gallery);
        });
    };

    if (angular.isUndefined($scope.gallery.albums)) {
        androidInit();
    } else {
        console.log($scope.gallery);
        init($scope.gallery);
    }
}]);