/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('PhotoEditCtrl', ['$scope', '$stateParams', '$state', 'SelectedImagesFactory', function ($scope, $stateParams, $state, SelectedImagesFactory) {
    $scope.image = SelectedImagesFactory.getOne($stateParams.id);
    $scope.sResolution = $scope.image.images.standard_resolution;

    var selectedProduct = SelectedImagesFactory.getProduct(),
        drkr;

    $scope.darkroomInit = function(){
        drkr = new Darkroom('#editableImage', {
            // minWidth: selectedProduct.pixel_size.minimum.width,
            // minHeight: selectedProduct.pixel_size.minimum.height,
            maxWidth: angular.element('.canvas').width(),
            plugins: {
                crop: {
                    ratio: ($scope.sResolution.width/$scope.sResolution.height)
                },
                save: false
            },
            init: function(){
                var cropPlugin = this.getPlugin('crop'),
                    optimalWidth = selectedProduct.pixel_size.optimal.width,
                    optimalHeight = selectedProduct.pixel_size.optimal.height;
                cropPlugin.selectZone(
                    (this.image.width-optimalWidth)/2,
                    (this.image.height-optimalHeight)/2,
                    optimalWidth,
                    optimalHeight
                );
            }
        });
    };

    $scope.done = function(){
        $scope.sResolution.url = drkr.snapshotImage();
        drkr.selfDestroy();
        $state.go('app.check');
    };
}]);