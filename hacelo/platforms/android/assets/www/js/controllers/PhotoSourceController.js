controllers.controller('PhotoSourceCtrl', ['$scope', '$ionicPopup', 'MessageService', 'InstagramService', 'CordovaCameraService', 'ImageFactory', function ($scope, $ionicPopup, MessageService, InstagramService, CordovaCameraService, ImageFactory) {
    $scope.pickedImages = [];

    $scope.instagramPick = function() {
        InstagramService.auth();
    };
    $scope.phonePick = function() {
        CordovaCameraService.getPhonePic()
        .then(function(result) {
            alert(result);
            $scope.pickedImages.push(result);
        }, function(result) {
            $ionicPopup.alert(MessageService.search("cordova-load-failed"));
        });
    };
}]);