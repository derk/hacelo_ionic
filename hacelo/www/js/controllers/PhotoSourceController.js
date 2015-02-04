controllers.controller('PhotoSourceCtrl', ['$scope', '$state', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', 'FileReader', function ($scope, $state, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker, FileReader) {
    $scope.imageStack = SelectedImagesFactory.getAll();
    $scope.gallery = SelectedImagesFactory.getGallery();

    $scope.phoneImageLoad = function () {
        CordovaCameraService.getImage().then(function (result) {
            var img = ImageFactory.getPhoneLoadedImg(result);
            img.imageInit().then(function(result){
                if(PhotoSizeChecker.meetsMinimumRequirements(result, SelectedImagesFactory.getProduct())){
                    $scope.imageStack.push(result);
                } else {
                    $ionicPopup.alert({
                        title: 'La imagen es muy pequenna',
                        template: 'Lo sentimos :( la foto tiene que ser'+
                        'mayor a '+PhotoSizeChecker.getExpectedSize()+' para asegurarnos'+
                        'una impresión de la más alta calidad.'
                    });
                }
            });
        });
    };

    $scope.gotoConfirm = function () {

        if(angular.isDefined(SelectedImagesFactory.getProductLine().mandatory)){
            $state.go('app.photobook-check');
        } else {
            $state.go('app.check');
        }
        
    };

    $scope.init = function () {
            // FileReader.getFileSystem().then(function(e){
            //     window.entries = e;
            //     angular.forEach(e, function(v){
            //         FileReader.hasImage(v).then(function(result){
            //             $scope.gallery.push(result);
            //             window.r = $scope.gallery;
            //         });
            //     });
            // FileReader.hasImage(e[16]).then(function(result){
            //     $scope.gallery.push(result);
            //     window.r = $scope.gallery;
            // });


            /*FileReader.hasImage(e[59]).then(function(result){
             $scope.gallery.push(result);
             window.r = result;
             console.log(result);
             });*/

            // FileReader.hasImage(e[8]).then(function(result){
            //     $scope.gallery.push(result);
            //     window.r1 = result;
            //     console.log(result);
            // });

            /*          FileReader.hasImage(e[1]).then(function(result){
             $scope.gallery.push(result);
             window.r2 = result;
             console.log(result);
             });*/
            // });

        FileReader.test();
    };

    if($scope.gallery.length == 0){
        $scope.init();
    }

}]);