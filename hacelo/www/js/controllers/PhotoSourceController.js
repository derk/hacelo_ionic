controllers.controller('PhotoSourceCtrl', ['$scope', '$state', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', 'FileReader','$ionicLoading', function ($scope, $state, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker, FileReader, $ionicLoading) {
    $scope.imageStack = SelectedImagesFactory.getAll();
    $scope.galleries = SelectedImagesFactory.getGallery();

    //$scope.phoneImageLoad = function () {
    //    CordovaCameraService.getImage().then(function (result) {
    //        var img = ImageFactory.getPhoneLoadedImg(result);
    //        img.imageInit().then(function(result){
    //            if(PhotoSizeChecker.meetsMinimumRequirements(result, SelectedImagesFactory.getProduct())){
    //                $scope.imageStack.push(result);
    //            } else {
    //                $ionicPopup.alert({
    //                    title: 'La imagen es muy pequenna',
    //                    template: 'Lo sentimos :( la foto tiene que ser'+
    //                    'mayor a '+PhotoSizeChecker.getExpectedSize()+' para asegurarnos'+
    //                    'una impresión de la más alta calidad.'
    //                });
    //            }
    //        });
    //    });ionicLoading
    //};

    $scope.go = function(obj){
        SelectedImagesFactory.setCurrentGallery(obj);
        $state.go('app.album');
    };

    $scope.gotoConfirm = function () {

        if(angular.isDefined(SelectedImagesFactory.getProductLine().mandatory)){
            $state.go('app.photobook-check');
        } else {
            $state.go('app.check');
        }
        
    };

    var init = function () {
        $ionicLoading.show({
            template: 'Cargando... '
        });
        FileReader.scanFileSystem().then(function(res) {
            window.res = res;
            $scope.galleries = res;
            SelectedImagesFactory.setGallery(res);
            $ionicLoading.hide();
        });
    };

    if($scope.galleries.length == 0){
        init();
    }

}]);


controllers.controller('albumCtrl', ['$scope', '$state', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', 'FileReader','$ionicLoading', function ($scope, $state, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker, FileReader, $ionicLoading) {
    $scope.cant = 0;
    $scope.imageStack = SelectedImagesFactory.getAll();
    $scope.galleries = SelectedImagesFactory.getGallery();
    $scope.getCurrentGallery = SelectedImagesFactory.getCurrentGallery();
    console.log($scope.getCurrentGallery);

    $scope.updateMarker = function() {
        var cont = 0;
        angular.forEach($scope.imageStack, function(v){
            if(v.toPrint)
                cont = cont + 1;
        });
        $scope.cant = cont;
    };

    $scope.updateMarker();
}]);