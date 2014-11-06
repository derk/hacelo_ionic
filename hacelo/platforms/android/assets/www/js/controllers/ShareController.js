controllers.controller('ShareCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, Nacion_Service) {
    
    $scope.shareFb = function(){
        window.plugins.socialsharing.shareViaFacebook('http://www.hacelodigital.com/')
    };

    $scope.shareTwitter = function(){
        window.plugins.socialsharing.shareViaTwitter('http://www.hacelodigital.com/')
    };

    $scope.shareEmail = function(){
        window.plugins.socialsharing.shareViaEmail('Hacelo','Hacelo');
    };
});