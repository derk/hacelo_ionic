controllers.controller('PhotoSourceCtrl', ['$scope', '$filter', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', function ($scope, $filter, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory) {

    $scope.loading = false;
    $scope.imageStack = SelectedImagesFactory.getAll();

    $scope.phoneImageLoad = function () {
        CordovaCameraService.getImage()
            .then(function (result) {
                $scope.imageStack.push(new ImageFactory(result));
            }, function (result) {
                // $ionicPopup.alert(MessageService.search("cordova-load-failed"));
            });
    };
}]);