angular.module('hacelo', [
    'ionic',
    'slick',
    'hacelo.config',
    'hacelo.directives',
    'hacelo.models',
    'hacelo.controllers',
    'hacelo.services'
])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the 
        // accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
    $stateProvider
    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/index.html"
    })
    .state('app.landing', {
        url: "/landing",
        views: {
            'haceloContent': {
                templateUrl: "templates/landing.html",
                controller: "landingCtrl"
            }
        }
    })
    .state('app.products', {
        url: "/products",
        views: {
            'haceloContent': {
                templateUrl: "templates/product.html",
                controller: "productCrtl"
            }
        }
    })
    .state('app.category', {
        url: "/category",
        views: {
            'haceloContent': {
                templateUrl: "templates/category.html",
                controller: "categoryCrtl"
            }
        }
    })
    .state('app.info', {
        url: "/info",
        views: {
            'haceloContent': {
                templateUrl: "templates/info.html",
                controller: "infoCtrl"
            }
        }
    })
    .state('app.photo', {
        url: "/photo",
        views: {
            'haceloContent': {
                templateUrl: "templates/photo.html",
                controller: "photoCrtl"
            }
        }
    })
    .state('app.choose', {
        url: "/choose",
        views: {
            'haceloContent': {
                templateUrl: "templates/choose.html",
                controller: 'PhotoSourceCtrl'
            }
        }
    })
    .state('app.check', {
        url: "/check",
        views: {
            'haceloContent': {
                templateUrl: "templates/check-photo.html",
                controller: 'checkCtrl'
            }
        }
    })
    .state('app.photoEdit', {
        url: "/edit/:id",
        views: {
            'haceloContent': {
                templateUrl: "templates/edit-photo.html",
                controller: 'PhotoEditCtrl'
            }
        }
    })
    .state('app.confirm', {
        url: "/confirm",
        views: {
            'haceloContent': {
                templateUrl: "templates/confirm.html",
                controller: "confirmCtrl"
            }
        }
    })
    .state('app.added', {
        url: "/added",
        views: {
            'haceloContent': {
                templateUrl: "templates/added-cart.html",
                controller: "addedCtrl"
            }
        }
    })
    .state('app.cart', {
        url: "/cart",
        views: {
            'haceloContent': {
                templateUrl: "templates/cart.html",
                controller: 'cartCtrl'
            }
        }
    })
    .state('app.cart-checkout', {
        url: "/cart-checkout",
        views: {
            'haceloContent': {
                templateUrl: "templates/cart-checkout.html"
                //controller: 'cartCheckoutCtrl'
            }
        }
    })
    .state('app.cart-empty', {
        url: "/cart-empty",
        views: {
            'haceloContent': {
                templateUrl: "templates/cart-empty.html"
            }
        }
    })
    .state('app.payment', {
        url: "/payment",
        views: {
            'haceloContent': {
                templateUrl: "templates/payment.html"
            }
        }
    })
    .state('app.confirm-order', {
        url: "/confirm-order",
        views: {
            'haceloContent': {
                templateUrl: "templates/confirm-order.html"
            }
        }
    })
    .state('app.processing-order', {
        url: "/processing-order",
        views: {
            'haceloContent': {
                templateUrl: "templates/processing-order.html",
                controller: "processingCtrl"
            }
        }
    })
    .state('app.order-sent', {
        url: "/order-sent",
        views: {
            'haceloContent': {
                templateUrl: "templates/order-sent.html"
            }
        }
    })
    .state('app.show-love', {
        url: "/show-love",
        views: {
            'haceloContent': {
                templateUrl: "templates/show-love.html"
            }
        }
    })
    .state('app.photobook', {
        url: "/photobook",
        views: {
            'haceloContent': {
                templateUrl: "templates/photobook.html"
            }
        }
    })
    .state('app.share', {
        url: "/share",
        views: {
            'haceloContent': {
                templateUrl: "templates/share.html",
                controller: 'ShareCtrl'
            }
        }
    })
    .state('app.instagram', {
        url: "/instagram",
        views: {
            'haceloContent': {
                templateUrl: "templates/instagram.html",
                controller: 'InstagramCrtl'
            }
        }
    })
    .state('app.congrats', {
        url: "/congrats",
        views: {
            'haceloContent': {
                templateUrl: "templates/congrats.html",
                controller: 'congratsCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/landing');
    // Here we tel to angular that images with `content://` protocol are safe to load
    // more info at: http://goo.gl/8PfN8I
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);    
});
var commons = angular.module('hacelo.config', []);
var controllers = angular.module('hacelo.controllers', []);
/**
 * Created by joseph on 30/11/2014.
 */
var directives = angular.module('hacelo.directives', []);

var models = angular.module('hacelo.models', []);
var services = angular.module('hacelo.services', []);
controllers.controller('addedCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.productName = $stateParams.productName;
}]);
/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('cartCtrl', ['$scope', '$ionicPopup', 'MessageService', 'ShoppingCartFactory', function($scope, $ionicPopup, Messages, ShoppingCartFactory) {
    $scope.cart = ShoppingCartFactory.loadShoppingCart();

    $scope.removeOrder = function (pOrderToRemove) {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_order_delete"),
            confirmPopup = $ionicPopup.confirm(cache);

        confirmPopup.then(function (res) {
            if (res) {
                ShoppingCartFactory.removeOrder(pOrderToRemove.id);
            }
        });
    };
}]);
controllers.controller('checkCtrl', ["$scope", "$state", "$ionicPopup", "SelectedImagesFactory", "MessageService", "PreloaderFactory", function($scope, $state, $ionicPopup, SelectedImagesFactory, Messages, preloader) {
    $scope.images = SelectedImagesFactory.getToPrintOnes();
    // keep track of the state of the loading images.
    $scope.isLoading = true;
    $scope.isSuccessful = false;
    $scope.percentLoaded = 0;

    var preload = function (imageLocations) {
        preloader.preloadImages( imageLocations ).then(
            function handleResolve( imageLocations ) {

                // Loading was successful.
                $scope.isLoading = false;
                $scope.isSuccessful = true;
            },
            function handleReject( imageLocation ) {

                // Loading failed on at least one image.
                $scope.isLoading = false;
                $scope.isSuccessful = false;

                console.error( "Image Failed", imageLocation );
                console.info( "Preload Failure" );

            },
            function handleNotify( event ) {

                // Update UI to show progress percentage
                $scope.percentLoaded = event.percent;
            }
        );
    };

    var init = function () {
        /*
         * Ensure that every selected image have at least a quantity equals to one
         * If the image has other quantity already just preserve that value.
         * Also create a new array of image locations (URLs) to be preloaded
         * */
        var imageLocations = [];
         for (var i = $scope.images.length - 1; i >= 0; i--) {
             if ($scope.images[i].quantity === 0) {
                 $scope.images[i].quantity = 1;
             }

             imageLocations.push($scope.images[i].images.standard_resolution.url);
        }

        preload(imageLocations);
    };

    /*
     * Se encarga de ingresar en el carrito de compras los datos que ya se encuentran 
     * en el array de imagenes, se guardan todos los tipos de fotos asi como la cantidad de cada una
     * y se redirecciona la pantalla de confirmacion.
     * */
    $scope.addToCart = function () {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_check_screen"),
            confirmPopup = $ionicPopup.confirm(cache);

        confirmPopup.then(function (res) {
            if (res) {
                $state.go("app.confirm");
            }
        });
    };

    init();
}]);
/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('confirmCtrl', ['$scope', '$state', '$ionicPopup', 'MessageService', 'ShoppingCartFactory', 'SelectedImagesFactory', function ($scope, $state, $ionicPopup, Messages, ShoppingCartFactory, SelectedImagesFactory) {
    var cart = ShoppingCartFactory.loadShoppingCart();
    /*
     * Create a new order based on the selected: product line, product, and images
     * */
    if (angular.isObject($scope.actualOrder)){
        $scope.actualOrder = null; // trash collector help
    }

    $scope.actualOrder = cart.getDummyOrder(
        SelectedImagesFactory.getProductLine(),
        SelectedImagesFactory.getProduct(),
        SelectedImagesFactory.getToPrintOnes()
    );

    $scope.addToCart = function(){
        // todo: revisar porque no se estan enviando los parametros por URL hacia el estado app.added
        var stateParams = {
                productName: SelectedImagesFactory.getProduct().name
            },
            cache;

        cart.addOrder($scope.actualOrder);

        // Checking if the order was saved
        if(ShoppingCartFactory.saveShoppingCart()) {
            SelectedImagesFactory.clearSelection();
            $state.go("app.added",stateParams);
        } else {
            var cache = angular.isDefined(cache) ? cache: Messages.search("shopping_cart_full");
            $ionicPopup.alert(cache);
        }
    };
}]);
/**
 * Created by joseph on 07/12/2014.
 */
controllers.controller('congratsCtrl', ['clearSelection', function (clearSelection) {
    clearSelection.clearSelection();
}]);
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
controllers.controller('InstagramCrtl', ['$scope', '$filter', '$ionicPopup', '$ionicLoading', 'SelectedImagesFactory', 'MessageService', 'InstagramService', 'ImageFactory', 'PhotoSizeChecker', function ($scope, $filter, $ionicPopup, $ionicLoading, SelectedImagesFactory, MessageService, InstagramService, ImageFactory, PhotoSizeChecker) {
    $scope.loading = false;
    $scope.imageStack = SelectedImagesFactory.getAll();
    $scope.canLoadMore = false;

    $scope.$watch('loading', function(newVal, oldVal) {// for showing and hiding load spinner
        var cache = angular.isDefined(cache)? cache: MessageService.search("loading");
        if (newVal !== oldVal) {
            if (newVal === true) {
                $ionicLoading.show(cache);
            } else {
                $ionicLoading.hide();
            }
        }
    });

    var extractInstagramImages = function(apiResponse) {
        /*
         *   Aquí reviso la respuesta que me devolvió Instagram, le quito los videos y
         *   luego reviso si luego de filtrar lo quedaron  imágenes en caso de que no
         *   quedaran muestro un mensaje al usuario diciéndole que no tiene imágenes
         *   que su cuenta de Instagram y lo envió a la pantalla anterior.
         *   Si hay imágenes las meto al scope para que el usuario decida cuales
         *   imágenes va a imprimir.
         * */
        var filteredResponse = $filter('filter')(apiResponse.data, {type:"image"}),
            j = filteredResponse.length;

        if (j === 0) {
            $ionicPopup.alert(MessageService.search("no-images-found")).then(function(){
                sendUserBackToChoose();
            });
        } else {
            for (var i = 0; i < j; i++) {
                var img = ImageFactory.getInstagramLoadedImg(filteredResponse[i].images);
                $scope.imageStack.push(img);
            }
        }
    };

    var getRecentMedia = function(){
        /*  Se conecta con la API de Instagram por medio del servicio y trae las
         *  ultimas imágenes.En caso de que la respuesta de Instagram venga con
         *  un error (token vencido o alguno otro) Fuerzo al servicio a que haga
         *  un nuevo log in para refrescar el token.
         * */
        $scope.loading = true;
        InstagramService.getRecentMedia()
            .then(function(response) {
                $scope.loading = false;
                if (response.data.meta.code === 400) { // check if token is expired
                    authenticateInstagramUser();
                } else {
                    extractInstagramImages(response.data);
                    canLoadMoreImages();
                }
            }, function(err) {
                $scope.loading = false;
                $ionicPopup.alert(MessageService.search("cannot-load-media"));
            });
    };

    var sendUserBackToChoose = function(){
        $state.go('app.choose');
    };

    var havePreviousImages = function () {
        return (SelectedImagesFactory.getInstagramOnes().length > 0);
    };

    var authenticateInstagramUser = function (){
        /*
        * Muestra la ventana en la que el usuario inicia sesión con su cuenta de Instagram.
        * si el usario no otorga aceso a la cuenta muestra un mensaje de error y redirecciona
        * al usuario a la ventana anterior.
        * */
        InstagramService.auth()
            .then(function(result) {
                getRecentMedia();
            }, function(err) {
                $ionicPopup.alert(MessageService.search("user-denied-access")).then(function(){
                    sendUserBackToChoose();
                });
            });
    };

    var canLoadMoreImages = function(){
        $scope.canLoadMore = InstagramService.canLoadMore();
    };

    var init = function(){
        if (InstagramService.isAuthenticated()){
            if(havePreviousImages()){
                canLoadMoreImages();
            } else {
                getRecentMedia();
            }
        } else {
            authenticateInstagramUser();
        }
    };

    $scope.loadMore = getRecentMedia;

    $scope.checkRequirements = function(image){
        if(image.toPrint === true) {
            image.toPrint = false;
        } else {
            if(PhotoSizeChecker.meetsMinimumRequirements(image, SelectedImagesFactory.getProduct())) {
                image.toPrint = true;
            } else {
                $ionicPopup.alert({
                    title: 'La imagen es muy pequenna',
                    template: 'Lo sentimos :( la foto tiene que ser'+
                    'mayor a '+PhotoSizeChecker.getExpectedSize()+' para asegurarnos'+
                    'una impresión de la más alta calidad.'
                });
            }
        }
    };

    init();
}]);
/**
 * Created by joseph on 30/11/2014.
 */
controllers.controller('PhotoEditCtrl', ['$scope', '$stateParams', '$state', 'SelectedImagesFactory', function ($scope, $stateParams, $state, SelectedImagesFactory) {
    $scope.image = SelectedImagesFactory.getOne($stateParams.id);
    $scope.sResolution = $scope.image.images.standard_resolution;

    var selectedProduct = SelectedImagesFactory.getProduct(),
        drkr;

    $scope.darkroomInit = function(){
        drkr = new Darkroom('#editableImage', {
            // minWidth: selectedProduct.pixel_size.minimum.width,
            // minHeight: selectedProduct.pixel_size.minimum.height,
            maxWidth: angular.element('.canvas').width(),
            plugins: {
                crop: {
                    ratio: ($scope.sResolution.width/$scope.sResolution.height)
                },
                save: false
            },
            init: function(){
                var cropPlugin = this.getPlugin('crop'),
                    optimalWidth = selectedProduct.pixel_size.optimal.width,
                    optimalHeight = selectedProduct.pixel_size.optimal.height;
                cropPlugin.selectZone(
                    (this.image.width-optimalWidth)/2,
                    (this.image.height-optimalHeight)/2,
                    optimalWidth,
                    optimalHeight
                );
            }
        });
    };

    $scope.done = function(){
        $scope.sResolution.url = drkr.snapshotImage();
        drkr.selfDestroy();
        $state.go('app.check');
    };
}]);
controllers.controller('PhotoSourceCtrl', ['$scope', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', function ($scope, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker) {
    $scope.imageStack = SelectedImagesFactory.getAll();

    $scope.phoneImageLoad = function () {
        CordovaCameraService.getImage().then(function (result) {
            var img = ImageFactory.getPhoneLoadedImg(result);
            img.imageInit().then(function(result){
                if(PhotoSizeChecker.meetsMinimumRequirements(result, SelectedImagesFactory.getProduct())){
                    $scope.imageStack.push(result);
                } else {
                    $ionicPopup.alert({
                        title: 'La imagen es muy pequenna',
                        template: 'Lo sentimos :( la foto tiene que ser'+
                        'mayor a '+PhotoSizeChecker.getExpectedSize()+' para asegurarnos'+
                        'una impresión de la más alta calidad.'
                    });
                }
            });
        });
    };
}]);
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

controllers.controller('ShareCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, Nacion_Service) {
    
    $scope.shareFb = function(){
        window.plugins.socialsharing.shareViaFacebook('http://www.hacelodigital.com/')
    };

    $scope.shareTwitter = function(){
        window.plugins.socialsharing.shareViaTwitter('http://www.hacelodigital.com/')
    };

    $scope.shareEmail = function(){
        window.plugins.socialsharing.shareViaEmail('Hacelo','Hacelo');
    };
});
/**
 * Created by joseph on 30/11/2014.
 */
directives.directive('whenLoaded', ['$parse', '$timeout', function ($parse, $timeout) {
    var directiveName = "whenLoaded";
    return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs) {
            iElement.load(function() {
                var fns = $parse(iAttrs[directiveName])(scope);
                for (var i = 0; i < fns.length; i++) {
                    fns[i]();
                }
            });
        }
    };
}]);
models.factory('ImageFactory', ['$q', function ($q) {
    function ImageWrapper (pOrigin, pOriginalSource, pImages, pToPrint, pQuantity) {
        this.origin = pOrigin;
        this._originalSource = pOriginalSource;
        this.images = pImages;
        this.toPrint = pToPrint || false;
        this.quantity = pQuantity || 0;

        return this;
    }
    // ---
    // STATIC ATTRIBUTES.
    // ---
    ImageWrapper.sources = {
        INS: "instagram",
        PHN: "phone"
    };

    // Class used as an abstraction of images loaded from phone gallery
    function PhoneLoadedImg (uri) {
        ImageWrapper.call(this, ImageWrapper.sources.PHN, uri, {}, true);
        this.images.thumbnail = {
            "url": "",
            // the generated thumbnail will have this width
            "width": 150,
            "height": 0
        };
        this.images.standard_resolution = {
            "url": uri,
            "width": 0,
            "height": 0
        };

        this._originalSource = uri;

        this.imageInit = function(){
            var self = this,
                deferred = $q.defer();
            fabric.Image.fromURL(this._originalSource, function(oImg) {
                var imgs = self.images;
                // Setting standard_resolution values
                imgs.standard_resolution.width = oImg.getWidth();
                imgs.standard_resolution.height = oImg.getHeight();
                // Setting thumbnail values
                oImg.scaleToWidth(imgs.thumbnail.width);
                imgs.thumbnail.url = oImg.toDataURL({"format": "jpeg"});
                imgs.thumbnail.height = oImg.getHeight();
                // All done here. Now notify the controller with success response
                deferred.resolve(self);
            });

            return deferred.promise;
        };
    }
    PhoneLoadedImg.prototype = new ImageWrapper();
    PhoneLoadedImg.prototype.constructor = PhoneLoadedImg;

    // Class used as an abstraction of images loaded from Instagram
    function InstagramLoadedImg (imagesObj) {
        ImageWrapper.call(this, ImageWrapper.sources.INS, imagesObj, angular.copy(imagesObj,{}));
    }
    InstagramLoadedImg.prototype = new ImageWrapper();
    InstagramLoadedImg.prototype.constructor = InstagramLoadedImg;

    return {
        getPhoneLoadedImg: function (pUri) {
            return new PhoneLoadedImg(pUri);
        },
        getInstagramLoadedImg: function (pImagesObj) {
            return new InstagramLoadedImg(pImagesObj);
        },
        restoreImage: function(pObj){
            var restoredImage;
            switch (pObj.origin) {
                case ImageWrapper.sources.PHN:
                    restoredImage = this.getPhoneLoadedImg(pObj._originalSource);
                    break;
                case ImageWrapper.sources.INS:
                    restoredImage = this.getInstagramLoadedImg(pObj._originalSource);
                    break;
            }
            restoredImage.images = pObj.images;
            restoredImage.toPrint = pObj.toPrint;
            restoredImage.quantity = pObj.quantity;
            return restoredImage;
        }
    };
}]);

// I provide a utility class for preloading image objects.
models.factory("PreloaderFactory", function ($q, $rootScope) {
    // I manage the preloading of image objects. Accepts an array of image URLs.
    function Preloader(imageLocations) {

        // I am the image SRC values to preload.
        this.imageLocations = imageLocations;

        // As the images load, we'll need to keep track of the load/error
        // counts when announing the progress on the loading.
        this.imageCount = this.imageLocations.length;
        this.loadCount = 0;
        this.errorCount = 0;

        // I am the possible states that the preloader can be in.
        this.states = {
            PENDING: 1,
            LOADING: 2,
            RESOLVED: 3,
            REJECTED: 4
        };

        // I keep track of the current state of the preloader.
        this.state = this.states.PENDING;

        // When loading the images, a promise will be returned to indicate
        // when the loading has completed (and / or progressed).
        this.deferred = $q.defer();
        this.promise = this.deferred.promise;
    }


    // ---
    // STATIC METHODS.
    // ---
    Preloader.preloadImages = function (imageLocations) {
        // I reload the given images [Array] and return a promise. The promise
        // will be resolved with the array of image locations.
        var preloader = new Preloader(imageLocations);
        return ( preloader.load() );
    };


    // ---
    // INSTANCE METHODS.
    // ---
    Preloader.prototype = {
        // Best practice for "instanceof" operator.
        constructor: Preloader,

        // ---
        // PUBLIC METHODS.
        // ---
        isInitiated: function isInitiated() {
            // I determine if the preloader has started loading images yet.
            return ( this.state !== this.states.PENDING );
        },
        isRejected: function isRejected() {
            // I determine if the preloader has failed to load all of the images.
            return ( this.state === this.states.REJECTED );
        },
        isResolved: function isResolved() {
            // I determine if the preloader has successfully loaded all of the images.
            return ( this.state === this.states.RESOLVED );
        },
        load: function load() {
            // I initiate the preload of the images. Returns a promise.
            // If the images are already loading, return the existing promise.
            if (this.isInitiated()) {
                return (this.promise);
            }

            this.state = this.states.LOADING;

            for (var i = 0; i < this.imageCount; i++) {
                this.loadImageLocation(this.imageLocations[i]);
            }

            // Return the deferred promise for the load event.
            return ( this.promise );
        },

        // ---
        // PRIVATE METHODS.
        // ---
        handleImageError: function handleImageError(imageLocation) {
            // I handle the load-failure of the given image location.
            this.errorCount++;

            // If the preload action has already failed, ignore further action.
            if (this.isRejected()) {
                return;
            }

            this.state = this.states.REJECTED;
            this.deferred.reject(imageLocation);
        },
        handleImageLoad: function handleImageLoad(imageLocation) {
            // I handle the load-success of the given image location.
            this.loadCount++;
            // If the preload action has already failed, ignore further action.
            if (this.isRejected()) {
                return;
            }

            // Notify the progress of the overall deferred. This is different
            // than Resolving the deferred - you can call notify many times
            // before the ultimate resolution (or rejection) of the deferred.
            this.deferred.notify({
                percent: Math.ceil(this.loadCount / this.imageCount * 100),
                imageLocation: imageLocation
            });

            // If all of the images have loaded, we can resolve the deferred
            // value that we returned to the calling context.
            if (this.loadCount === this.imageCount) {
                this.state = this.states.RESOLVED;
                this.deferred.resolve(this.imageLocations);
            }
        },
        loadImageLocation: function loadImageLocation(imageLocation) {
            // I load the given image location and then wire the load / error
            // events back into the preloader instance.
            // --
            // NOTE: The load/error events trigger a $digest.
            var preloader = this;
            // When it comes to creating the image object, it is critical that
            // we bind the event handlers BEFORE we actually set the image
            // source. Failure to do so will prevent the events from proper
            // triggering in some browsers.
            var image = $(new Image())
                    .load(
                    function (event) {
                        // Since the load event is asynchronous, we have to
                        // tell AngularJS that something changed.
                        $rootScope.$apply(
                            function () {
                                preloader.handleImageLoad(event.target.src);
                                // Clean up object reference to help with the
                                // garbage collection in the closure.
                                preloader = image = event = null;
                            }
                        );
                    }
                )
                    .error(
                    function (event) {
                        // Since the load event is asynchronous, we have to
                        // tell AngularJS that something changed.
                        $rootScope.$apply(
                            function () {
                                preloader.handleImageError(event.target.src);
                                // Clean up object reference to help with the
                                // garbage collection in the closure.
                                preloader = image = event = null;
                            }
                        );
                    }
                )
                    .prop("src", imageLocation)
                ;
        }
    };
    // Return the factory instance.
    return ( Preloader );
});
models.factory('SelectedImagesFactory', ['$filter', function ($filter) {
    /**
     * A simple service that returns the array of selected images.
     * Also store the selected product with his parent product line
     */
    var selectedImages = [],
        productLine = {},
        product = {};

    return {
        addItem: function(pItem) {
            if (angular.isObject(pItem)) {
                angular.copy(pItem, selectedImages);
            }
        },
        getInstagramOnes: function() {
            return $filter('filter')(selectedImages, {origin:"instagram"});
        },
        getToPrintOnes: function() {
            return $filter('filter')(selectedImages, {toPrint:true});
        },
        getAll: function() {
            return selectedImages;
        },
        getOne: function(id){
            return this.getToPrintOnes()[id];
        },
        setProductLine: function(pProductLine){
            productLine = pProductLine;
        },
        getProductLine: function(){
            return productLine;
        },
        setProduct: function(pProduct){
            product = pProduct;
        },
        getProduct: function(){
            return product;
        },
        clearSelection: function () {
            selectedImages = [];
            productLine = {};
            product = {};
        }
    };
}]);

/**
 * Created by joseph on 29/11/2014.
 */
models.factory('ShoppingCartFactory', ['StorageService', 'ImageFactory', function (StorageService, ImageFactory) {
    // ---
    // PRIVATE ATTRIBUTES.
    // ---
    var shoppingCart;

    // ---
    // APPLICATION OBJECT MODELS
    // ---
    function Order (pProductLine, pProduct, pItems){
        // ---
        // PRIVATE METHODS.
        // ---
        var makeId = function(){
            // creates unique ID's for orders
            var id = '';
            for (var i = 5 - 1; i >= 0; i--) {
                var rand = (((1 + Math.random()) * 0x10000) | 0).toString(16);
                id += rand;
                id += (i>0)?'-':'';
            }
            return id;
        };

        // ---
        // PUBLIC ATTRIBUTES.
        // ---
        this.id = makeId();
        this.productLine = pProductLine;
        this.product = pProduct;
        this.items = pItems;

        // ---
        // PUBLIC METHODS.
        // ---
        this.getQuantity = function () {
            var numberOfItems = 0;
            for (var i = this.items.length - 1; i >= 0; i--) {
                numberOfItems += this.items[i].quantity;
            }
            return numberOfItems;
        };

        this.computeSubTotal = function () {
            var subTotal = 0,
                numberOfItems = this.getQuantity(),
                firstItems = this.product.prices.first_items,
                additionalItem = this.product.prices.additional;

            if (numberOfItems <= firstItems.quantity) {
                subTotal = firstItems.price;
            } else if (numberOfItems > firstItems.quantity) {
                var numberOfAdditionalItems = numberOfItems - firstItems.quantity;
                subTotal = firstItems.price + (numberOfAdditionalItems * additionalItem.price);
            }

            return subTotal;
        };
    }

    function ShoppingCart(pCustomer, pOrders) {
        // ---
        // PUBLIC ATTRIBUTES.
        // ---
        this.customer = (angular.isObject(pCustomer))? pCustomer : {
            name: "",
            firstName: "",
            secondSurname: "",
            phone: "",
            address: {
                province: "",
                canton: "",
                district: ""
            }
        };
        this.orders = pOrders || [];

        // ---
        // PUBLIC METHODS.
        // ---
        this.addOrder = function(DummyOrder){
            if( (DummyOrder instanceof Order) === false ) {return;}

            this.orders.push(DummyOrder);
            return this.orders[this.orders.length-1];
        };

        this.getDummyOrder = function(pProductLine, pProduct, pItems){
            return new Order(pProductLine, pProduct, pItems);
        };

        this.removeOrder = function(pOrderId){
            for (var i = this.orders.length - 1; i >= 0; i--) {
                if (this.orders[i].id === pOrderId) {
                    this.orders.splice(i,1);
                }
            }
        };

        this.computeSubTotal = function () {
            var subTotal = 0;
            for (var i = this.orders.length - 1; i >= 0; i--) {
                subTotal += this.orders[i].computeSubTotal();
            }
            return subTotal;
        }
    }

    // ---
    // FACTORY HELPER METHODS.
    // ---
    var restoreImages = function (pImages2Restore) {
        var restored = [];

        for (var i = 0, j = pImages2Restore.length; i < j; i++) {
            restored.push(ImageFactory.restoreImage(pImages2Restore[i]));
        }

        return restored;
    };

    var restoreOrders = function (pOrders2Restore) {
        var restored = [];

        for (var i = 0, j = pOrders2Restore.length; i < j; i++) {
            restored.push(
                new Order(
                    pOrders2Restore[i].productLine,
                    pOrders2Restore[i].product,
                    restoreImages(pOrders2Restore[i].items)
                )
            );
        }

        return restored;
    };

    return {
        saveShoppingCart: function(){
            return StorageService.save(shoppingCart);
        },
        loadShoppingCart: function(){
            /*
            * Load any data stored
            * then check if some shopping cart was already created
            * if yes load it or create a new one and save it (for future usage)
            * and finally return the loaded/created shopping cart
            * */
            var lastShoppingCart,
                restoredOrders;

            if (angular.isUndefined(shoppingCart)) {
                lastShoppingCart = StorageService.load();

                if(angular.isObject(lastShoppingCart)){
                    restoredOrders = restoreOrders(lastShoppingCart.orders);
                    shoppingCart = new ShoppingCart(lastShoppingCart.customer, restoredOrders);
                } else {
                    shoppingCart = new ShoppingCart();
                    this.saveShoppingCart();
                }
            }
            return shoppingCart;
        },
        removeOrder: function (pOrderId) {
            shoppingCart.removeOrder(pOrderId);
            this.saveShoppingCart();
        }
    };
}]);
services.service('CordovaCameraService', ['$window','$q', function ($window,$q) {
    var cam,
        cameraOptions,
        init = function() {
            cam = $window.navigator.camera;
            cameraOptions = {
                quality : 100,
                destinationType : cam.DestinationType.FILE_URI,
                sourceType : cam.PictureSourceType.PHOTOLIBRARY,
                /*allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false*/
            };
        };

    this.getImage = function() {
        var q = $q.defer();
        cam.getPicture(function(result) {
            q.resolve(result);
        }, function(result) {
            q.reject(result);
        }, cameraOptions);

        return q.promise;
    };

    // wait until the device is ready to setup everything
    ionic.Platform.ready(init);
}]);

services.service('InstagramService', ['$http', '$window', '$q', function ($http, $window, $q) {
    var self = this,
        user,
        accessToken,
        lastInstagramLoad,
        config = {
            clientId: '70a2ae9262fc4805a5571e8036695a4d',
            redirectUri: 'http://www.wikipedia.org/',
            apiUrl: 'https://api.instagram.com/v1/',
            oauthUrl: 'https://instagram.com/oauth/authorize/?',
            scope: 'basic'
        };

    this.isAuthenticated = function () {
        return angular.isDefined(accessToken);
    };

    var fetch = function (url, options) {
        var prms = {
                client_id: config.clientId,
                callback: 'JSON_CALLBACK'
            };
        if (self.isAuthenticated()) {
            prms.access_token = accessToken;
        }
        var cnfg = {
                url: config.apiUrl + url,
                method: 'jsonp',
                responseType: 'json',
                params: angular.extend({}, prms, options)
            };
        return $http(cnfg);
    };

    var getUrlParameters = function (parameter, staticURL, decode) {
        /*
        Function: getUrlParameters
        Description: Get the value of URL parameters either from 
                     current URL or static URL
        Author: Tirumal
        URL: www.code-tricks.com
       */
       var currLocation = (staticURL.length)? staticURL : window.location.search,
           parArr = currLocation.split('?')[1].split('&'),
           returnBool = true,
           parr;
       
       for (var i = 0; i < parArr.length; i++){
            parr = parArr[i].split('=');
            if(parr[0] == parameter){
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
                returnBool = true;
            }else{
                returnBool = false;            
            }
       }
       
       if(!returnBool) return false;
    };

    var bindAuthEvents = function(authTab) {
        // This function bind the evens to the instagram autentication screen
        // If every thing goes good then store the token
        // Also handle how the app respond to an authentication error
        var deferred = $q.defer();
        authTab.addEventListener('loadstart', function(e) {
            if (e.url.search('access_token') !== -1) { // access granted
                accessToken = e.url.substr(e.url.search('access_token')+'access_token='.length);
                authTab.close();
                deferred.resolve({
                    authorized: true
                });
            } else if (e.url.search('error') !== -1) { // The user denied access
                authTab.close();
                deferred.reject({
                    error: getUrlParameters('error',e.url,true),
                    errorReason: getUrlParameters('error_reason',e.url,true),
                    errorDescription: getUrlParameters('error_description',e.url,true)
                });
            }
        });
        return deferred.promise;
    };

    this.auth = function() {
        var options = {
                client_id:      config.clientId,
                redirect_uri:   config.redirectUri,
                scope:          config.scope,
                response_type:  'token'
            },
            authParams = '';

        angular.forEach(options, function(value, key) {
            return authParams += key + '=' + value + '&';
        });
        var authUrl = config.oauthUrl + authParams;

        return bindAuthEvents($window.open(authUrl, '_blank', 'location=yes'));
    };

    this.hasLastInstagramLoad = function(){
        return angular.isDefined(lastInstagramLoad);
    };

    this.canLoadMore = function(){
        var can;
        if(!self.hasLastInstagramLoad()){
            can = true;
        } else if (angular.isDefined(lastInstagramLoad.pagination)) {
            if (angular.isDefined(lastInstagramLoad.pagination.next_url)){
                can = true;
            } else {
                can = false;
            }
        } else {
            can = false;
        }
        return can;
    };

    this.getRecentMedia = function() {
        var prms = {},
            deferred = $q.defer();

        if (self.hasLastInstagramLoad()) {
            if(self.canLoadMore()) {
                prms.max_id = lastInstagramLoad.pagination.next_max_id;
            }
        }
        fetch('users/self/media/recent', prms).then(
            function(response){
                lastInstagramLoad = response.data;
                deferred.resolve(response);
            },
            function(response){
                deferred.reject(response);
            }
        );
        return deferred.promise;
    };
}]);
services.service('LocationPrvdr', ['$http', function ($http) {
	var costaRica;

	var init = function() {
		$http.get('js/common/costa-rica.json').
			success(function(data, status, headers, config) {
				costaRica = angular.fromJson(data);
			}).
			error(function(data, status, headers, config) {
				console.log("Costa Rica JSON not found");
			});
	};

	var iterate = function(obj) {
		result = [];
		angular.forEach(obj, function(value, key, obj) {
			result.push({
				id: key,
				name: value.title
			});
		});
		return result;
	};

	this.getProvinces = function() {
		return iterate(costaRica.provincias);
	};

	this.getCantons = function(provinceID) {
		return iterate(costaRica.provincias[provinceID].cantones);
	};

	this.getDistricts = function(provinceID, cantonID) {
		return iterate(costaRica.provincias[provinceID].cantones[cantonID].distritos);
	};

	init();
}])
services.service('MessageService', ['$http', function ($http) {
    // Private stuff
    var messages =          null,
        messageDBlocation = "js/common/messagesDB.json",
        self =              this,
        callbackResult =    function(data, status, headers, config) {
            messages = data ? angular.fromJson(data) : {};
        },
        initMessages =      function() {
            $http.get(messageDBlocation)
                .success(callbackResult)
                .error(callbackResult);
        };
    this.keyToValue =   function(searchCriteria, obj) {
        var resul;
        if (angular.isDefined(obj[searchCriteria])) {
            return obj[searchCriteria];
        }
        for(var key in obj) {
            if( angular.isObject(obj[key]) ){
                var resul = this.keyToValue(searchCriteria, obj[key]);
            }
            if (angular.isDefined(resul)) break;
        }
        return resul;
    };
    // Public stuff
    this.search = function(msjKey) {
        var resul = this.keyToValue(msjKey, messages);
        return resul;
    };
    // Load the messages from JSON file
    initMessages();
}]);
/**
 * Created by joseph on 24/11/2014.
 */
services.service('PhotoSizeChecker', [function () {
    var self = this,
        minimumSize,
        imageDimensions;

    var meetsOrientation = function(){
        var expectedOrientation = self.getOrientation(minimumSize.width, minimumSize.height),
            imageOrientation = self.getOrientation(imageDimensions.width, imageDimensions.height);
        return (expectedOrientation === imageOrientation);
    };

    var meetsArea = function(){
        var minimumArea = self.computeArea(minimumSize.width, minimumSize.height),
            imageArea = self.computeArea(imageDimensions.width, imageDimensions.height);

        return (imageArea >= minimumArea);
    };

    this.getExpectedSize = function(){
        return minimumSize.width+"px x "+ minimumSize.height+"px";
    };

    this.computeArea = function(w, h){
        return ( w*h );
    };

    this.getOrientation = function(width, height){
        var orientation = "square";
        if(width > height) {
            orientation = "landscape";
        } else if(width < height) {
            orientation = "portrait";
        }
        return orientation;
    };

    this.meetsMinimumRequirements = function(ImageWrapper, pSelectedProduct){
        // update local helper variables
        minimumSize  = pSelectedProduct.pixel_size.minimum;
        imageDimensions = ImageWrapper.images.standard_resolution;
        // then decide if the provided image meets the minimum requirements
        return ( meetsArea() );
    };
}]);
/**
 * Created by joseph on 30/11/2014.
 */
services.service('StorageService', ['$window', function ($window) {
    var storage = $window.localStorage,
        prefix = "hacelo";

    this.save = function(pCartData) {
        var saved = true;
        try {
            storage.setItem(prefix, angular.toJson(pCartData, false));
        } catch (e) {
            saved = false;
        }
        return saved;
    };

    this.load = function() {
        return angular.fromJson(storage.getItem(prefix));
    };

    this.clear = function() {
        this.save("");
    };
}]);
commons.constant('PhotoPrintConfig', {
    "products": [
        /*
         * here we hold the information related to every product line product.
         * And inside of it all the products for that line.
         * */
        {
            id: "pictures",
            "name": "Fotografias",
            "products": [
                {
                    "name": "4x6",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 4,
                        "height": 6
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 500,
                            "height": 700
                        },
                        "minimum": {
                            "width": 300,
                            "height": 450,
                            // 1.5 = horizontal = marco = fut, 0.5 = vertical = puerta
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 21,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 4999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                },
                {
                    "name": "5x7",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 5,
                        "height": 7
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 500,
                            "height": 700
                        },
                        "minimum": {
                            "width": 375,
                            "height": 525,
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 16,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 5499
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                },
                {
                    "name": "8x10",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 8,
                        "height": 10
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 500,
                            "height": 700
                        },
                        "minimum": {
                            "width": 600,
                            "height": 750,
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 6,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 6499
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "quadrate",
            "name": "Cuadradas",
            "products": [
                {
                    "name": "4x4",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 4,
                        "height": 4
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 300,
                            "height": 500
                        },
                        "minimum": {
                            "width": 300,
                            "height": 300,
                            "aspect": "square"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 35,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 4999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                },
                {
                    "name": "8x8",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 8,
                        "height": 8
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 600,
                            "height": 600
                        },
                        "minimum": {
                            "width": 600,
                            "height": 600,
                            "aspect": "square"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 6,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 5999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                },
                {
                    "name": "10x10",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 10,
                        "height": 190
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 600,
                            "height": 600
                        },
                        "minimum": {
                            "width": 750,
                            "height": 750,
                            "aspect": "square"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 4,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 6999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "photobook",
            "name": "Photobook",
            "products": [
                {
                    "name": "8.5x11",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 8.5,
                        "height": 11
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 300,
                            "height": 500
                        },
                        "minimum": {
                            "width": 637,
                            "height": 825,
                            "aspect": "portrait"

                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 38,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 17499
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                },
                {
                    "name": "12x9",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 12,
                        "height": 9
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 600,
                            "height": 600
                        },
                        "minimum": {
                            "width": 900,
                            "height": 675,
                            "aspect": "landscape"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 38,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 19999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "woodFrame",
            "name": "Marco de Madera",
            "products": [
                {
                    "name": "4x4",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 4,
                        "height": 4
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 300,
                            "height": 500
                        },
                        "minimum": {
                            "width": 300,
                            "height": 300,
                            "aspect": "square"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 1,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 14999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                },
                {
                    "name": "8x8",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 8,
                        "height": 8
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 600,
                            "height": 600
                        },
                        "minimum": {
                            "width": 600,
                            "height": 600,
                            "aspect": "square"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 1,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 19999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                },
                {
                    "name": "11x17",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 11,
                        "height": 17
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 600,
                            "height": 600
                        },
                        "minimum": {
                            "width": 825,
                            "height": 1275,
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 1,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 31999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                },
                {
                    "name": "14x20",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 14,
                        "height": 20
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 600,
                            "height": 600
                        },
                        "minimum": {
                            "width": 1050,
                            "height": 1500,
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 1,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 38999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                },
                {
                    "name": "20x29",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 20,
                        "height": 29
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 600,
                            "height": 600
                        },
                        "minimum": {
                            "width": 1500,
                            "height": 2175,
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 1,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 58999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "photostrips",
            "name": "Photostrips",
            "products": [
                {
                    "name": "4.25x17.78",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 4.25,
                        "height": 17.78
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 300,
                            "height": 500
                        },
                        "minimum": {
                            "width": 333,
                            "height": 1333,
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 12,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 4999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "poster",
            "name": "Poster",
            "products": [
                {
                    "name": "20.1x29.1",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 20.1,
                        "height": 29.1
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 1800,
                            "height": 1100
                        },
                        "minimum": {
                            "width": 1507,
                            "height": 2182,
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 1,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 12999
                        },
                        "additional": {
                            "price": 1575
                        }
                    }
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "largeFormat",
            "name": "Gran Formato",
            "products": [
                {
                    "name": "11x17",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 11,
                        "height": 17
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 1800,
                            "height": 1100
                        },
                        "minimum": {
                            "width": 825,
                            "height": 1275,
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 2,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 12999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                },
                {
                    "name": "14x20",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 14,
                        "height": 20
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 1050,
                            "height": 1500
                        },
                        "minimum": {
                            "width": 1050,
                            "height": 1500,
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 2,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 13999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                },
                {
                    "name": "20.1 x 29.1",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 20.1,
                        "height": 29.1
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 1050,
                            "height": 1500
                        },
                        "minimum": {
                            "width": 1507,
                            "height": 2181,
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 1,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 14999
                        },
                        "additional": {
                            "price": 1000
                        }
                    }
                }

            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        }
    ]
});