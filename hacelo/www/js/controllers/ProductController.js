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


controllers.controller('landingCtrl', function($scope, StorageFactory) {
	$scope.market = StorageFactory.init();
});

controllers.controller('processingCtrl', function($scope, $sce, StorageFactory) {
	// TODO add this url into a configuration file, since it is globally, and depends on the ftp.
	$scope.api = $sce.trustAsResourceUrl("https://grooveshark-c9-raiam1234.c9.io/workspace/public/nacion.php");
	$scope.market = StorageFactory.init();

	$scope.range = function(n) {
        return new Array(n);
    };

});
