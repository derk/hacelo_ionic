/* InfoCtrl Accordion List
 * $scope - Scope de la pantalla
 */

controllers.controller('infoCtrl', function($scope) {

	$scope.sucursales = {
		"desamparados": false,
		"guadalupe": false,
		"llorente": false,
		"alajuela": false,
		"rohrmoser": false,
		"san_jose": false,
		"cartago": false
	};

	$scope.toggleGroup = function(group){
		if($scope.isGroupShown(group)){
			$scope.shownGroup = null;
		}else{ 
			$scope.shownGroup = group;	
		}
	};

	$scope.isGroupShown = function(group){
		return $scope.shownGroup === group;
	};

	$scope.toogleSucursal = function (sucursal) {
		if($scope.sucursales[sucursal]){
			$scope.sucursales[sucursal] = false;
		}else{ 
			$scope.sucursales[sucursal] = true;
		}
	};

	$scope.shareFb = function(){
        window.plugins.socialsharing.shareViaFacebook('https://www.facebook.com/pages/Printea/726483530762215?ref=hl')
    };

    $scope.shareTwitter = function(){
        window.plugins.socialsharing.shareViaTwitter('http://www.twitter.com/printeaApp')
    };

    $scope.shareEmail = function(){
        window.plugins.socialsharing.shareViaEmail('Printea','Printea');
    };

});