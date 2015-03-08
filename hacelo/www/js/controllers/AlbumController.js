controllers.controller('albumCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', 'MessageService','SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', 'FileReader','$ionicLoading', function ($scope, $state, $stateParams, $ionicPopup, MessageService, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker, FileReader, $ionicLoading) {
    var albumIndex = $stateParams.albumIndex,
        currentAlbum = SelectedImagesFactory.getGallery().albums[albumIndex],
        selectedProduct = SelectedImagesFactory.getProduct(),
        imageSizeMsj = MessageService.search("size_checker");

    $scope.imageStack = SelectedImagesFactory.getAll();
    $scope.albumName = currentAlbum.name;

    $scope.style = {
        "overflow":"hidden",
        "height": screen.width/3+"px"
    };

    $scope.checkImage = function(image){
        if (PhotoSizeChecker.meetsMinimumRequirements(image, selectedProduct)) {
            image.toPrint = !image.toPrint;
        } else {
            var popup  = $ionicPopup.alert(imageSizeMsj);
            setTimeout(function () {
                popup.close();
            },2000);
        }
    };
}]);