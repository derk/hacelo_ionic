controllers.controller('albumCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', 'MessageService','SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', 'FileReader','$ionicLoading', function ($scope, $state, $stateParams, $ionicPopup, MessageService, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker, FileReader, $ionicLoading) {
    var albumIndex = $stateParams.albumIndex,
        currentAlbum = SelectedImagesFactory.getGallery().albums[albumIndex],
        cache = angular.isDefined(cache) ? cache: MessageService.search("size_checker"),
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
        if (!PhotoSizeChecker.meetsMinimumRequirements(image, SelectedImagesFactory.getProduct()) && !angular.isDefined(SelectedImagesFactory.getProductLine().isStrip)) {
           var popup  = $ionicPopup.alert(cache);
           setTimeout(function () {
                popup.close();
           },2000);
        } else {
            image.toPrint = !image.toPrint;
            $scope.toPrintCount = getToPrintCount();
        }
    };
}]);