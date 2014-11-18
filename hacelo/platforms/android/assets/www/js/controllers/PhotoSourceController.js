controllers.controller('PhotoSourceCtrl', ['$scope', '$filter', '$ionicPopup', '$ionicLoading', 'SelectedImagesFactory', 'MessageService', 'InstagramService', 'CordovaCameraService', 'ImageFactory','Nacion_Service', function ($scope, $filter, $ionicPopup, $ionicLoading, SelectedImagesFactory, MessageService, InstagramService, CordovaCameraService, ImageFactory, Nacion_Service) {
    var lastInstagramLoad;

    $scope.loading = false;
    $scope.imageStack = [];
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
    $scope.$watch('imageStack', function(newVal, oldVal) {// to keep updated the Service
        SelectedImagesFactory.setSelectedImages($scope.imageStack);
    }, true);

    $scope.addImg = function($index){
        console.log($scope.imageStack[$index]);
        Nacion_Service.addImageQueue($scope.imageStack[$index]);
        console.log(Nacion_Service.get_instagram_pics_on_queue());
    };

    function extractInstagramImages (apiResponse) {
        lastInstagramLoad = apiResponse;
        var filteredResponse = $filter('filter')(apiResponse.data, {type:"image"}),
            j = filteredResponse.length;

        if (j === 0) {
            $ionicPopup.alert(MessageService.search("no-images-found"));
        } else {
            for (var i = 0; i < j; i++) {
                $scope.imageStack.push(new ImageFactory(filteredResponse[i].images));
            }
        }
    }


    function getRecentMedia (){
        $scope.loading = true;
        InstagramService.getRecentMedia()
            .then(function(response) {
                $scope.loading = false;
                if (response.data.meta.code === 400) { // check if token is expired
                    authenticateInstagramUser();
                } else {
                    extractInstagramImages(response.data);
                }
            }, function(err) {
                $scope.loading = false;
                $ionicPopup.alert(MessageService.search("cannot-load-media"));
            });
    }

    function authenticateInstagramUser (){
        InstagramService.auth()
            .then(function(result) {
                getRecentMedia();
            }, function(err) {
                $ionicPopup.alert(MessageService.search("user-denied-access"));
            });
    }

    $scope.instagramImageLoad = function() {
        if (InstagramService.isAuthenticated()){
            getRecentMedia();
        } else {
            authenticateInstagramUser();
        }
    };

    $scope.phoneImageLoad = function() {
        CordovaCameraService.getImage()
            .then(function(result) {
                $scope.imageStack.push(new ImageFactory(result));
            }, function(result) {
                // $ionicPopup.alert(MessageService.search("cordova-load-failed"));
            });
    };

    $scope.logArray = function(){
        console.log($scope.imageStack);
    };

    InstagramService.getRecientTagMedia().then(function(response){
        extractInstagramImages(response.data);
    },function(err){});
}]);