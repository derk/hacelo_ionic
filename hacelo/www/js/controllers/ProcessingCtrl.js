controllers.controller('processingCtrl', ['$scope', '$state','$ionicLoading', '$sce', 'SelectedImagesFactory','StorageService','ShoppingCartFactory', 'MessageService', 'Utils', 'Processing', function($scope, $state, $ionicLoading, $sce, SelectedImagesFactory, StorageService, ShoppingCartFactory, Messages, Utils, Processing) {

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
        var el = [];
        $ionicLoading.show(cache);

        // $scope.market.orders[0].items[0].images.standard_resolution.url
        for(var x = 0; x < $scope.market.orders.length; x++){
            for(var y = 0; y < $scope.market.orders[x].items.length; y++){
                $scope.all = $scope.all + $scope.market.orders[x].items[y].quantity;
                if ($scope.market.orders[x].items[y].images.standard_resolution.url.indexOf(prefix) == -1) {
                    console.log($scope.market.orders[x].items[y].images.standard_resolution.url);
                    photos = photos + 1;
                    el.push({x:x, y:y});
                } //Close of if
            }
        }

        if (el.length < 0 ) {
            $ionicLoading.hide();
            createAjaxCall();
        } else {
            window.p = [];
            angular.forEach(el, function(v){
                Utils.getImageDataURL($scope.market.orders[v.x].items[v.y].images.standard_resolution.url, v.x, v.y).then(function(e){
                    p.push(e.data);
                    cont = cont + 1;
                    $scope.market.orders[e.x].items[e.y].images.standard_resolution.url = e.data;
                    if(cont == el.length){
                        $ionicLoading.hide();
                        createAjaxCall();
                    }
                });
            });
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

        formData.append('data',$scope.market.customer.name+"_"+$scope.market.customer.secondSurname);
        
        Processing.upload(formData).then(function(e){
            console.log(e)
            setTimeout(function(){$state.go('app.order-sent');});
            StorageService.clear();
        }, function(e) {
            alert('Ha habido un error, vamos a intentarlo de nuevo');
        }, function(e){
            $scope.initial = Math.floor($scope.all * e);
        });
    };

    preparePhotos();

}]);

