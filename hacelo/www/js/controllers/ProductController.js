/* InfoCtrl Accordion List
 * $scope - Scope de la pantalla
 */

controllers.controller('productCrtl', function($scope, SelectedImagesFactory, PhotoPrintConfig) {

	$scope.saveOption = function(option) {
		if(PhotoPrintConfig.products.hasOwnProperty(option)){
			SelectedImagesFactory.setCategory(PhotoPrintConfig.products[option]);
		}
	};
});

controllers.controller('categoryCrtl', function($scope, SelectedImagesFactory, PhotoPrintConfig) {
	$scope.options = SelectedImagesFactory.getCategory();

	$scope.pickCategory = function(model) {
		SelectedImagesFactory.setSettings(model);
	};
});

controllers.controller('photoCrtl', function($scope, SelectedImagesFactory, PhotoPrintConfig) {
	$scope.settings = SelectedImagesFactory.getSettings();
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

