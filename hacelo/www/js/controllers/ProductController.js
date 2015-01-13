controllers.controller('landingCtrl', ['$scope', '$ionicLoading','ShoppingCartFactory','MessageService',function($scope, $ionicLoading, ShoppingCartFactory, MessageService) {
	$scope.cart = null;

    $ionicLoading.show({
	    template: 'Cargando... '
    });

	ShoppingCartFactory.load().then(function(e){
		$scope.cart = e;
		$ionicLoading.hide();
	});
	
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
		if(SelectedImagesFactory.getAll().length>0) {oce
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

controllers.controller('processingCtrl', ['$scope', '$ionicLoading', '$sce', 'StorageService','ShoppingCartFactory', 'MessageService', 'Utils' ,function($scope, $ionicLoading, $sce, StorageService, ShoppingCartFactory, Messages, Utils) {
	
	// TODO add this url into a configuration file, since it is globally, and depends on the ftp.
	$scope.api = $sce.trustAsResourceUrl("https://grooveshark-c9-raiam1234.c9.io/workspace/public/nacion.php");
	$scope.market = StorageService.load();
	$scope.cart = ShoppingCartFactory.loadShoppingCart();

	/*var img = "data:image/png;base64,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ztr8L1myJCkpKcnbPp/Pddcato/2yBnoY8wpp5wSV155ZcbHHD58OC6//PJYtGhRVsb85S9/GX/zN38T9fX1GR/32c9+tk39gMrYsWNTz5Bs27bNRpcll19+ecb7a2trY9asWVn5VcLbbrstvvOd71jox5iqqqq48MILU7+n0RAbNmyICy+8MPUSedOnT4/y8nIL/0MmT56cdvIvrrnmmqz8iNKSJUvioosuitraWgseZ6D9NX9027ZtS3r06JE6RklJSfLd7363yePU19cn//mf/5l06NAhdayPfexjSWVlZZvaTjZu3Jj6vM4444xky5YtttkszMOGDRtS3z2JiGTatGlJXV1dk8aorq5O/vZv/7ZRZ6GcgW4/Z6DfvfXr1y9ZvHhxk8dctGhR0q9fv9RxOnfunPzud7+z/3+EqqqqpGPHjqnTnTJlSrJr164mv0bdddddjT7z7Aw0SZIkltwxGiP3339/gw8SkyZNSp577rlGTf/pp59Oxo0b1+Ax/vd//7dNbiujR49OfW7du3dP/uEf/iH52c9+lqxevTrZtWtXUltba5ttgssvv7xB29Opp56aPP/88w2ebk1NTfL9738/6d+//0dO78orrxTQ7TSgP/WpT33kvxcVFSWzZs1KNm/e3OCxNm/enMyaNSv142rv3u688077fwYN/WN2wIABycMPP5wcOXKkwdN+6qmnkjPOOOOo07ziiisENBkV/GHh8gEFBQWpbx21h3mYNWtW/Pd//3eDHz98+PC49NJLY+LEiVFeXh69e/eOTp06RU1NTezYsSMqKiriueeei/nz5zfqighf+MIX2uzb5XPmzEm9skgz3h2yzX5IRUVFjBw5Mg4fPtygx0+aNCkuvvjimDJlSvTt2zd69+4dhYWFsW/fvti0aVO8+uqr8eyzz8bPf/7zo/5ww6BBg2LlypUZf4iouc+vpddfex4/bdpvv/12DB069KgfBSgqKooLL7wwpk6dGmPHjo2ysrL3LmG5d+/eWLduXbzyyivx2GOPxRNPPNHgL51ecMEF8fjjj6fO37G8/69evTpGjRrV4P29rKwspk+fHmeddVYMGzYsevbsGV26dImamprYtm1bVFRUxPPPPx+PPPJIrFmz5qjT6dOnT6xatSo+9rGP5Xy55mPdtYbtw0c4nIFuV2fzamtrk/PPP79Jb11l63bJJZck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";

	$scope.market.orders = [
		{
			items: [
				{
					images: {
						quantity: 22, 
						standard_resolution : {
							url:img
						}
					}
				}
			],
			productLine :{
				name:"test1"
			},
			product: {
				name:"test"
			}
		},
		{
			items: [
				{
					images: {
						quantity: 22, 
						standard_resolution : {
							url:img
						}
					}
				}
			],
			productLine: {
				name:"test1"
			},
			product: {
				name:"test"
			}
		},
		{
			items: [
				{
					images: {
						quantity: 22, 
						standard_resolution : {
							url:img
						}
					}
				}
			],
			productLine :{
				name:"test1"
			},
			product: {
				name:"test"
			}
		}

	];*/

	console.log($scope.market);
	window.el = $scope.market;

	var prefix = "data:image/png;base64,",
		cache = angular.isDefined(cache) ? cache: Messages.search("processing"),
		photos = 0,
		cont = 0;

	$scope.range = function(n) {
		return new Array(n);
	};

	// Prepating photos
	var preparePhotos = function(url){
		$ionicLoading.show(cache);

       // $scope.market.orders[0].items[0].images.standard_resolution.url
	    for(var x = 0; x < $scope.market.orders.length; x++){
	    	for(var y = 0; y < $scope.market.orders[x].items.length; y++){
	    		if ($scope.market.orders[x].items[y].images.standard_resolution.url.indexOf(prefix) == -1) {
	    			console.log($scope.market.orders[x].items[y].images.standard_resolution.url);
	    			photos = photos + 1;
	    			Utils.getImageDataURL($scope.market.orders[x].items[y].images.standard_resolution.url, x, y).then(function(e){
	    				window.data = e;
			        	console.log(e);
			        	cont = cont + 1;
			        	$scope.market.orders[e.x].items[e.y].images.standard_resolution.url = e.data;
			        	if(cont == photos){
			        		$ionicLoading.hide();
			        		console.log($("form"));
			        		//$("input[type=submit]").click();
			        	}
		        	});
	    		} //Close of if
	    	}
	    }
	};

	
    preparePhotos();

}]);