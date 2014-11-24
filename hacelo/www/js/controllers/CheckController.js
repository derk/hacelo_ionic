controllers.controller('checkCtrl', ["$scope", "$state", "$ionicPopup", "$timeout", "SelectedImagesFactory", "MessageService", "Market", function($scope, $state, $ionicPopup, $timeout, SelectedImages, Messages, Market) {
    $scope.images = SelectedImages.getToPrintOnes();
    $scope.dkrm;

    angular.forEach($scope.images, function (value) {
        value.quantity = 1;
    });

    $scope.crop = function ($index) {
        $scope.showPopup($index);
    };

    $scope.showPopup = function ($index) {
        $scope.data = {};
        $scope.img = $scope.images[$index].images.standard_resolution;

        var cropPopup = $ionicPopup.show({
            template: ' <img id="cropArea" src="{{img.url}}" alt="$index">',
            title: 'Cortar la Fotografía',
            subTitle: 'Selecciona el area a cortar',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancelar'
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.images[$index].images.standard_resolution.url = $scope.dkrm.snapshotImage();
                        cropPopup.close();
                    }
                }
            ]
        });

        $timeout(function () {
            $scope.executeCrop();
        }, 100);
    };


    $scope.executeCrop = function () {
        $scope.dkrm = new Darkroom('#cropArea', {
            minWidth: 100,
            minHeight: 100,
            maxWidth: 650,
            maxHeight: 500,

            plugins: {
                crop: {
                    quickCropKey: 67
                }
            },

            init: function () {
                var cropPlugin = this.getPlugin('crop');
                cropPlugin.selectZone(170, 25, 300, 300);
            }
        });
    };

    $scope.addToCart = function () {
        var cache = angular.isDefined(cache)? cache: Messages.search("confirm_check_screen"),
            confirmPopup = $ionicPopup.confirm(cache);

        confirmPopup.then(function (res) {
            if (res) {
                Market.insertMarket($scope.images);
                $state.go("app.confirm");
            }
        });
    };
}]);