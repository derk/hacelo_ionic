controllers.controller('albumCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', 'FileReader','$ionicLoading', function ($scope, $state, $stateParams, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker, FileReader, $ionicLoading) {
    var albumIndex = $stateParams.albumIndex,
        currentAlbum = SelectedImagesFactory.getGallery().albums[albumIndex],
        getToPrintCount = function() {
            return currentAlbum.getToPrintOnes().length;
        };

    $scope.imageStack = SelectedImagesFactory.getAll();
    $scope.albumName = currentAlbum.name;
    $scope.toPrintCount = getToPrintCount();
    $scope.height = screen.width / 3;

    $scope.style = {
        "overflow":"hidden",
        "height": $scope.height+"px"
    };

    $scope.checkImage = function(image){
        image.toPrint = !image.toPrint;
        $scope.toPrintCount = getToPrintCount();
    };
}]);