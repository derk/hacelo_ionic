controllers.controller('PhotoSourceCtrl',
        ['$scope', '$state', 'SelectedImagesFactory', 'MessageService', 'FileReader','$ionicLoading',
function ($scope,   $state,   SelectedImagesFactory,   MessageService,   FileReader,  $ionicLoading) {
    $scope.imageStack = SelectedImagesFactory.getAll();
    $scope.gallery = SelectedImagesFactory.getGallery();
    $scope.toPrintCount = 0;

    var updateToPrintCount = function () {
        $scope.toPrintCount = $scope.gallery.getToPrintOnes().length;
    };

    var updateImageStack = function () {
        for (var i = $scope.gallery.albums.length - 1; i >= 0; i--) {
            for (var j = $scope.gallery.albums[i].images.length - 1; j >= 0; j--) {
                $scope.imageStack.push( $scope.gallery.albums[i].images[j] );
            }
        }
    };

    var init = function () {
        $ionicLoading.show({
            template: MessageService.search('looking-for-images')
        });
        FileReader.scanFileSystem().then(function(response) {
            $scope.gallery = response;
            updateImageStack();
            updateToPrintCount();
            SelectedImagesFactory.setGallery(response);
            $ionicLoading.hide();
        });
    };

    $scope.go = function(index){
        $ionicLoading.show({
            template: MessageService.search('looking-for-images')
        });
        $scope.gallery.albums[index].initImages().then(function () {
            $ionicLoading.hide();
            $state.go('app.album', {'albumIndex': index});
        });
    };

    $scope.goToConfirm = function () {

        if(angular.isDefined(SelectedImagesFactory.getProductLine().mandatory)){
            $state.go('app.photobook-check');
        } else if (angular.isDefined(SelectedImagesFactory.getProductLine().isStrip)) {
             $state.go('app.photostrip');
        } else {
            $state.go('app.check');
        }
    };

    if (angular.isUndefined($scope.gallery.albums)) {
        init();
    } else {
        updateToPrintCount();
    }
}]);