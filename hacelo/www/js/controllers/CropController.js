/**
 * Created   on 30/11/2014.
 */
controllers.controller('cropController', ['$scope', '$stateParams', '$state', '$window', 'SelectedImagesFactory', function ($scope, $stateParams, $state, $window, SelectedImagesFactory) {
    $scope.image = SelectedImagesFactory.getOne($stateParams.id);
    $scope.sResolution = $scope.image.images.standard_resolution;

    var selectedProduct = SelectedImagesFactory.getProduct(),
        width = ($window.screen.width*0.9),
        height = (width * selectedProduct.pixel_size.optimal.height) / selectedProduct.pixel_size.optimal.width,
        foo;

    $scope.style = {
        "margin-left" : ($window.screen.width * 0.1) / 2,
        "margin-top" : (($window.screen.height - 48) - height ) / 2
    };

    var init = function(){
        foo = new CROP();
        foo.init({
            // element to load the cropper into
            container: '.canvas',
            // image to load, accepts base64 string
            image: $scope.sResolution.url,
            // aspect ratio
            width: width,
            height: height,
            // prevent image from leaking outside of container. boolean
            mask: false,
            // input[range] attributes
            zoom: {
                // slider step change
                steps: 0.01,
                // minimum and maximum zoom
                min: 1,
                max: 5
            },
            // optional preview. remove this array if you wish to hide it
            preview: {
                // element to load the preview into
                container: '.pre',
                // preview dimensions
                width: 200,
                height: 200
            }
        });
    };

    $scope.done = function(){
        $scope.sResolution.url = foo.data(width, height, 'png').image;
        $state.go('app.check');
    };

    init();
}]);