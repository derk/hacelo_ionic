controllers.controller('landingCtrl', function($scope, ShoppingCartFactory) {
	$scope.cart = ShoppingCartFactory.loadShoppingCart();
});

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

controllers.controller('processingCtrl', function($scope, $sce, StorageService) {
	// TODO add this url into a configuration file, since it is globally, and depends on the ftp.
	$scope.api = $sce.trustAsResourceUrl("https://grooveshark-c9-raiam1234.c9.io/workspace/public/nacion.php");
	$scope.market = StorageService.load();

	$scope.range = function(n) {
        return new Array(n);
    };

});

controllers.controller('addedCtrl', ['$scope', 'ShoppingCartFactory', 'SelectedImagesFactory', function ($scope, ShoppingCartFactory, SelectedImagesFactory) {
    var cart = ShoppingCartFactory.loadShoppingCart();
    $scope.actualOrder = ShoppingCartFactory.getActualOrder();

    console.log($scope.actualOrder);

    if(angular.isObject($scope.actualOrder) === false){
        var dummyOrder = cart.getDummyOrder(
            SelectedImagesFactory.getProductLine(),
            SelectedImagesFactory.getProduct(),
            SelectedImagesFactory.getImagesAfterEdited()
        );
        $scope.actualOrder = dummyOrder;
    }
    console.log($scope.actualOrder);

    ShoppingCartFactory.setActualOrder(null); // remove already saved order
    SelectedImagesFactory.clearSelection();
}]);
