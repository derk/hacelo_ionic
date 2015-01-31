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
                templateUrl: "templates/cart-checkout.html",
                controller: 'cartCheckoutCtrl'
            }
        }
    })
    .state('app.redeem', {
        url: "/redeem",
        views: {
            'haceloContent': {
                templateUrl: "templates/Redeem.html",
                controller: "redeemCtrl"
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
                templateUrl: "templates/confirm-order.html",
                controller: "confirmOrderCtrl"
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
    .state('app.photobook-check', {
        url: "/photobook-check",
        views: {
            'haceloContent': {
                templateUrl: "templates/photobook-check.html",
                controller: "photobookCheckCtrl"
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
})
.filter('noFractionCurrency',
    [ '$filter', '$locale', function(filter, locale) {
      var currencyFilter = filter('currency');
      var formats = locale.NUMBER_FORMATS;
      return function(amount, currencySymbol) {
        var value = currencyFilter(amount, '₡');
        var sep = value.indexOf(formats.DECIMAL_SEP);
        console.log(amount, value);
        if(amount >= 0) { 
          return value.substring(0, sep);
        }
        return value.substring(0, sep) + ')';
      };
    } ]);

var commons = angular.module('hacelo.config', []);
var controllers = angular.module('hacelo.controllers', []);
/**
 * Created   on 30/11/2014.
 */
var directives = angular.module('hacelo.directives', []);

var models = angular.module('hacelo.models', []);
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
            "images": "img/fotografias/PORTADA_FOTOGRAFIAS/portada_fotografia.png",
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
                    },
                    "images": "img/fotografias/6X4/6X4_Categoria/6X4_categoria.png",
                    "slider": [
                        {   "images":"img/fotografias/6X4/4_4/1.png"},
                        {   "images":"img/fotografias/6X4/4_4/2.png"},
                        {   "images":"img/fotografias/6X4/4_4/3.png"},
                        {   "images":"img/fotografias/6X4/4_4/4.png"}
                    ],
                    "weight": 120
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
                    },
                    "images": "img/fotografias/7X5/7X5_Categoria/7X5_categoria.png",
                    "slider": [
                        {   "images":"img/fotografias/7X5/4_4/1.png"},
                        {   "images":"img/fotografias/7X5/4_4/2.png"},
                        {   "images":"img/fotografias/7X5/4_4/3.png"},
                        {   "images":"img/fotografias/7X5/4_4/4.png"}
                    ],
                    "weight": 120
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
                    },
                    "images": "img/fotografias/10X8/10X8_Categoria/10X8_categoria.png",
                    "slider": [
                        {   "images":"img/fotografias/10X8/4_4/1.png"},
                        {   "images":"img/fotografias/10X8/4_4/2.png"},
                        {   "images":"img/fotografias/10X8/4_4/3.png"},
                        {   "images":"img/fotografias/10X8/4_4/4.png"}
                    ],
                    "weight": 120
<<<<<<< HEAD
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
=======
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
>>>>>>> 6b3573f23ab4a1a6a9b79219d2874c6a13075a76
            ]
        },

        {
            id: "quadrate",
            "name": "Cuadradas",
            "images": "img/cuadradas/PORTADA_CUADRADAS/portada_cuadradas.png",
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
                    },
                    "images": "img/cuadradas/4X4/4X4_Categoria/4X4_categoria.png",
                    "slider": [
                        {   "images":"img/cuadradas/4X4/4_4/1.png"},
                        {   "images":"img/cuadradas/4X4/4_4/2.png"},
                        {   "images":"img/cuadradas/4X4/4_4/3.png"},
                        {   "images":"img/cuadradas/4X4/4_4/4.png"}
                    ],
                    "weight": 120
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
                    },
                    "images": "img/cuadradas/8X8/8X8_Categoria/8x8_categoria.png",
                    "slider": [
                        {   "images":"img/cuadradas/8X8/4_4/1.png"},
                        {   "images":"img/cuadradas/8X8/4_4/2.png"},
                        {   "images":"img/cuadradas/8X8/4_4/3.png"},
                        {   "images":"img/cuadradas/8X8/4_4/4.png"}
                    ],
                    "weight": 120
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
                    },
                    "images": "img/cuadradas/10X10/10X10_Categoria/10X10_categoria.png",
                    "slider": [
                        {   "images":"img/cuadradas/10X10/4_4/1.png"},
                        {   "images":"img/cuadradas/10X10/4_4/2.png"},
                        {   "images":"img/cuadradas/10X10/4_4/3.png"},
                        {   "images":"img/cuadradas/10X10/4_4/4.png"}
                    ],
                    "weight": 120
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
            "images": "img/cuadradas/PORTADA_CUADRADAS/portada_cuadradas.png",
            "mandatory":true,
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
                    },
                    "images": "img/cuadradas/10X10/10X10_Categoria/10X10_categoria.png",
                    "slider": [
                        {   "images":"img/cuadradas/10X10/4_4/1.png"},
                        {   "images":"img/cuadradas/10X10/4_4/2.png"},
                        {   "images":"img/cuadradas/10X10/4_4/3.png"},
                        {   "images":"img/cuadradas/10X10/4_4/4.png"}
                    ],
                    "weight": 120
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
                    },
                    "images": "img/cuadradas/10X10/10X10_Categoria/10X10_categoria.png",
                    "slider": [
                        {   "images":"img/cuadradas/10X10/4_4/1.png"},
                        {   "images":"img/cuadradas/10X10/4_4/2.png"},
                        {   "images":"img/cuadradas/10X10/4_4/3.png"},
                        {   "images":"img/cuadradas/10X10/4_4/4.png"}
                    ],
                    "weight": 120
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
            "images": "img/marcos/14X20/14X20_Categoria/14X20_categoria.png",
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
                    },
                    "images": "img/marcos/4X4/4X4_Categoria/4X4_categoria.png",
                    "slider": [
                        {   "images":"img/marcos/4X4/4_4/1.png"},
                        {   "images":"img/marcos/4X4/4_4/2.png"},
                        {   "images":"img/marcos/4X4/4_4/3.png"},
                        {   "images":"img/marcos/4X4/4_4/4.png"}
                    ],
                    "weight": 500
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
                    },
                    "images": "img/marcos/11X17/11X17_Categoria/11X17_categoria.png",
                    "slider": [
                        {   "images":"img/marcos/11X17/4_4/1.png"},
                        {   "images":"img/marcos/11X17/4_4/2.png"},
                        {   "images":"img/marcos/11X17/4_4/3.png"},
                        {   "images":"img/marcos/11X17/4_4/4.png"}
                    ],
                    "weight": 2000
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
                    },
                    "images": "img/marcos/14X20/14X20_Categoria/14X20_categoria.png",
                    "slider": [
                        {   "images":"img/marcos/14X20/4_4/1.png"},
                        {   "images":"img/marcos/14X20/4_4/2.png"},
                        {   "images":"img/marcos/14X20/4_4/3.png"},
                        {   "images":"img/marcos/14X20/4_4/4.png"}
                    ],
                    "weight": 2500
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
                    },
                    "images": "img/marcos/20X29/20X29_Categoria/20X29_categoria.png",
                    "slider": [
                        {   "images":"img/marcos/20X29/4_4/1.png"},
                        {   "images":"img/marcos/20X29/4_4/2.png"},
                        {   "images":"img/marcos/20X29/4_4/3.png"},
                        {   "images":"img/marcos/20X29/4_4/4.png"}
                    ],
                    "weight": 4200
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
            "images": "img/photostrips/Photostrips_Categoria/photostrips_categoria.png",
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
                    },
                    "images": "img/photostrips/Photostrips_Categoria/photostrips_categoria.png",
                    "slider": [
                        {   "images":"img/photostrips/4_4/1.png"},
                        {   "images":"img/photostrips/4_4/2.png"},
                        {   "images":"img/photostrips/4_4/3.png"},
                        {   "images":"img/photostrips/4_4/4.png"}
                    ],
                    "weight": 120
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
            "images": "img/poster/Poster_Categoria/poster_categoria.png",
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
                    },
                    "images": "img/poster/Poster_Categoria/poster_categoria.png",
                    "slider": [
                        {   "images":"img/poster/4_4/1.png"},
                        {   "images":"img/poster/4_4/2.png"},
                        {   "images":"img/poster/4_4/3.png"},
                        {   "images":"img/poster/4_4/4.png"}
                    ],
                    "weight": 120
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
            "images": "img/gran_formato/20X29/20X29_Categoria/20X29_categoria.png",
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
                    },
                    "images": "img/gran_formato/11X17/11X17_Categoria/11X17_categoria.png",
                    "slider": [
                        {   "images":"img/gran_formato/11X17/4_4/1.png"},
                        {   "images":"img/gran_formato/11X17/4_4/2.png"},
                        {   "images":"img/gran_formato/11X17/4_4/3.png"},
                        {   "images":"img/gran_formato/11X17/4_4/4.png"}
                    ],
                    "weight": 120
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
                    },
                    "images": "img/gran_formato/14X20/14X20_Categoria/14X20_categoria.png",
                    "slider": [
                        {   "images":"img/gran_formato/14X20/4_4/1.png"},
                        {   "images":"img/gran_formato/14X20/4_4/2.png"},
                        {   "images":"img/gran_formato/14X20/4_4/3.png"},
                        {   "images":"img/gran_formato/14X20/4_4/4.png"}
                    ],
                    "weight": 120
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
                    },
                    "images": "img/gran_formato/20X29/20X29_Categoria/20X29_categoria.png",
                    "slider": [
                        {   "images":"img/gran_formato/20X29/4_4/1.png"},
                        {   "images":"img/gran_formato/20X29/4_4/2.png"},
                        {   "images":"img/gran_formato/20X29/4_4/3.png"},
                        {   "images":"img/gran_formato/20X29/4_4/4.png"}
                    ],
                    "weight": 120
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
commons.constant('PlacesConfig', {
    "places":{
        "San José":{
            "Cantones": {    
                "San José":[        
                    " San José",
                    "Carmen",
                    "Merced",
                    "Hospital",
                    "Catedral",
                    "Zapote",
                    "San Francisco de Dos Ríos",
                    "Uruca",
                    "Mata Redonda",
                    "Pavas",
                    "Hatillo",
                    "San Sebastián"
                ],
                 "Escazú":[     
                    "Escazú",
                    "San Antonio",
                    "San Rafael"
                ],
                 "Desamparados":[       
                    "Desamparados",
                    "San Miguel",
                    "San Juan de Dios",
                    "San Rafael Arriba",
                    "San Antonio",
                    "Frailes",
                    "Patarrá",
                    "San Cristóbal",
                    "Rosario",
                    "Damas",
                    "San Rafael Abajo",
                    "Gravilias"
                ],
                 "Puriscal":[       "Puriscal",
                    "Santiago",
                    "Mercedes Sur",
                    "Barbacoas",
                    "Grifo Alto",
                    "San Rafael",
                    "Candelaria",
                    "Desamparaditos",
                    "San Antonio",
                    "Chires"
                ],
                 "Tarrazú":[        "Tarrazú",
                    "San Marcos",
                    "San Lorenzo",
                    "San Carlos"
                ],
                 "Aserrí":[     "Aserrí",
                    "Tarbaca",
                    "Vuelta de Jorco",
                    "San Gabriel",
                    "Legua",
                    "Monterrey",
                    "Salitrillos"
                ],
                 "Mora":[       "Mora",
                    "Colón",
                    "Guayabo",
                    "Tabarcia",
                    "Piedras Negras",
                    "Picagres"
                ],
                 "Goicoechea":[     "Guadalupe",
                    "San Francisco",
                    "Calle Blancos",
                    "Mata de Plátano",
                    "Ipís",
                    "Rancho Redondo",
                    "Purral"
                ],
                 "Santa Ana":[      "Santa Ana",
                    "Salitral",
                    "Pozos",
                    "Uruca",
                    "Piedades",
                    "Brasil"
                ],
                 "Alajuelita":[     "Alajuelita",
                    "San Josecito",
                    "San Antonio",
                    "Concepción",
                    "San Felipe"
                ],
                 "Vázquez de Coronado":[        "San Isidro",
                    "San Rafael",
                    "Dulce Nombre de Jesús",
                    "Patalillo",
                    "Cascajal"
                ],
                 "Acosta":[     "San Ignacio",
                    "Guaitil",
                    "Palmichal",
                    "Cangrejal",
                    "Sabanillas"
                ],
                 "Tibás":[      "San Juan",
                    "Cinco Esquinas",
                    "Anselmo Llorente",
                    "León XIII",
                    "Colima"
                ],
                 "Moravia":[        "San Vicente",
                    "San Jerónimo",
                    "Trinidad"
                ],
                 "Montes de Oca":[      "San Pedro",
                    "Sabanilla",
                    "Mercedes",
                    "San Rafael"
                ],
                 "Turrubares":[     "San Pablo",
                    "San Pedro",
                    "San Juan de Mata",
                    "San Luis"
                ],
                 "Dota":[       "Santa María",
                    "Jardín",
                    "Copey"
                ],
                 "Curridabat":[     "Curridabat",
                    "Granadilla",
                    "Sánchez",
                    "Tirrases"
                ],
                 "Pérez Zeledón":[      "San Isidro de El General",
                    "General",
                    "Daniel Flores",
                    "Rivas",
                    "San Pedro",
                    "Platanares",
                    "Pejibaye",
                    "Cajón",
                    "Barú",
                    "Río Nuevo",
                    "Páramo"
                ],
                 "León Cortés":[        "San Pablo",
                    "San Andrés",
                    "Llano Bonito",
                    "San Isidro",
                    "Santa Cruz",
                    "San Antonio"
                ]
            }
        },
        "Alajuela":{
            "Cantones": {    
                "Alajuela":[        
                    "Alajuela",
                    "San José",
                    "Carrizal",
                    "San Antonio",
                    "Guácima",
                    "San Isidro",
                    "Sabanilla",
                    "San Rafael",
                    "Río Segundo",
                    "Desamparados",
                    "Turrúcares",
                    "Tambor",
                    "Garita",
                    "Sarapiquí"
                ],
                 "San Ramón":[      "San Ramón",
                    "Santiago",
                    "San Juan",
                    "Piedades Norte",
                    "Piedades Sur",
                    "San Rafael",
                    "San Isidro",
                    "Ángeles",
                    "Alfaro",
                    "Volio",
                    "Concepción",
                    "Zapotal",
                    "Peñas Blancas"
                ],
                 "Grecia":[     "Grecia",
                    "San Isidro",
                    "San José",
                    "San Roque",
                    "Tacares",
                    "Río Cuarto",
                    "Puente de Piedra",
                    "Bolívar"
                ],
                 "San Mateo":[      "San Mateo",
                    "Desmonte",
                    "Jesús María"
                ],
                 "Atenas":[     "Atenas",
                    "Jesús",
                    "Mercedes",
                    "San Isidro",
                    "Concepción",
                    "San José",
                    "Santa Eulalia"
                ],
                 "Naranjo":[        "Naranjo",
                    "San Miguel",
                    "San José",
                    "Cirrí Sur",
                    "San Jerónimo",
                    "San Juan",
                    "Rosario"
                ],
                 "Palmares":[       "Palmares",
                    "Zaragoza",
                    "Buenos Aires",
                    "Santiago",
                    "Candelaria",
                    "Esquipulas",
                    "Granja"
                ],
                 "Poás":[       "San Pedro",
                    "San Juan",
                    "San Rafael",
                    "Carrillos",
                    "Sabana Redonda"
                ],
                 "Orotina":[        "Orotina",
                    "Mastate",
                    "Hacienda Vieja",
                    "Coyolar",
                    "Ceiba"
                ],
                 "San Carlos":[     "Quesada",
                    "Florencia",
                    "Buenavista",
                    "Aguas Zarcas",
                    "Venecia",
                    "Pital",
                    "Fortuna",
                    "Tigra",
                    "Palmera",
                    "Venado",
                    "Cutris",
                    "Monterrey",
                    "Pocosol"
                ],
                 "Alfaro Ruiz":[        "Zarcero",
                    "Laguna",
                    "Tapezco",
                    "Guadalupe",
                    "Palmira",
                    "Zapote",
                    "Brisas"
                ],
                 "Valverde Vega":[      "Sarchí Norte",
                    "Sarchí Sur",
                    "Toro Amarillo",
                    "San Pedro",
                    "Rodríguez"
                ],
                 "Upala":[      "Aguas Claras",
                    "San José (Pizote)",
                    "Bijagua",
                    "Delicias",
                    "Dos Ríos",
                    "Yolillal"
                ],
                 "Los Chiles":[     "Los Chiles",
                    "Caño Negro",
                    "El Amparo",
                    "San Jorge"
                ],
                 "Guatuso":[        "San Rafael",
                    "Buenavista"
                ]
            }
        },
        "Cartago":{
            "Cantones": {    
                "Cartago":[     
                    "Oriental",
                    "Occidental",
                    "Carmen",
                    "San Nicolás",
                    "Aguacaliente (San Francisco)",
                    "Guadalupe (Arenilla)",
                    "Corralillo",
                    "Tierra Blanca",
                    "Dulce Nombre",
                    "Llano Grande",
                    "Quebradilla"
                ],
                 "Paraíso":[        
                    "Paraíso",
                    "Santiago",
                    "Orosi",
                    "Cachí"
                ],
                 "La Unión":[       
                    "Tres Ríos",
                    "San Diego",
                    "San Juan",
                    "San Rafael",
                    "Concepción",
                    "Dulce Nombre",
                    "San Ramón",
                    "Río Azul"
                ],
                 "Jiménez":[        
                    "Juan Viñas",
                    "Tucurrique",
                    "Pejibaye"
                ],
                 "Turrialba":[      
                    "Turrialba",
                    "La Suiza",
                    "Peralta",
                    "Santa Cruz",
                    "Santa Teresita",
                    "Pavones",
                    "Tuis",
                    "Tayutic",
                    "Santa Rosa",
                    "Tres Equis"
                ],
                 "Alvarado":[       
                    "Pacayas",
                    "Cervantes",
                    "Capellades"
                ],
                 "Oreamuno":[       
                    "San Rafael",
                    "Cot",
                    "Potrero Cerrado",
                    "Cipreses",
                    "Santa Rosa"
                ],
                 "El Guarco":[      
                    "Tejar",
                    "San Isidro",
                    "Tobosi",
                    "Patio de Agua"
                ]
            }
        },
        "Heredia":{
            "Cantones": {    
                "Heredia":[     
                    "Heredia",
                    "Mercedes",
                    "San Francisco",
                    "Ulloa",
                    "Vara Blanca"
                ],
                 "Barva":[      
                    "Barva",
                    "San Pedro",
                    "San Pablo",
                    "San Roque",
                    "Santa Lucía",
                    "San José de la Montaña"
                ],
                 "Santo Domingo":[      
                    "Santo Domingo",
                    "San Vicente",
                    "San Miguel",
                    "Paracito",
                    "Santo Tomás",
                    "Santa Rosa",
                    "Tures",
                    "Pará"
                ],
                 "Santa Bárbara":[      
                    "Santa Bárbara",
                    "San Pedro",
                    "San Juan",
                    "Jesús",
                    "Santo Domingo",
                    "Purabá"
                ],
                 "San Rafael":[     
                    "San Rafael",
                    "San Josecito",
                    "Santiago",
                    "Ángeles",
                    "Concepción"
                ],
                 "San Isidro":[     
                    "San Isidro",
                    "San José",
                    "Concepción",
                    "San Francisco"
                ],
                 "Belén":[      
                    "San Antonio",
                    "Ribera",
                    "Asunción"
                ],
                 "Flores":[     
                    "San Joaquín",
                    "Barrantes",
                    "Llorente"
                ],
                 "San Pablo":[      
                    "San Pablo"
                ],
                 "Sarapiquí":[      
                    "Puerto Viejo",
                    "La Virgen",
                    "Horquetas",
                    "Llanuras del Gaspar",
                    "Cureña"
                ]
            }
        },
        "Guanacaste":{ 
            "Cantones": {    
                "Liberia":[     
                    "Liberia",
                    "Cañas Dulces",
                    "Mayorga",
                    "Nacascolo",
                    "Curubandé"
                ],
                 "Nicoya":[     
                    "Nicoya",
                    "Mansión",
                    "San Antonio",
                    "Quebrada Honda",
                    "Sámara",
                    "Nosara",
                    "Belén de Nosarita"
                ],
                 "Santa Cruz":[     
                    "Santa Cruz",
                    "Bolsón",
                    "Veintisiete de Abril",
                    "Tempate",
                    "Cartagena",
                    "Cuajiniquil",
                    "Diriá",
                    "Cabo Velas",
                    "Tamarindo"
                ],
                 "Bagaces":[        
                    "Bagaces",
                    "Fortuna",
                    "Mogote",
                    "Río Naranjo"
                ],
                 "Carrillo":[       
                    "Filadelfia",
                    "Palmira",
                    "Sardinal",
                    "Belén"
                ],
                 "Cañas":[      
                    "Cañas",
                    "Palmira",
                    "San Miguel",
                    "Bebedero",
                    "Porozal"
                ],
                 "Abangares":[      
                    "Juntas",
                    "Sierra",
                    "San Juan",
                    "Colorado"
                ],
                 "Tilarán":[        
                    "Tilarán",
                    "Quebrada Grande",
                    "Tronadora",
                    "Santa Rosa",
                    "Líbano",
                    "Tierras Morenas",
                    "Arenal"
                ],
                 "Nandayure":[      
                    "Carmona",
                    "Santa Rita",
                    "Zapotal",
                    "San Pablo",
                    "Porvenir",
                    "Bejuco"
                ],
                 "La Cruz":[        
                    "La Cruz",
                    "Santa Cecilia",
                    "Garita",
                    "Santa Elena"
                ],
                 "Hojancha":[       
                    "Hojancha",
                    "Monte Romo",
                    "Puerto Carrillo",
                    "Huacas"
                ]
            }
        },
        "Limón":{ 
            "Cantones": {    "Limón":[      "Limón",
                    "Valle La Estrella",
                    "Río Blanco",
                    "Matama"
                ],
                 "Pococí":[     "Guápiles",
                    "Jiménez",
                    "Rita",
                    "Roxana",
                    "Cariari",
                    "Colorado"
                ],
                 "Siquirres":[      "Siquirres",
                    "Pacuarito",
                    "Florida",
                    "Germania",
                    "Cairo",
                    "Alegría"
                ],
                 "Talamanca":[      "Bratsi",
                    "Sixaola",
                    "Cahuita"
                ],
                 "Matina":[     "Matina",
                    "Batán",
                    "Carrandi"
                ],
                 "Guácimo":[        "Guácimo",
                    "Mercedes",
                    "Pocora",
                    "Río Jiménez",
                    "Duacarí"
                ]
            }
        },
        "Puntarenas":{
            "Cantones": {    "Puntarenas":[     "Puntarenas",
                    "Pitahaya",
                    "Chomes",
                    "Lepanto",
                    "Paquera",
                    "Manzanillo",
                    "Guacimal",
                    "Barranca",
                    "Monte Verde",
                    "Isla del Coco",
                    "Cóbano",
                    "Chacarita",
                    "Chira",
                    "Acapulco"
                ],
                 "Esparza":[        "Espíritu Santo",
                    "San Juan Grande",
                    "Macacona",
                    "San Rafael",
                    "San Jerónimo"
                ],
                 "Buenos Aires":[       "Buenos Aires",
                    "Volcán",
                    "Potrero Grande",
                    "Boruca",
                    "Pilas",
                    "Colinas",
                    "Chánguena",
                    "Biolley"
                ],
                 "Montes De Oro":[      "Miramar",
                    "Unión",
                    "San Isidro"
                ],
                 "Osa":[        "Puerto Cortés",
                    "Palmar",
                    "Sierpe",
                    "Bahía Ballena",
                    "Piedras Blancas"
                ],
                 "Aguirre":[        "Quepos",
                    "Savegre",
                    "Naranjito"
                ],
                 "Golfito":[        "Golfito",
                    "Puerto Jiménez",
                    "Guaycará",
                    "Pavón"
                ],
                 "Coto Brus":[      "San Vito",
                    "Sabalito",
                    "Aguabuena",
                    "Limoncito",
                    "Pittier"
                ],
                 "Parrita":[        "Parrita"
                ],
                 "Corredores":[     "Corredor",
                    "La Cuesta",
                    "Canoas",
                    "Laurel"
                ],
                 "Garabito":[       "Jacó",
                    "Tárcoles"
                ]
            }
        }
    }
});
controllers.controller('addedCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.productName = $stateParams.productName;
}]);
/**
 * Created   on 30/11/2014.
 */
controllers.controller('cartCtrl', ['$scope', '$ionicPopup', 'MessageService', 'ShoppingCartFactory','Payment', function($scope, $ionicPopup, Messages, ShoppingCartFactory,Payment) {
    $scope.cart = ShoppingCartFactory.loadShoppingCart();
    console.log($scope.cart);
    $scope.removeOrder = function (pOrderToRemove) {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_order_delete"),
            confirmPopup = $ionicPopup.confirm(cache);

        confirmPopup.then(function (res) {
            if (res) {
                ShoppingCartFactory.removeOrder(pOrderToRemove.id);
            }
        });
    };

    $scope.minus = function(order){

    };

}]);


/**
 * Created by Raiam on 02/01/2015.
 */
controllers.controller('cartCheckoutCtrl', ['$scope', '$state', '$ionicLoading','$ionicPopup', 'MessageService', 'ShoppingCartFactory','PlacesConfig','Payment', function($scope, $state, $ionicLoading, $ionicPopup, Messages, ShoppingCartFactory, PlacesConfig, Payment) {
    
    $scope.cart = ShoppingCartFactory.loadShoppingCart();
    $scope.sucursal = true;
    $scope.provinces = [];
    $scope.cantones = [];
    $scope.districts = [];
    $scope.info = {};  

    var places = PlacesConfig.places;

    angular.forEach(Object.keys(places), function(v){
        $scope.provinces.push({"name":v});
    });


    $scope.showCanton = function(){
        $scope.cantones = [];
        $scope.districts = [];

         angular.forEach(Object.keys(places[$scope.info.province.name].Cantones), function(v){
            $scope.cantones.push({"name":v});
        });
    };

    $scope.showDistrict = function(){
        $scope.districts = [];

         angular.forEach(places[$scope.info.province.name].Cantones[$scope.info.canton.name], function(v){
            $scope.districts.push({"name":v});
        });
    };


    $scope.show = function() {
        $ionicLoading.show({
          template: 'Calculando Transporte'
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.changeSucursal = function(s){
       $scope.sucursal = s;
    };

    $scope.saveInformation = function(){
        ShoppingCartFactory.saveCustomer($scope.info.name, $scope.info.last, $scope.info.phone,  $scope.info.email, $scope.info.province.name, $scope.info.canton.name, $scope.info.district.name, $scope.info.exact);
    };

    $scope.calculatePrice = function(){

        if($scope.sucursal == true){
            ShoppingCartFactory.saveTravel(0);
            $state.go("app.redeem");
        } else {
            $scope.show();
            Payment.sendWeight($scope.cart.getWeight()).then(function(response){
                ShoppingCartFactory.saveTravel(response.message.precio);
                $scope.hide();
                $state.go("app.redeem");
            });
        }
        
    };
    
}]);


/**
 * Created by Raiam on 02/01/2015.
 */

controllers.controller('redeemCtrl', ['$scope', '$ionicPopup', '$state', 'MessageService', 'ShoppingCartFactory', 'Payment', function($scope, $ionicPopup, $state, Messages, ShoppingCartFactory, Payment) {
    
    $scope.cart = ShoppingCartFactory.loadShoppingCart();
    $scope.userData = {};
    $scope.years = [];
    $scope.months = [];
    $scope.emisor = [
        {
            "name": "American Express", 
            "value": "AMEX"
        },
        {
            "name": "VISA", 
            "value": "VISA"
        },
        {
            "name": "Master Card", 
            "value": "MasterCard"
        }
    ]

    for(var el = 2015; el <= 2050; el++){
        $scope.years.push({"name": el, "value": el});
    }

    for(var el = 1; el <= 12; el++){
        $scope.months.push({"name": el, "value": el});
    }


    $scope.userData.year = $scope.years[0];
    $scope.userData.month = $scope.months[0];
    $scope.userData.emisor = $scope.emisor[0];

    $scope.submit = function(){
        ShoppingCartFactory.savePayment($scope.userData.card, $scope.userData.month.value, $scope.userData.year.value,$scope.userData.emisor.value );
        $state.go("app.confirm-order");
        /*Payment.makePay(1, $scope.cart.customer.firstName, $scope.cart.customer.secondSurname, $scope.userData.emisor.value, $scope.userData.card, $scope.userData.month.value, $scope.userData.year.value, $scope.cart.computeSubTotal(), $scope.cart.travel.price).then(function(e){
            if(e.error != ""){
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Hubo un error al procesar tu pago, intntalo mas tarde.'
                });
            } else {
                $state.go("app.processing-order");
            }
        });*/
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
            cacheConfirm = { 
                "title" : "Estas segur@?",
                "template" : "Escogiste "+$scope.images.length+" imagen(es), pero podés escoger hasta "+SelectedImagesFactory.getProduct().prices.first_items.quantity+ " por el mismo precio.",
                "cancelText" : "Cancelar",
                "okText" : "Aceptar"
            };

        if(SelectedImagesFactory.getProduct().prices.first_items.quantity   >  $scope.images.length){
            $ionicPopup.confirm(cacheConfirm).then(function(res){
                if(res){
                    $ionicPopup.confirm(cache).then(function (res) {
                        if (res) {
                            $state.go("app.confirm");
                        }
                    });                    
                }
            });    
        } else {
            $ionicPopup.confirm(cache).then(function (res) {
                if (res) {
                    $state.go("app.confirm");
                }
            });

        }
    };

    init();

}]);
/**
 * Created   on 30/11/2014.
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

    $scope.url =  $scope.actualOrder.product.slider[0].images;
    $scope.height = screen.width;
}]);
controllers.controller('confirmOrderCtrl', ['$scope', '$state' ,'$ionicPopup','$ionicLoading', 'MessageService', 'ShoppingCartFactory','Payment', function($scope, $state, $ionicPopup, $ionicLoading, Messages, ShoppingCartFactory,Payment) {
    $scope.cart = ShoppingCartFactory.loadShoppingCart();

   console.log($scope.cart);

   window.el = $scope.cart;

   $scope.show = function() {
        $ionicLoading.show({
          template: 'Realizando Pago...'
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };

   
   $scope.pay = function(){
   		$scope.show();
   		Payment.makePay(1, $scope.cart.customer.firstName, $scope.cart.customer.secondSurname, $scope.cart.payment.type, $scope.cart.payment.card, $scope.cart.payment.month, $scope.cart.payment.year, $scope.cart.computeSubTotal(), $scope.cart.travel.price).then(function(e){
            $scope.hide();
            if(e.error != ""){
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Hubo un error al procesar tu pago, intntalo mas tarde.'
                });
            } else {
            	 
               $state.go("app.processing-order");
            }
        });
   };

}]);
/**
 * Created   on 07/12/2014.
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
                if(InstagramService.hasUserMedia()) {
                    InstagramService.cleanUserMedia();
                }
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
 * Created   on 30/11/2014.
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
controllers.controller('PhotoSourceCtrl', ['$scope', '$state', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', 'FileReader', function ($scope, $state, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker, FileReader) {
    $scope.imageStack = SelectedImagesFactory.getAll();
    $scope.gallery = SelectedImagesFactory.getGallery();

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

    $scope.gotoConfirm = function () {

        if(angular.isDefined(SelectedImagesFactory.getProductLine().mandatory)){
            $state.go('app.photobook-check');
        } else {
            $state.go('app.check');
        }
        
    };

    $scope.init = function () {
        FileReader.getFileSystem().then(function(e){
            console.log(e);
            FileReader.hasImage(e[8]).then(function(result){
                window.r = result;
                console.log(result);
            });
        });
    };

    if($scope.gallery.length == 0){
        $scope.init();
    }

}]);
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

controllers.controller('photoCrtl', ['$scope', '$state', '$ionicPopup', '$timeout', '$window', 'MessageService','SelectedImagesFactory',function($scope, $state, $ionicPopup, $timeout, $window, Messages, SelectedImagesFactory) {
	var cache = angular.isDefined(cache) ? cache: Messages.search("photobook_alert");

	$scope.product = SelectedImagesFactory.getProduct();
	$scope.height = screen.width;

	if(angular.isDefined(SelectedImagesFactory.getProductLine().mandatory)){
		$ionicPopup.alert(cache);
		$timeout(function () {
			angular.element(".popup").addClass("photobook-popup");
		},1000);
		console.log("get");
	}


}]);



controllers.controller('photobookCheckCtrl', ['$scope', '$state', '$ionicPopup','SelectedImagesFactory', 'PhotoPrintConfig','MessageService', 'Utils',function($scope, $state, $ionicPopup, SelectedImagesFactory, PhotoPrintConfig, Messages, Utils) {
	var popup = angular.isDefined(popup) ? popup: Messages.search("photobook_few");

	
	if(SelectedImagesFactory.getProduct().prices.first_items.quantity   !=  SelectedImagesFactory.getToPrintOnes().length){
            $ionicPopup.alert(popup).then(function(res){
            	window.history.back();
            });
    } else {
    	$scope.productLines = PhotoPrintConfig.products;
		$scope.images = SelectedImagesFactory.getToPrintOnes();
	
    }

	window.el = SelectedImagesFactory;

	$scope.saveProductLine = function(pProductLine) {
		SelectedImagesFactory.setProductLine(pProductLine);
		$state.go("app.category");
	};

	$scope.mix = function () {
		$scope.images = Utils.shuffle($scope.images);
		SelectedImagesFactory.clearAndAdd($scope.images);
	};

	/*
     * Se encarga de ingresar en el carrito de compras los datos que ya se encuentran 
     * en el array de imagenes, se guardan todos los tipos de fotos asi como la cantidad de cada una
     * y se redirecciona la pantalla de confirmacion.
     * */
    $scope.addToCart = function () {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_check_screen");
            $ionicPopup.confirm(cache).then(function (res) {
                if (res) {
                    $state.go("app.confirm");
                }
            });

    };
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
<<<<<<< HEAD
controllers.controller('addedCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.productName = $stateParams.productName;
}]);
/**
 * Created   on 30/11/2014.
 */
controllers.controller('cartCtrl', ['$scope', '$ionicPopup', 'MessageService', 'ShoppingCartFactory','Payment', function($scope, $ionicPopup, Messages, ShoppingCartFactory,Payment) {
    $scope.cart = ShoppingCartFactory.loadShoppingCart();
    console.log($scope.cart);
    $scope.removeOrder = function (pOrderToRemove) {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_order_delete"),
            confirmPopup = $ionicPopup.confirm(cache);

        confirmPopup.then(function (res) {
            if (res) {
                ShoppingCartFactory.removeOrder(pOrderToRemove.id);
            }
        });
    };

    $scope.minus = function(order){

    };

}]);


/**
 * Created by Raiam on 02/01/2015.
 */
controllers.controller('cartCheckoutCtrl', ['$scope', '$state', '$ionicLoading','$ionicPopup', 'MessageService', 'ShoppingCartFactory','PlacesConfig','Payment', function($scope, $state, $ionicLoading, $ionicPopup, Messages, ShoppingCartFactory, PlacesConfig, Payment) {
    
    $scope.cart = ShoppingCartFactory.loadShoppingCart();
    $scope.sucursal = true;
    $scope.provinces = [];
    $scope.cantones = [];
    $scope.districts = [];
    $scope.info = {};  

    var places = PlacesConfig.places;

    angular.forEach(Object.keys(places), function(v){
        $scope.provinces.push({"name":v});
    });


    $scope.showCanton = function(){
        $scope.cantones = [];
        $scope.districts = [];

         angular.forEach(Object.keys(places[$scope.info.province.name].Cantones), function(v){
            $scope.cantones.push({"name":v});
        });
    };

    $scope.showDistrict = function(){
        $scope.districts = [];

         angular.forEach(places[$scope.info.province.name].Cantones[$scope.info.canton.name], function(v){
            $scope.districts.push({"name":v});
        });
    };


    $scope.show = function() {
        $ionicLoading.show({
          template: 'Calculando Transporte'
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.changeSucursal = function(s){
       $scope.sucursal = s;
    };

    $scope.saveInformation = function(){
        ShoppingCartFactory.saveCustomer($scope.info.name, $scope.info.last, $scope.info.phone,  $scope.info.email, $scope.info.province.name, $scope.info.canton.name, $scope.info.district.name, $scope.info.exact);
    };

    $scope.calculatePrice = function(){

        if($scope.sucursal == true){
            ShoppingCartFactory.saveTravel(0);
            $state.go("app.redeem");
        } else {
            $scope.show();
            Payment.sendWeight($scope.cart.getWeight()).then(function(response){
                ShoppingCartFactory.saveTravel(response.message.precio);
                $scope.hide();
                $state.go("app.redeem");
            });
        }
        
    };
    
}]);


/**
 * Created by Raiam on 02/01/2015.
 */

controllers.controller('redeemCtrl', ['$scope', '$ionicPopup', '$state', 'MessageService', 'ShoppingCartFactory', 'Payment', function($scope, $ionicPopup, $state, Messages, ShoppingCartFactory, Payment) {
    
    $scope.cart = ShoppingCartFactory.loadShoppingCart();
    $scope.userData = {};
    $scope.years = [];
    $scope.months = [];
    $scope.emisor = [
        {
            "name": "American Express", 
            "value": "AMEX"
        },
        {
            "name": "VISA", 
            "value": "VISA"
        },
        {
            "name": "Master Card", 
            "value": "MasterCard"
        }
    ]

    for(var el = 2015; el <= 2050; el++){
        $scope.years.push({"name": el, "value": el});
    }

    for(var el = 1; el <= 12; el++){
        $scope.months.push({"name": el, "value": el});
    }


    $scope.userData.year = $scope.years[0];
    $scope.userData.month = $scope.months[0];
    $scope.userData.emisor = $scope.emisor[0];

    $scope.submit = function(){
        ShoppingCartFactory.savePayment($scope.userData.card, $scope.userData.month.value, $scope.userData.year.value,$scope.userData.emisor.value );
        $state.go("app.confirm-order");
        /*Payment.makePay(1, $scope.cart.customer.firstName, $scope.cart.customer.secondSurname, $scope.userData.emisor.value, $scope.userData.card, $scope.userData.month.value, $scope.userData.year.value, $scope.cart.computeSubTotal(), $scope.cart.travel.price).then(function(e){
            if(e.error != ""){
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Hubo un error al procesar tu pago, intntalo mas tarde.'
                });
            } else {
                $state.go("app.processing-order");
            }
        });*/
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
            cacheConfirm = { 
                "title" : "Estas segur@?",
                "template" : "Escogiste "+$scope.images.length+" imagen(es), pero podés escoger hasta "+SelectedImagesFactory.getProduct().prices.first_items.quantity+ " por el mismo precio.",
                "cancelText" : "Cancelar",
                "okText" : "Aceptar"
            };

        if(SelectedImagesFactory.getProduct().prices.first_items.quantity   >  $scope.images.length){
            $ionicPopup.confirm(cacheConfirm).then(function(res){
                if(res){
                    $ionicPopup.confirm(cache).then(function (res) {
                        if (res) {
                            $state.go("app.confirm");
                        }
                    });                    
                }
            });    
        } else {
            $ionicPopup.confirm(cache).then(function (res) {
                if (res) {
                    $state.go("app.confirm");
                }
            });

        }
    };

    init();

}]);
/**
 * Created   on 30/11/2014.
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

    $scope.url =  $scope.actualOrder.product.slider[0].images;
    $scope.height = screen.width;
}]);
controllers.controller('confirmOrderCtrl', ['$scope', '$state' ,'$ionicPopup','$ionicLoading', 'MessageService', 'ShoppingCartFactory','Payment', function($scope, $state, $ionicPopup, $ionicLoading, Messages, ShoppingCartFactory,Payment) {
    $scope.cart = ShoppingCartFactory.loadShoppingCart();

   console.log($scope.cart);

   window.el = $scope.cart;

   $scope.show = function() {
        $ionicLoading.show({
          template: 'Realizando Pago...'
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };

   
   $scope.pay = function(){
   		$scope.show();
   		Payment.makePay(1, $scope.cart.customer.firstName, $scope.cart.customer.secondSurname, $scope.cart.payment.type, $scope.cart.payment.card, $scope.cart.payment.month, $scope.cart.payment.year, $scope.cart.computeSubTotal(), $scope.cart.travel.price).then(function(e){
            $scope.hide();
            if(e.error != ""){
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Hubo un error al procesar tu pago, intntalo mas tarde.'
                });
            } else {
            	 
               $state.go("app.processing-order");
            }
        });
   };

}]);
/**
 * Created   on 07/12/2014.
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
                if(InstagramService.hasUserMedia()) {
                    InstagramService.cleanUserMedia();
                }
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
 * Created   on 30/11/2014.
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
controllers.controller('PhotoSourceCtrl', ['$scope', '$state', '$ionicPopup', 'SelectedImagesFactory', 'MessageService', 'CordovaCameraService', 'ImageFactory', 'PhotoSizeChecker', function ($scope, $state, $ionicPopup, SelectedImagesFactory, MessageService, CordovaCameraService, ImageFactory, PhotoSizeChecker) {
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




    $scope.gotoConfirm = function () {

        if(angular.isDefined(SelectedImagesFactory.getProductLine().mandatory)){
            $state.go('app.photobook-check');
        } else {
            $state.go('app.check');
        }
        
    };

}]);
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

controllers.controller('photoCrtl', ['$scope', '$state', '$ionicPopup', '$timeout', '$window', 'MessageService','SelectedImagesFactory',function($scope, $state, $ionicPopup, $timeout, $window, Messages, SelectedImagesFactory) {
	var cache = angular.isDefined(cache) ? cache: Messages.search("photobook_alert");

	$scope.product = SelectedImagesFactory.getProduct();
	$scope.height = screen.width;

	if(angular.isDefined(SelectedImagesFactory.getProductLine().mandatory)){
		$ionicPopup.alert(cache);
		$timeout(function () {
			angular.element(".popup").addClass("photobook-popup");
		},1000);
		console.log("get");
	}


}]);



controllers.controller('photobookCheckCtrl', ['$scope', '$state', '$ionicPopup','SelectedImagesFactory', 'PhotoPrintConfig','MessageService', 'Utils',function($scope, $state, $ionicPopup, SelectedImagesFactory, PhotoPrintConfig, Messages, Utils) {
	var popup = angular.isDefined(popup) ? popup: Messages.search("photobook_few");

	
	if(SelectedImagesFactory.getProduct().prices.first_items.quantity   !=  SelectedImagesFactory.getToPrintOnes().length){
            $ionicPopup.alert(popup).then(function(res){
            	window.history.back();
            });
    } else {
    	$scope.productLines = PhotoPrintConfig.products;
		$scope.images = SelectedImagesFactory.getToPrintOnes();
	
    }

	window.el = SelectedImagesFactory;

	$scope.saveProductLine = function(pProductLine) {
		SelectedImagesFactory.setProductLine(pProductLine);
		$state.go("app.category");
	};

	$scope.mix = function () {
		$scope.images = Utils.shuffle($scope.images);
		SelectedImagesFactory.clearAndAdd($scope.images);
	};

	/*
     * Se encarga de ingresar en el carrito de compras los datos que ya se encuentran 
     * en el array de imagenes, se guardan todos los tipos de fotos asi como la cantidad de cada una
     * y se redirecciona la pantalla de confirmacion.
     * */
    $scope.addToCart = function () {
        var cache = angular.isDefined(cache) ? cache: Messages.search("confirm_check_screen");
            $ionicPopup.confirm(cache).then(function (res) {
                if (res) {
                    $state.go("app.confirm");
                }
            });

    };
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
=======
/**
 * Created   on 30/11/2014.
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
>>>>>>> 6b3573f23ab4a1a6a9b79219d2874c6a13075a76
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
        imageGallery = [],
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
        clearAndAdd : function(items){
            var notPrint = $filter('filter')(selectedImages, {toPrint:false});; 
            var print = notPrint.concat(items);
            selectedImages = print;
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
        setGallery: function(gallery){
            imageGallery = gallery;
        },
        getGallery: function(){
            return imageGallery;
        },
        getProduct: function(){
            return product;
        },
        clearImages: function () {
            selectedImages = null; // helping garbage collector
            selectedImages = [];
        },
        clearSelection: function () {
            this.clearImages();
            productLine = {};
            product = {};
        }
    };
}]);

/**
 * Created   on 29/11/2014.
 */
models.factory('ShoppingCartFactory', ['$q','StorageService', 'ImageFactory', function ($q, StorageService, ImageFactory) {
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
            email: "",
            address: {
                province: "",
                canton: "",
                district: "",
                exacta: ""
            }
        };
        this.orders = pOrders || [];

        this.travel = {
            direction :{
                canton : "",
                distrito : "",
                provincia : "",
                exacta: ""
            }, 
            price : 0
        };

        this.payment = {
            card: "",
            month: "",
            year: "",
            type: ""
        };

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

        this.getWeight = function(){
            var weight = 0; 
            for (var i = this.orders.length - 1; i >= 0; i--) {
                weight = this.orders[i].product.weight + weight;
            }

            weight = weight/1000;

            if(weight < 1){
                weight = 1;
            }

            return weight;
        };

        this.computeSubTotal = function () {
            var subTotal = 0;
            for (var i = this.orders.length - 1; i >= 0; i--) {
                subTotal += this.orders[i].computeSubTotal();
            }
            return subTotal;
        };

        this.getTotal = function(){
            var t = parseInt(this.computeSubTotal());
            var p = parseInt(this.travel.price);

            return t+p;
        };

        this.getTotalQuantity = function(){
            var quantity = 0;
            for (var i = this.orders.length - 1; i >= 0; i--) {
                quantity += this.orders[i].getQuantity();
            }
            return quantity;
        };
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


        load : function(){
           var defer = $q.defer();
           var self = this;
            /*
            * Load any data stored
            * then check if some shopping cart was already created
            * if yes load it or create a new one and save it (for future usage)
            * and finally return the loaded/created shopping cart
            * */
            var lastShoppingCart,
                restoredOrders;

            if (angular.isUndefined(shoppingCart)) {
                StorageService.loadFile().then(function(e){
                    lastShoppingCart = angular.fromJson(e);
                    if(angular.isObject(lastShoppingCart)){
                        restoredOrders = restoreOrders(lastShoppingCart.orders);
                        shoppingCart = new ShoppingCart(lastShoppingCart.customer, restoredOrders);
                        defer.resolve(shoppingCart);
                    } else {
                        shoppingCart = new ShoppingCart();
                        defer.resolve(shoppingCart);
                        self.saveShoppingCart();
                    }

                });
            } else {
                defer.resolve(shoppingCart);
            }

            return defer.promise;
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
        },

        savePayment : function(pCard, pMonth, pYear, pType){
            shoppingCart.payment = {
                card: pCard,
                month: pMonth,
                year: pYear,
                type: pType
            };

            this.saveShoppingCart();
        },

        saveTravel : function(money, canton, distrito, provincia, exacta){
            shoppingCart.travel = {
                price : money
            };
  
            this.saveShoppingCart();
        },

        saveCustomer : function(name, secondSurname, phone, email, province, canton, district, exacta){
            shoppingCart.customer = {
                name: name,
                firstName: name,
                secondSurname: secondSurname,
                phone: phone,
                email: email,
                address: {
                    province: province,
                    canton: canton,
                    district: district,
                    exacta: exacta
                }
            };
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

services.service('FileReader', ['$window', '$q', function($window, $q){
	
	this.getFileSystem = function(){
		var defer = $q.defer();
	    $window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
	        function(fileSystem){ // success get file system
	            root = fileSystem.root;
	            listDir(root).then(function(e){
	            	defer.resolve(e);
	            });
	        }, function(evt){ // error get file system
	            console.log("File System Error: "+evt.target.error.code);
	        }
	    );
	    return defer.promise;

	}

	this.hasImage = function(entry){
		var a = new DirManager(),
			b = [],
			defer = $q.defer();
			var cont = 0;
			console.log(entry);

		a.list(entry.name+"/", function(e){
			angular.forEach(e, function(v){
				if (v.indexOf('png') > -1 || v.indexOf('jpg') > -1 || v.indexOf('jpeg') > -1 ) {
					cont = cont + 1;
					var c = {url:entry.nativeURL+e}
					b.push(c);
					if(cont == e.length){
						defer.resolve(b);
					}
				} else if(v.split(".").length  == 1){
					getImages(entry.nativeURL+v, entry.name+"/"+v).then(function(c){
						cont = cont + 1;
						b = b.concat(c);
						console.log(e.length);
						console.log(cont);
						window.b = b;
						//if(cont == e.length){
						defer.resolve(b);
						//}
					});
					
				} else {
					cont = cont + 1;
				}
			});
		}, function(){});
		return defer.promise;

	};

	function getImages (path, album) {
		console.log(album);
		var array = [];
		var defer = $q.defer();
		var cont = 0;
		var a = new DirManager();

		a.list(album+"/", function(e){
			angular.forEach(e, function(v, i){
				console.log(v);

				if (v.indexOf('png') > -1 || v.indexOf('jpg') || v.indexOf('jpeg')) {
					 var c = {url:path + "/" + v};
					 array.push(c);
					 cont = cont + 1;
					 if(cont  == e.length){
						defer.resolve(array);
					 }
				} else if(v.split(".").length  == 0){
					getImages(album + "/" + v, path + "/" + v).then(function(e){
						cont = cont + 1;
						array.concat(e);

						if(cont  == e.length){
							defer.resolve(array);
						}
					});
				} else {
					cont = cont + 1;
				}
			});

		}, function(){});

		return defer.promise;
	};



	function listDir(directoryEntry){
		var defer = $q.defer();
		var array = [];

	    if( !directoryEntry.isDirectory ) console.log('listDir incorrect type');
	     
	    currentDir = directoryEntry; // set current directory
	    directoryEntry.getParent(function(par){ // success get parent
	        console.log(par);}, function(error){ // error get parent
	        console.log('Get parent error: '+error.code);
	    });
	     
	    var directoryReader = directoryEntry.createReader();
	    directoryReader.readEntries(function(entries){
	    	console.log(entries);
	    	for(var i in entries){
	    		console.log(entries[i])
	    		if(entries[i].isDirectory){
	    			array.push(entries[i])
	    		}
	    	}
	    	console.log(array);
	    	defer.resolve(array);
	    }, function(error){
	    	defer.resolve(false);
	    });

	    return defer.promise;
	}


}]);
services.service('InstagramService', ['$http', '$window', '$q', function ($http, $window, $q) {
    var self = this,
        vault = {
            user: undefined,
            userMedia: undefined,
            accessToken: undefined
        },
        config = {
            clientId: '70a2ae9262fc4805a5571e8036695a4d',
            redirectUri: 'http://www.wikipedia.org/',
            apiUrl: 'https://api.instagram.com/v1/',
            oauthUrl: 'https://instagram.com/oauth/authorize/?',
            scope: 'basic'
        };

    this.hasAccessToken = function () {
        return angular.isDefined(vault.accessToken);
    };

    this.isAuthenticated = function () {
        return angular.isDefined(vault.user);
    };

    var fetch = function (url, options) {
        var params = {
                client_id: config.clientId,
                callback: 'JSON_CALLBACK'
            };
        if (self.hasAccessToken()) {
            params.access_token = vault.accessToken;
        }

        return $http({
            cache: true,
            method: 'jsonp',
            params: angular.extend({}, params, options),
            responseType: 'json',
            url: config.apiUrl + url
        });
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
                vault.accessToken = e.url.substr(e.url.search('access_token')+'access_token='.length);
                authTab.close();
                fetch('users/self/').then(
                    function(response){
                        vault.user = response.data.data;
                        deferred.resolve(response.data.data);
                    }
                );
            } else if (e.url.search('error') !== -1) { // User denied access
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

    var addUserMedia = function (pMedia2add) {
        if (angular.isUndefined(vault.userMedia)) {
            vault.userMedia = pMedia2add;
        } else {
            vault.userMedia.pagination = pMedia2add.pagination;
            vault.userMedia.data.push(pMedia2add.data);
        }
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

        return bindAuthEvents($window.open(authUrl, '_blank', 'location=yes;clearcache=yes'));
    };

    this.hasUserMedia = function(){
        return angular.isDefined(vault.userMedia);
    };

    this.cleanUserMedia = function () {
        vault.userMedia = null; // helping garbage collector
        vault.userMedia = undefined;
    }

    this.canLoadMore = function(){
        var can = true;

        if( self.hasUserMedia() ){
            if (angular.isDefined(vault.userMedia.pagination)) {
                if (angular.isUndefined(vault.userMedia.pagination.next_url)){
                    can = false;
                }
            }
        }

        return can;
    };

    this.getRecentMedia = function() {
        var params = {},
            deferred = $q.defer();

        if (self.hasUserMedia()) {
            if(self.canLoadMore()) {
                params.max_id = vault.userMedia.pagination.next_max_id;
            }
        }
        fetch('users/self/media/recent', params).then(
            function(response){
                addUserMedia(response.data);
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

    this.getMessages = function() {
        return messages;
    };
    // Load the messages from JSON file
    initMessages();
}]);
/**
 * Created by Raiam 
 */
services.service('Payment', ['$window', '$http', '$q', function ($window, $http, $q) {
    
    this.sendWeight = function(h){
        var defer = $q.defer();

        $.ajax({
            url: "http://www.gn-digital.info/services/tarifario_courier/api/?method=t_paqueteporpeso&params[peso]="+h+"&params[is_gam]=0",
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            jsonpCallback:'tarifario_callback',
            success: function(response) { defer.resolve(response);},
            error: function(error){defer.resolve(error);}
        });

        return defer.promise;
    };

    this.makePay = function(order_id, name, last, emisor, tarjeta, month, year, price, envio){
         var defer = $q.defer();
         console.log("http://www.gn-digital.com/pago_por_api/?sel=save&order_id=3619&ccname="+name+"%20"+last+"&ccnumber=12345&ccissuer="+emisor+"&ccmonth="+month+"&ccyear="+year+"&products[0][id]=2&products[0][name]=CobroFotos&products[0][price]="+price+"&products[0][qty]=1&products[1][id]=3&products[1][name]=Envio&products[1][price]="+envio+"&products[1][qty]=1&callback=jason");
        
        $.ajax({
            url: "http://www.gn-digital.com/pago_por_api/?sel=save&order_id=3619&ccname="+name+"%20"+last+"&ccnumber="+tarjeta+"&ccissuer="+emisor+"&ccmonth="+month+"&ccyear="+year+"&products[0][id]=2&products[0][name]=CobroFotos&products[0][price]="+price+"&products[0][qty]=1&products[1][id]=3&products[1][name]=Envio&products[1][price]="+envio+"&products[1][qty]=1&callback=jason",
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            jsonpCallback:'gnpaymentcallback',
            success: function(response) { defer.resolve(response);},
            error: function(error){defer.resolve(error);}
        });

        return defer.promise;
    };


}]);
/**
 * Created   on 24/11/2014.
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
 * Created   on 30/11/2014.
 */
services.service('StorageService', ['$window','$q', function ($window, $q) {
    var storage = $window.localStorage,
        prefix = "hacelo",
        cart = "";

    this.save = function(pCartData) {
        var saved = true;
        /*try {
            storage.setItem(prefix, angular.toJson(pCartData, false));
        } catch (e) {
            saved = false;
        }*/

        try {
            this.saveToDisk(pCartData);
        } catch (e) {
            saved = false;
        }
        
        return saved;
    };


    this.load = function() {
        //return angular.fromJson(cart);
        return angular.fromJson(storage.getItem(prefix));
    };


    this.loadFile = function(){
        var defer = $q.defer(),
            self = this;
        // This is to ensure device is ready
        document.addEventListener('deviceready', function(){
            self.getDataFromDisk().then(function(e){
                cart = e;
                defer.resolve(e);
            });
        }, false);


        return defer.promise;
    };


    this.clear = function() {
        this.save("");
    };


    this.saveToDisk = function(pCartData){
        var b = new FileManager(),
            a = new DirManager();

        a.create_r('Printea',Log('created successfully'));
        b.write_file('Printea/','shopping.txt', angular.toJson(pCartData, false) ,Log('wrote sucessful!'));
    };


    this.getDataFromDisk = function(){
        var defer = $q.defer(),
            a = new DirManager(),
            b = new FileManager(),
            c = "" ;

        this.existFolder().then(function(e){
            console.log(e);
            if(!e){
                b.write_file('Printea/','shopping.txt', null ,function(){

                    b.read_file('Printea/','shopping.txt',function(e){
                        console.log(e);
                        defer.resolve(e);
                    },function(e){
                        console.log(e);
                        defer.resolve(e);
                    });
                });
            } else {
                b.read_file('Printea/','shopping.txt',function(e){console.log(e);defer.resolve(e);},function(e){console.log(e);defer.resolve(e)});
            }
        });
        
        return defer.promise;
    };


    this.existFolder = function(){
        var defer = $q.defer(),
            a = new DirManager(),
            c = "" ;

        a.list('Printea/', function(e){
            console.log(e);
            if(e.length > 0){
                defer.resolve(true);
            } else {
                defer.resolve(false);
            }
        });

        return defer.promise;
    };

}]);
services.service('Utils', ['$q', '$timeout', function ($q, $timeout) {
    /**
 * Converts image URLs to dataURL schema using Javascript only.
 *
 * @param {String} url Location of the image file
 * @param {Function} success Callback function that will handle successful responses. This function should take one parameter
 *                            <code>dataURL</code> which will be a type of <code>String</code>.
 * @param {Function} error Error handler.
 *
 * @example
 * var onSuccess = function(e){
 *  document.body.appendChild(e.image);
 *  alert(e.data);
 * };
 *
 * var onError = function(e){
 *  alert(e.message);
 * };
 *
 * getImageDataURL('myimage.png', onSuccess, onError);
 *
 */
this.getImageDataURL = function(url, x, y) {
    
    var defer = $q.defer();
        var data, canvas, ctx;
        var img = new Image();
        img.onload = function(){
            // Create the canvas element.
            canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            // Get '2d' context and draw the image.
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            // Get canvas data URL
            try{
                console.log("got it");
                data = canvas.toDataURL();
                defer.resolve({image:img, data:data, x:x, y:y});
            }catch(e){
                console.log("broke");
                defer.reject(e);
            }
        }
        // Load image URL.
        try{
            img.src = url;
        }catch(e){
            console.log("broke this shit");
            defer.reject(e);
        }

    
    return defer.promise;

};

this.shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

}]);
