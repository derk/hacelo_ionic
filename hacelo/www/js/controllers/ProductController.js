controllers.controller('productCrtl', function($scope, $state, SelectedImagesFactory, PhotoPrintConfig) {

	$scope.productLines = PhotoPrintConfig.products;

	$scope.saveProductLine = function(pProductLine) {
		SelectedImagesFactory.setProductLine(pProductLine);
		$state.go("app.category");
	};
});

controllers.controller('categoryCrtl', function($scope, $state, SelectedImagesFactory) {
	$scope.productLine = SelectedImagesFactory.getProductLine();

	$scope.saveProduct = function(pProduct) {
		SelectedImagesFactory.setProduct(pProduct);
		$state.go("app.photo");
	};
});

controllers.controller('photoCrtl', function($scope, SelectedImagesFactory, PhotoPrintConfig) {
	$scope.product = SelectedImagesFactory.getProduct();
});

controllers.controller('confirmCtrl', function($scope, StorageFactory, Market) {
	$scope.order = Market.getCurrentModel();
	$scope.addToCart = function(){
		StorageFactory.save($scope.order);
	};
});

controllers.controller('cartCtrl', function($scope, StorageFactory, Market) {
	$scope.items = StorageFactory.init();
	$scope.subtotal = 0;

	angular.forEach($scope.items.market, function(value){
		$scope.subtotal = $scope.subtotal + value.price;
	});
});

controllers.controller('landingCtrl', function($scope, StorageFactory) {
	$scope.market = StorageFactory.init();
});