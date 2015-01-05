controllers.controller('landingCtrl', ['$scope', 'ShoppingCartFactory',function($scope, ShoppingCartFactory) {
	$scope.cart = ShoppingCartFactory.loadShoppingCart();
}]);

controllers.controller('productCrtl', ['$scope', '$state', 'SelectedImagesFactory', 'PhotoPrintConfig', function($scope, $state, SelectedImagesFactory, PhotoPrintConfig) {
	$scope.productLines = PhotoPrintConfig.products;
	$scope.saveProductLine = function(pProductLine) {
		SelectedImagesFactory.setProductLine(pProductLine);
		$state.go("app.category");
	};
}]);

controllers.controller('categoryCrtl', ['$scope', '$state', '$ionicPopup', 'SelectedImagesFactory', 'MessageService',function($scope, $state, $ionicPopup, SelectedImagesFactory, MessageService) {
	$scope.productLine = SelectedImagesFactory.getProductLine();

	$scope.saveProduct = function(pProduct) {
		SelectedImagesFactory.setProduct(pProduct);
		$state.go("app.photo");
	};

	var lookForImages = function () {
		if(SelectedImagesFactory.getAll().length>0) {
			$ionicPopup
				.confirm(MessageService.search("loss_of_selected_images"))
					.then(function(res) {
						if(res) {
							// You are sure
							SelectedImagesFactory.clearImages();
						} else {
							// You are not sure
							$state.go("app.photo");
						}
					});
		}
	};

	lookForImages();
}]);

controllers.controller('photoCrtl', ['$scope', '$state', '$timeout', '$window','SelectedImagesFactory',function($scope, $state, $timeout, $window, SelectedImagesFactory) {
	$scope.product = SelectedImagesFactory.getProduct();
	$scope.height = screen.width;

}]);

controllers.controller('processingCtrl', ['$scope', '$sce', 'StorageService',function($scope, $sce, StorageService) {
	// TODO add this url into a configuration file, since it is globally, and depends on the ftp.
	$scope.api = $sce.trus
	tAsResourceUrl("https://grooveshark-c9-raiam1234.c9.io/workspace/public/nacion.php");
	$scope.market = StorageService.load();

	$scope.range = function(n) {
		return new Array(n);
	};

}]);