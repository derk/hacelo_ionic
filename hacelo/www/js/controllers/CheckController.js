controllers.controller('checkCtrl', ["$scope", "$state", "$ionicPopup", "$timeout", "SelectedImagesFactory", "MessageService", "Market", function($scope, $state, $ionicPopup, $timeout, SelectedImages, Messages, Market) {
    $scope.images = SelectedImages.getToPrintOnes();
    $scope.dkrm;

    /*
     * Esta es la funcion de crop que se encarga de llamar a la ventana de 
     * cropeo, donde se abrira un popup para que se pueda seleccionar el 
     * area de cropeo.
     * */
    $scope.crop = function ($index) {
        $scope.showPopup($index);
    };


    /*
     * Se encarga de abrir el popup con la informacion, 
     * recibe un indice, el cual corresponde al indice del array
     * donde obtendra la imagen seleccionada
     * Ademas tiene un template y opciones determinada a escoger.
     * */
    $scope.showPopup = function ($index) {
        $scope.data = {};
        $scope.img = $scope.images[$index].images.standard_resolution;

        var cropPopup = $ionicPopup.show({

            template: ' <img id="cropArea" src="{{img.url}}" alt="$index">',
            title: 'Cortar la Fotografía',
            subTitle: 'Selecciona el area a cortar',
            scope: $scope,
            buttons: [
                {text: 'Cancelar'},
                {text: '<b>Save</b>',
                 type: 'button-positive',
                 onTap: function (e) {
                     $scope.images[$index].images.standard_resolution.url = $scope.dkrm.snapshotImage();
                    cropPopup.close();
                 }
                }]
        });

        $timeout(function () {
            $scope.executeCrop();
        }, 100);
    };

    /*
     * Se llama para mantener un area de cropeo por default
     * el cual sera las esquinas de la imagen, ademas se le asigna
     * el valor a la variable de scope dkrm, donde se podra acceder desde el boton 
     * de tap del modal.
     * */
    $scope.executeCrop = function () {
        $scope.dkrm = new Darkroom('#cropArea', {
            minWidth: 100,
            minHeight: 100,
            maxWidth: 650,
            maxHeight: 500,
            plugins: {
                crop: {quickCropKey: 67}
            },

            init: function () {
                var cropPlugin = this.getPlugin('crop');
                cropPlugin.selectZone(170, 25, 300, 300);
            }
        });
    };

    /*
     * Se encarga de ingresar en el carrito de compras los datos que ya se encuentran 
     * en el array de imagenes, se guardan todos los tipos de fotos asi como la cantidad de cada una
     * y se redirecciona la pantalla de confirmacion.
     * */
    $scope.addToCart = function () {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_check_screen"),
            confirmPopup = $ionicPopup.confirm(cache);

        confirmPopup.then(function (res) {
            if (res) {
                Market.insert($scope.images);
                $state.go("app.confirm");
            }
        });
    };
}]);