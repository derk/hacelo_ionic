/**
 * Created by joseph on 25/01/2015.
 */
controllers.controller('categoryCrtl', ['$scope', '$state', '$ionicPopup', 'SelectedImagesFactory', 'MessageService',function($scope, $state, $ionicPopup, SelectedImagesFactory, MessageService) {
    $scope.productLine = SelectedImagesFactory.getProductLine();

    $scope.saveProduct = function(pProduct) {
        SelectedImagesFactory.setProduct(pProduct);
        $state.go("app.photo");
    };

    var lookForImages = function () {
        if(SelectedImagesFactory.getAll().length>0) {
            $ionicPopup
                .confirm(MessageService.search("loss_of_selected_images"))
                .then(function(res) {
                    if(res) {
                        // You are sure
                        SelectedImagesFactory.clearImages();
                    } else {
                        // You are not sure
                        $state.go("app.photo");
                    }
                });
        }
    };

    lookForImages();
}]);
