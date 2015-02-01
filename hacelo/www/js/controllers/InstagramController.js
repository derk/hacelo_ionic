controllers.controller('InstagramCrtl', ['$scope', '$filter', '$ionicPopup', '$ionicLoading', 'SelectedImagesFactory', 'MessageService', 'InstagramService', 'ImageFactory', 'PhotoSizeChecker', function ($scope, $filter, $ionicPopup, $ionicLoading, SelectedImagesFactory, MessageService, InstagramService, ImageFactory, PhotoSizeChecker) {
    $scope.loading = false;
    $scope.imageStack = SelectedImagesFactory.getAll();
    $scope.canLoadMore = false;

    $scope.$watch('loading', function(newVal, oldVal) {// for showing and hiding load spinner
        var cache = angular.isDefined(cache)? cache: MessageService.search("loading");
        if (newVal !== oldVal) {
            if (newVal === true) {
                $ionicLoading.show(cache);
            } else {
                $ionicLoading.hide();
            }
        }
    });

    var extractInstagramImages = function(apiResponse) {
        /*
         *   Aquí reviso la respuesta que me devolvió Instagram, le quito los videos y
         *   luego reviso si luego de filtrar lo quedaron  imágenes en caso de que no
         *   quedaran muestro un mensaje al usuario diciéndole que no tiene imágenes
         *   que su cuenta de Instagram y lo envió a la pantalla anterior.
         *   Si hay imágenes las meto al scope para que el usuario decida cuales
         *   imágenes va a imprimir.
         * */
        var filteredResponse = $filter('filter')(apiResponse.data, {type:"image"}),
            j = filteredResponse.length;

        if (j === 0) {
            $ionicPopup.alert(MessageService.search("no-images-found")).then(function(){
                sendUserBackToChoose();
            });
        } else {
            for (var i = 0; i < j; i++) {
                var img = ImageFactory.getInstagramLoadedImg(filteredResponse[i].images);
                $scope.imageStack.push(img);
            }
        }
    };

    var getRecentMedia = function(){
        /*  Se conecta con la API de Instagram por medio del servicio y trae las
         *  ultimas imágenes.En caso de que la respuesta de Instagram venga con
         *  un error (token vencido o alguno otro) Fuerzo al servicio a que haga
         *  un nuevo log in para refrescar el token.
         * */
        $scope.loading = true;
        InstagramService.getRecentMedia()
            .then(function(response) {
                $scope.loading = false;
                if (response.data.meta.code === 400) { // check if token is expired
                    authenticateInstagramUser();
                } else {
                    extractInstagramImages(response.data);
                    canLoadMoreImages();
                }
            }, function(err) {
                $scope.loading = false;
                $ionicPopup.alert(MessageService.search("cannot-load-media"));
            });
    };

    var sendUserBackToChoose = function(){
        $state.go('app.choose');
    };

    var havePreviousImages = function () {
        return (SelectedImagesFactory.getInstagramOnes().length > 0);
    };

    var authenticateInstagramUser = function (){
        /*
        * Muestra la ventana en la que el usuario inicia sesión con su cuenta de Instagram.
        * si el usario no otorga aceso a la cuenta muestra un mensaje de error y redirecciona
        * al usuario a la ventana anterior.
        * */
        InstagramService.auth()
            .then(function(result) {
                getRecentMedia();
            }, function(err) {
                $ionicPopup.alert(MessageService.search("user-denied-access")).then(function(){
                    sendUserBackToChoose();
                });
            });
    };

    var canLoadMoreImages = function(){
        $scope.canLoadMore = InstagramService.canLoadMore();
    };

    var init = function(){
        if (InstagramService.isAuthenticated()){
            if(havePreviousImages()){
                canLoadMoreImages();
            } else {
                if(InstagramService.hasUserMedia()) {
                    InstagramService.cleanUserMedia();
                }
                getRecentMedia();
            }
        } else {
            authenticateInstagramUser();
        }
    };

    $scope.loadMore = getRecentMedia;

    $scope.checkRequirements = function(image){
        if(image.toPrint === true) {
            image.toPrint = false;
        } else {
            if(PhotoSizeChecker.meetsMinimumRequirements(image, SelectedImagesFactory.getProduct())) {
                image.toPrint = true;
            } else {
                $ionicPopup.alert({
                    title: 'La imagen es muy pequeña',
                    template: 'Lo sentimos :( la foto tiene que ser'+
                    'mayor a '+PhotoSizeChecker.getExpectedSize()+' para asegurarnos'+
                    'una impresión de la más alta calidad.'
                });
            }
        }
    };

    init();
}]);