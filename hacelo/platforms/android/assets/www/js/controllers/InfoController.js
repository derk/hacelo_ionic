/* InfoCtrl Accordion List
 * $scope - Scope de la pantalla
 */

controllers.controller('infoCtrl', function($scope) {

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

});