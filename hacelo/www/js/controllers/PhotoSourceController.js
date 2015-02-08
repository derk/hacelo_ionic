controllers.controller('PhotoSourceCtrl', ['$scope', '$state', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', 'FileReader', function ($scope, $state, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker, FileReader) {
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
    //    });
    //};

    $scope.gotoConfirm = function () {

        if(angular.isDefined(SelectedImagesFactory.getProductLine().mandatory)){
            $state.go('app.photobook-check');
        } else {
            $state.go('app.check');
        }
        
    };

    var init = function () {
        FileReader.scanFileSystem().then(function(res) {
            $scope.galleries = res;
        });
    };

    if($scope.galleries.length == 0){
        init();
    }

}]);