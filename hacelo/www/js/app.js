angular.module('hacelo', [
    'ionic',
    'slick',
    'hacelo.config',
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