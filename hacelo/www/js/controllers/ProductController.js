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