controllers.controller('productCrtl', ['$scope', '$state', 'SelectedImagesFactory', 'PhotoPrintConfig', function($scope, $state, SelectedImagesFactory, PhotoPrintConfig) {
	$scope.productLines = PhotoPrintConfig.products;
	$scope.saveProductLine = function(pProductLine) {
		SelectedImagesFactory.setProductLine(pProductLine);
		$state.go("app.category");
	};
}]);




