controllers.controller('productCrtl', ['$scope', '$state', 'SelectedImagesFactory', 'PhotoPrintConfig', function($scope, $state, SelectedImagesFactory, PhotoPrintConfig) {
	$scope.productLines = PhotoPrintConfig.products;
	$scope.saveProductLine = function(pProductLine) {
		SelectedImagesFactory.setProductLine(pProductLine);
		$state.go("app.category");
	};
}]);



controllers.controller('testCtrl', ['$scope', '$state', 'SelectedImagesFactory', 'PhotoPrintConfig', function($scope, $state, SelectedImagesFactory, PhotoPrintConfig) {
	var myScroll;

	function loaded () {
		myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false, mouseWheel: true });
	}

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			
	
	$scope.test = function () {
		alert('test');
	};
	loaded();
}]);




