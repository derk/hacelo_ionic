controllers.controller('PhotoSourceCtrl', ['$scope', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', function ($scope, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker) {
    $scope.imageStack = SelectedImagesFactory.getAll();

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
}]);