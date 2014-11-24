controllers.controller('PhotoSourceCtrl', ['$scope', '$filter', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', function ($scope, $filter, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory) {

    $scope.loading = false;
    $scope.imageStack = SelectedImagesFactory.getAll();

    $scope.phoneImageLoad = function () {
        CordovaCameraService.getImage().then(
            function (result) {
                (new ImageFactory(result)).phoneImageInit().then(
                    function(result){
                        $scope.imageStack.push(result);
                    }
                );
            }
        );
    };
}]);