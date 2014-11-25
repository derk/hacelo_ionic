controllers.controller('PhotoSourceCtrl', ['$scope', '$filter', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', function ($scope, $filter, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker) {

    $scope.loading = false;
    $scope.imageStack = SelectedImagesFactory.getAll();

    $scope.phoneImageLoad = function () {
        CordovaCameraService.getImage().then(
            function (result) {
                (new ImageFactory(result)).phoneImageInit().then(
                    function(result){
                        if(PhotoSizeChecker.meetsMinimumRequirements(result)){
                            $scope.imageStack.push(result);
                        }else{
                            $ionicPopup.alert({
                                title: 'La imagen es muy pequenna',
                                template: 'Lo sentimos :( la foto tiene que ser'+
                                'mayor a '+PhotoSizeChecker.getExpectedSize()+' para asegurarnos'+
                                'una impresión de la más alta calidad.'
                            });
                        }
                    }
                );
            }
        );
    };
}]);