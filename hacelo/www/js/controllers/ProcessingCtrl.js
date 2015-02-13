controllers.controller('processingCtrl', ['$scope', '$ionicLoading', '$sce', 'SelectedImagesFactory','StorageService','ShoppingCartFactory', 'MessageService', 'Utils', 'Processing', function($scope, $ionicLoading, $sce, SelectedImagesFactory, StorageService, ShoppingCartFactory, Messages, Utils, Processing) {

    $scope.market = ShoppingCartFactory.loadShoppingCart();
    $scope.images = SelectedImagesFactory.getToPrintOnes();
    $scope.all = 0;
    $scope.initial = 0;
    $scope.progress = 0;
    var data = '';

    window.el = $scope.market;

    var prefix = "data:image/png;base64,",
        cache = angular.isDefined(cache) ? cache: Messages.search("processing"),
        uploading = angular.isDefined(uploading) ? uploading : Messages.search();
        photos = 0,
        cont = 0;


    $scope.range = function(n) {
        return new Array(n);
    };

    // Prepating photos
    var preparePhotos = function(url){
        $ionicLoading.show(cache);

        // $scope.market.orders[0].items[0].images.standard_resolution.url
        for(var x = 0; x < $scope.market.orders.length; x++){
            for(var y = 0; y < $scope.market.orders[x].items.length; y++){
                if ($scope.market.orders[x].items[y].images.standard_resolution.url.indexOf(prefix) == -1) {
                    photos = photos + 1;
                    $scope.all = $scope.all + $scope.market.orders[x].items[y].quantity;
                    Utils.getImageDataURL($scope.market.orders[x].items[y].images.standard_resolution.url, x, y).then(function(e){
                        cont = cont + 1;
                        $scope.market.orders[e.x].items[e.y].images.standard_resolution.url = e.data;
                        if(cont == photos){
                            $ionicLoading.hide();
                            createAjaxCall();
                        }
                    });
                } //Close of if
            }
        }
    };

    var createAjaxCall = function() {
        var formData = new FormData();

        for(var x = 0; x < $scope.market.orders.length; x++){
            for(var y = 0; y < $scope.market.orders[x].items.length; y++){
                var blob = Processing.dataURItoBlob($scope.market.orders[x].items[y].images.standard_resolution.url);
                formData.append('images[]', blob);      
                formData.append('category[]', $scope.market.orders[x].productLine.name+"_"+$scope.market.orders[x].product.name);          
            }
        }

        formData.append('data','nacion_test');

        Processing.upload(formData).then(function(e){
            setTimeout(function(){
                $state.go('app.order-sent');
            });
            StorageService.clear();
        }, function(e) {
            alert('Ha habido un error, vamos a intentarlo de nuevo');
        }, function(e){
            $scope.initial = Math.floor($scope.all * e);
        });
    };

    preparePhotos();

}]);

