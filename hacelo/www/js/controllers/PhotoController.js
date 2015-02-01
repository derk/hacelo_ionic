/**
 * Created by joseph on 25/01/2015.
 */
controllers.controller('photoCrtl', ['$scope', '$state', '$ionicPopup', '$timeout', '$window', 'MessageService','SelectedImagesFactory',function($scope, $state, $ionicPopup, $timeout, $window, Messages, SelectedImagesFactory) {
    var cache = angular.isDefined(cache) ? cache: Messages.search("photobook_alert");

    $scope.product = SelectedImagesFactory.getProduct();
    $scope.height = screen.width;

    if(angular.isDefined(SelectedImagesFactory.getProductLine().mandatory)){
        $ionicPopup.alert(cache);
        $timeout(function () {
            angular.element(".popup").addClass("photobook-popup");
        },1000);
        console.log("get");
    }


}]);