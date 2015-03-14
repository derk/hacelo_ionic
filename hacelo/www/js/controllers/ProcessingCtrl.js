controllers.controller('processingCtrl', 
    ['$scope', '$state','$ionicLoading', '$sce', 'SelectedImagesFactory','StorageService','ShoppingCartFactory', 'MessageService', 'Utils', 'Processing', function($scope, $state, $ionicLoading, $sce, SelectedImagesFactory, StorageService, ShoppingCartFactory, Messages, Utils, Processing) {

    $scope.market = ShoppingCartFactory.loadShoppingCart();
    $scope.images = SelectedImagesFactory.getToPrintOnes();
    $scope.all = 0;
    $scope.initial = 0;
    $scope.progress = 0;
    var data = '';

    var prefix = "data:image/png;base64,",
        cache = angular.isDefined(cache) ? cache: Messages.search("processing"),
        uploading = angular.isDefined(uploading) ? uploading : Messages.search();
        photos = 0,
        cont = 0;

    // Creates an array for iterating
    $scope.range = function(n) {
        return new Array(n);
    };

    // Prepating photos
    var preparePhotos = function(url){
        $ionicLoading.show(cache);
        var el = [];

        for(var x = 0; x < $scope.market.orders.length; x++){
            for(var y = 0; y < $scope.market.orders[x].items.length; y++){
                $scope.all = $scope.all + $scope.market.orders[x].items[y].quantity;
                if ($scope.market.orders[x].items[y].images.standard_resolution.url.indexOf(prefix) == -1) {
                    photos = photos + 1;
                    el.push({x:x, y:y});
                } //Close of if
            }
        }

        if (el.length <= 0 ) {
            $ionicLoading.hide();
            createAjaxCall();
        } else {
            window.p = [];
            angular.forEach(el, function(v){
                Utils.getImageDataURL($scope.market.orders[v.x].items[v.y].images.standard_resolution.url, v.x, v.y, $scope.market.orders[v.x].product.pixel_size.optimal).then(function(e){
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


    // Sends the pictures to the API
    // in order to save them
    var createAjaxCall = function() {
        var formData = new FormData();
        var photobook = [];
        var empty = false;
        for(var x = 0; x < $scope.market.orders.length; x++){
            for(var w = 0; w < $scope.market.orders[x].quantity; w ++) {
                for(var y = 0; y < $scope.market.orders[x].items.length; y++){
                    for(var z = 0; z < $scope.market.orders[x].items[y].quantity; z++){
                        var blob = Processing.dataURItoBlob($scope.market.orders[x].items[y].images.standard_resolution.url);
                        var category = $scope.market.orders[x].productLine.name+"_"+$scope.market.orders[x].product.name+"____"+ w + $scope.market.orders[x].id;
                        var properties = $scope.market.orders[x].properties;
                        if ($scope.market.orders[x].productLine.mandatory != true) {
                            formData.append('images[]', blob);      
                            formData.append('category[]', category);      
                            empty = true;              
                        } else {
                            var status = "none";
                            for (var v = 0; v < properties.cover.length; v++) {
                                if ($scope.market.orders[x].items[y]._originalSource == properties.cover[v]._originalSource) {
                                    status = "Portada"
                                }
                            }
                            photobook.push({blob: blob, category: category, title: properties.message, status: status});
                        }
                    }       
                }
            }
        }

        formData.append('data',$scope.market.customer.name+"_"+$scope.market.customer.secondSurname);

        var model = {data: formData, photobook: false};

        if (photobook.length > 0 && empty == false) 
            model = {data: photobookProcess(photobook), photobook: true};

        Processing.upload(model.data, model.photobook).then(function(e){
            var response = angular.fromJson(e);
            console.log(response);
            window.res = response;
            if(response.data === 'ok'){
                if (photobook.length > 0 && empty == true) {
                    var init = $scope.initial;
                    // console.log(photobookProcess(photobook, response.folder));
                    Processing.upload(photobookProcess(photobook, response.folder), true).then(function (response) {
                        var response = angular.fromJson(response);
                        if (response.data === 'ok') {
                            successHandler();
                        } else {
                            handleError();
                        }
                    }, function(e) {
                        handleError();
                    }, function(e){
                        $scope.initial = Math.floor((photobook.length * e) + init);
                    });
                } else {
                    successHandler();
                }
            } else {
                handleError();
            }
        }, function(e) {
            handleError();
        }, function(e){
            if (photobook.length > 0 && !model.photobook) {
                $scope.initial = Math.floor(($scope.all - photobook.length) * e);
            } else if (model.photobook) {
                $scope.initial = Math.floor($scope.all * e);
            } else {
                $scope.initial = Math.floor($scope.all * e);
            }
        });
    };

    var photobookProcess = function (obj, folder) {
        var formData = new FormData();
        for (var i = 0; i < obj.length; i ++) {
            formData.append('images[]', obj[i].blob);
            formData.append('category[]', obj[i].category);  
            formData.append('title[]', obj[i].title);
            formData.append('status[]', obj[i].status);
        }
        if (folder) {
            formData.append('data',folder);
            formData.append('create', "no crear");
            
        } else {
            formData.append('data',$scope.market.customer.name+"_"+$scope.market.customer.secondSurname);
            formData.append('create', "crear");
        }
        return formData;
    };

    var handleError = function () {
        alert('Ha habido un error, vamos a intentarlo de nuevo');
        preparePhotos();
    };
    
    var successHandler = function () {
        setTimeout(function(){$state.go('app.order-sent');});
        StorageService.clear();
    };

    preparePhotos();

}]);

