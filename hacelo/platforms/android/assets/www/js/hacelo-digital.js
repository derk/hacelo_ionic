angular.module('hacelo', [
    'ionic',
    'slick',
    'hacelo.config',
    'hacelo.models',
    'hacelo.controllers',
    'hacelo.providers',
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
                templateUrl: "templates/added-cart.html"
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
                templateUrl: "templates/processing-order.html"
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
 (function(){

 	window.hacelo = window.hacelo || {};
 	window.hacelo = {
 		alert : function(string){
 			alert(string);
 		},

 		messages :{
 			"Loading":"<span>Cargando...</span><i class='icon ion-looping'></i>"
 		}
 	};

 })();
var commons = angular.module('hacelo.config', []);
var controllers = angular.module('hacelo.controllers', []);
var models = angular.module('hacelo.models', []);
var providers = angular.module('hacelo.providers', []);
var services = angular.module('hacelo.services', []);
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
controllers.controller('checkCtrl', ["$scope", "$state", "$ionicPopup", "$timeout", "SelectedImagesFactory", "MessageService", "Market", function($scope, $state, $ionicPopup, $timeout, SelectedImages, Messages, Market) {
    $scope.images = SelectedImages.getToPrintOnes();
    $scope.dkrm;

    /*
     * Esta es la funcion de crop que se encarga de llamar a la ventana de 
     * cropeo, donde se abrira un popup para que se pueda seleccionar el 
     * area de cropeo.
     * */
    $scope.crop = function ($index) {
        $scope.showPopup($index);
    };


    /*
     * Se encarga de abrir el popup con la informacion, 
     * recibe un indice, el cual corresponde al indice del array
     * donde obtendra la imagen seleccionada
     * Ademas tiene un template y opciones determinada a escoger.
     * */
    $scope.showPopup = function ($index) {
        $scope.data = {};
        $scope.img = $scope.images[$index].images.standard_resolution;

        var cropPopup = $ionicPopup.show({

            template: ' <img id="cropArea" src="{{img.url}}" alt="$index">',
            title: 'Cortar la Fotografía',
            subTitle: 'Selecciona el area a cortar',
            scope: $scope,
            buttons: [
                {text: 'Cancelar'},
                {text: '<b>Save</b>',
                 type: 'button-positive',
                 onTap: function (e) {
                     $scope.images[$index].images.standard_resolution.url = $scope.dkrm.snapshotImage();
                    cropPopup.close();
                 }
                }]
        });

        $timeout(function () {
            $scope.executeCrop();
        }, 100);
    };

    /*
     * Se llama para mantener un area de cropeo por default
     * el cual sera las esquinas de la imagen, ademas se le asigna
     * el valor a la variable de scope dkrm, donde se podra acceder desde el boton 
     * de tap del modal.
     * */
    $scope.executeCrop = function () {
        $scope.dkrm = new Darkroom('#cropArea', {
            minWidth: 100,
            minHeight: 100,
            maxWidth: 650,
            maxHeight: 500,
            plugins: {
                crop: {quickCropKey: 67}
            },

            init: function () {
                var cropPlugin = this.getPlugin('crop');
                cropPlugin.selectZone(170, 25, 300, 300);
            }
        });
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
                Market.insert($scope.images);
                $state.go("app.confirm");
            }
        });
    };
}]);
/* ChooseCrtl para controlar la pantalla de escoger
 * $scope - Scope de la pantalla
 * Nacion_Service - Servicio de datos de nacion, service.js
 */
controllers.controller('chooseCtrl', function($scope, Nacion_Service) {
    //Variables for using on the app
    $scope.username = '';
    $scope.instagram_pics = Nacion_Service.get_entire_ins_pics();
    $scope.all_pics_for_print = Nacion_Service.get_instagram_pics_on_queue();

    //Function for init the isntagram
    $scope.init_instagram = function(username) {
        var instagram_v = new Instagram(username);
        instagram_v.init();
    };

    //Open the new window with the correct url for using
    $scope.call_popup = function() {
        if (Nacion_Service.get_entire_ins_pics().length <= 0) {
            var instagram_v = new Instagram();
            instagram_v.init();
            //$scope.modal.show();
        } else {
            Nacion_Service.show(hacelo.messages.Loading);
            setTimeout(function() {
                window.location.href = '#/app/instagram';
            }, 500);

        }
    };

    //Document listener for when updating username
    document.addEventListener('update-username', function(e) {
        $scope.username = e.detail;
        $scope.init_instagram($scope.username);
    });
    document.addEventListener('pagination', function(e) {
        Nacion_Service.setNextUrl(e.detail);
    });
    //Listener when the page just got the code and the images as well.
    document.addEventListener('finish', function(e) {
        //Open the loading popup
        Nacion_Service.show(hacelo.messages.Loading);
        //little timeout to ensure the pop up to appear
        setTimeout(function() {
            $scope.instagram_pics = e.detail;
            var array = [];
            for (var el = 0; el < $scope.instagram_pics.length; el++) {
                var obj = {
                    "img": $scope.instagram_pics[el],
                    "picked": false
                };
                array.push(obj);
            }
            $scope.instagram_pics = array;
            Nacion_Service.set_entire_ins_pics($scope.instagram_pics);
            $scope.$apply();
            if ($scope.instagram_pics.length > 0) {
                window.location.hash = "#/app/instagram";
            };
        }, 100);

    });
});
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
                $scope.imageStack.push(new ImageFactory(filteredResponse[i].images));
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

    var havePreviousImages = function(){
        return (SelectedImagesFactory.getInstagramOnes().length>0)?true:false;
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
            if(PhotoSizeChecker.meetsMinimumRequirements(image)) {
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
controllers.controller('PhotoSourceCtrl', ['$scope', '$filter', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', function ($scope, $filter, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker) {

    $scope.loading = false;
    $scope.imageStack = SelectedImagesFactory.getAll();
    $scope.prepare = function () {
        SelectedImagesFactory.prepareQuantity();
    };

    $scope.phoneImageLoad = function () {
        CordovaCameraService.getImage().then(
            function (result) {
                (new ImageFactory(result)).phoneImageInit().then(
                    function(result){
                        if(PhotoSizeChecker.meetsMinimumRequirements(result)){
                            $scope.imageStack.push(result);
                        }else{
                            $ionicPopup.alert({
                                title: 'La imagen es muy pequenna',
                                template: 'Lo sentimos :( la foto tiene que ser'+
                                'mayor a '+PhotoSizeChecker.getExpectedSize()+' para asegurarnos'+
                                'una impresión de la más alta calidad.'
                            });
                        }
                    }
                );
            }
        );
    };
}]);
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

	$scope.delete = function ($index) {
		StorageFactory.deleteNode($index);
		init();
	};

	var init = function(){
		$scope.items = StorageFactory.init();
		$scope.subtotal = 0;

		angular.forEach($scope.items.market, function(value){
			$scope.subtotal = $scope.subtotal + value.price;
		});
	};

	init();
});

controllers.controller('landingCtrl', function($scope, StorageFactory) {
	$scope.market = StorageFactory.init();
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
models.factory('ImageFactory', ['$q', function ($q) {
    function ImageWrapper (source) {
        this.origin = "phone";
        this.images = source;
        this.toPrint = false;

        if (angular.isObject(source)) {
            this.origin = "instagram";
        } else if (angular.isString(source)) {
            this._phoneSource = source;
            this.toPrint = true;
            this.deferred = $q.defer();
            // most of this values cannot be filled without load the image
            // So this values will be filled later when the image is loaded
            this.images = {
                "thumbnail": {
                    "url": "",
                    // the generated thumbnail will have this width
                    "width": 150,
                    "height": 0
                },
                "standard_resolution": {
                    "url": source,
                    "width": 0,
                    "height": 0
                }
            }
        }
    }

    ImageWrapper.prototype = {
        constructor: ImageWrapper,

        phoneImageInit: function(){
            var self = this,
                imgs = this.images;
            fabric.Image.fromURL(this._phoneSource, function(oImg) {
                // Setting standard_resolution values
                imgs.standard_resolution.width = oImg.getWidth();
                imgs.standard_resolution.height = oImg.getHeight();
                // Setting thumbnail values
                oImg.scaleToWidth(imgs.thumbnail.width);
                imgs.thumbnail.url = oImg.toDataURL({"format": "jpeg"});
                imgs.thumbnail.height = oImg.getHeight();
                // All done here. Now notify the controller with success response
                self.deferred.resolve(self);
            });

            return this.deferred.promise;
        }
    };

    return ImageWrapper;
}]);
models.factory('Market', ['$filter','SelectedImagesFactory', function ($filter,SelectedImagesFactory) {
	/**
	 * A simple service that returns the array of selected images.
	 */
     var model;

     function insertInfo(obj, categoryName, subCategoryName, size, quantity, price){
        model = {
            'order_id': Math.floor((Math.random() * 1000) + 1),
            'category':categoryName,
            'subCategory':subCategoryName,
            'size':size.width+'x'+size.height,
            'items':obj,
            'quantity':quantity,
            'price':price
        };
     }

	return {
		
        insert: function(model) {
            var category = SelectedImagesFactory.getProductLine(),
                setting = SelectedImagesFactory.getProduct(),
                promise = false,
                price = 0,
                quantity = 0,
                totalPrice = 0;

            angular.forEach(model, function(value){
                quantity = quantity + value.quantity;
            });

            if(quantity <= setting.prices.first_items.quantity){
                price = price = setting.prices.first_items.price;;
            } else {
                var d = quantity - setting.prices.first_items.quantity;
                price = setting.prices.first_items.price + (d * setting.prices.additional.price);
            }

            insertInfo(model, category.name, setting.name, setting.real_size, quantity, price);

            return true;
        },

        getCurrentModel: function() {
            return model;
        }

	};
}]);
models.factory('SelectedImagesFactory', ['$filter', function ($filter) {
    /**
     * A simple service that returns the array of selected images.
     * Also store the selected product with his parent product line
     */
    var selectedImages = [];
    var category = {};
    var product = {};
    var prints = [];

    return {
        setSelectedImages: function(pSelectedImages) {
            if (angular.isArray(pSelectedImages)) {
                selectedImages = pSelectedImages;
            }
        },
        addItem: function(pItem) {
            if (angular.isObject(pItem)) {
                angular.copy(pItem, selectedImages);
            }
        },
        addItems: function(pItems) {
            if (angular.isArray(pItems)) {
                angular.copy(pItems, selectedImages);
            }
        },
        getInstagramOnes: function() {
            return $filter('filter')(selectedImages, {origin:"instagram"});
        },
        getPhoneOnes: function() {
            return $filter('filter')(selectedImages, {origin:"phone"});
        },
        getToPrintOnes: function() {
            return $filter('filter')(selectedImages, {toPrint:true});
        },
        prepareQuantity: function() {
            angular.forEach(this.getToPrintOnes(), function(value){
                if (!value.hasOwnProperty('quantity')) {value.quantity = 1;}
            }); 
        },
        setPrintPhotos: function(pData) {
            prints = pData;
        },
        getAll: function() {
            return selectedImages;
        },
        getOne: function(id){
            return selectedImages[id];
        },
        setProductLine: function(pCategory){
            category = pCategory;
        },
        getProductLine: function(){
            return category;
        },
        setProduct: function(pProduct){
            product = pProduct;
        },
        getProduct: function(){
            return product;
        }
    };
}]);
models.factory('StorageFactory', ['$window', function ($window) {
	var storage = $window.localStorage;
	var prefix = "hacelo";

	var addStructure = function() {
		if(!storage.getItem(prefix)){
			saveMarket([]);
		}
	};

	this.setPrefix = function(newPrefix) {
		prefix = newPrefix;
	};

	var save = function(newObj) {
		var model = load(),
			json = null;
	
		if(model.hasOwnProperty('market')){
			model.market.push(newObj);
			storage.setItem(prefix, angular.toJson(model));
			return true;
		} else {
			return false;
		}
	};

	var pDeleteNode = function ($index) {
		var market = load().market;
		market.splice($index, 1);
		saveMarket(market);
	};

	var saveMarket = function(newObj) {
		return storage.setItem(prefix, angular.toJson({"market":newObj}));
	};

	var load = function() {
		return angular.fromJson(storage.getItem(prefix));
	};

	var destroy = function() {
		return storage[prefix] = '';
	};

	addStructure();


	return {
		save: function(newJson) {
			return save(newJson);
		},

		load: function() {
			return load();
		},

		destroy: function() {
			return destroy();
		},

		deleteNode: function ($index){
			pDeleteNode($index);
		},

		init: function() {
			if (!load()) {
				return save({
					key: 'value'
				});
			}

			return load();
		}
	};
}])
services.service('CordovaCameraService', ['$window','$q','ImageFactory','MessageService','$ionicPopup', function ($window,$q,ImageFactory,MessageService,$ionicPopup) {
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
}])
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

    var fetch = function (url, params) {
        var prms = {
                client_id: config.clientId,
                callback: 'JSON_CALLBACK'
            }
            deferred = $q.defer();
        if (self.isAuthenticated()) {
            prms.access_token = accessToken;
        }
        var cnfg = {
                url: config.apiUrl + url,
                method: 'jsonp',
                responseType: 'json',
                params: angular.extend(prms, params)
            };

        $http(cnfg).then(function(response){
            lastInstagramLoad = response.data;
            console.log(lastInstagramLoad);
            deferred.resolve(response);
        },function(response){
            deferred.reject(response);
        });

        return deferred.promise;
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
        console.log(lastInstagramLoad);
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
        var prms = {};

        if (self.hasLastInstagramLoad() && self.canLoadMore()) {
            prms.max_tag_id = lastInstagramLoad.pagination.next_max_tag_id;
        }
        return fetch('users/self/media/recent', prms);
    };

    this.getCurrentUser = function() {
        return fetch('users/self');
    };

    this.getRecientTagMedia = function() {
        var prms = {};

        if (self.hasLastInstagramLoad() && self.canLoadMore()) {
            prms.max_tag_id = lastInstagramLoad.pagination.next_max_tag_id;
        }
        return fetch('tags/angularjs/media/recent',prms);
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
services.service('Nacion_Service',['$ionicLoading',function($ionicLoading){
  this.username = '';
  this.instagram_pics = [];
  this.instagram_pics_on_queue = [];
  this.loadMore = '';

  this.show = function(text) {
    $ionicLoading.show({
      template: text
    });
  };
  this.hide = function(){
    $ionicLoading.hide();
  };


  this.alert = function(){
    alert('test');
  };

  this.set_username = function(data){
    this.username = data;
  };

  this.setNextUrl = function(url){
    this.loadMore = url;
  };

  this.getNextUrl = function(){
    return this.loadMore;
  };

  this.createEvent = function(text,data){
        var event;
          if(data !=undefined){
            event = new CustomEvent(text,{'detail':data});
          }else {
            event = new CustomEvent(text);
          }
          document.dispatchEvent(event);
    };
    this.set_entire_ins_pics = function(data){
      this.instagram_pics = data;
    };

    this.get_entire_ins_pics = function(){
      return this.instagram_pics;
    };

    this.set_instagram_pics_on_queue = function(data){
      this.instagram_pics_on_queue = data;
    };

    this.addImageQueue = function (data) {
      var promise = same(this.instagram_pics_on_queue, data);
        if(promise == -1){
          this.instagram_pics_on_queue.push(data);
        } else {
          this.instagram_pics_on_queue.splice(promise, 1);
        }
    };

    this.get_instagram_pics_on_queue = function(){
      return this.instagram_pics_on_queue;
    };

    function same(parent, data) {
        var object = -1;
        for(var el in parent){
             if( JSON.stringify(parent[el]) == JSON.stringify(data) ){
                object = el;
            }
        }
        return object;
    }
}]);
/**
 * Created by joseph on 24/11/2014.
 */
services.service('PhotoSizeChecker', ['SelectedImagesFactory', function (SelectedImagesFactory) {
    var self = this,
        actualProduct,
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

    this.meetsMinimumRequirements = function(ImageWrapper){
        // update global variable
        actualProduct = SelectedImagesFactory.getProduct();
        minimumSize  = actualProduct.pixel_size.minimum;
        imageDimensions = ImageWrapper.images.standard_resolution;
        // then decide if the provided image meets the minimum requirements
        return ( meetsArea() );
    };
}]);