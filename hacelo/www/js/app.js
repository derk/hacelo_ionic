angular.module('starter', [
    'ionic',
    'starter.controllers',
    'starter.service'
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

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/index.html",
        controller: 'AppCtrl'
    })
    .state('app.landing', {
        url: "/landing",
        views: {
            'haceloContent': {
                templateUrl: "templates/landing.html",
                controller: 'indexCtrl'
            }
        }
    })
    .state('app.instagram', {
        url: "/instagram",
        views: {
            'haceloContent': {
                templateUrl: "templates/instagram.html",
                controller: 'instagramCrtl'
            }
        }
    })
    .state('app.products', {
        url: "/products",
        views: {
            'haceloContent': {
                templateUrl: "templates/product.html",
                controller: 'productsCtrl'
            }
        }
    })
    .state('app.photo', {
        url: "/photo",
        views: {
            'haceloContent': {
                templateUrl: "templates/photo.html",
                controller: 'photoCtrl'
            }
        }
    })
    .state('app.choose', {
        url: "/choose",
        views: {
            'haceloContent': {
                templateUrl: "templates/choose.html",
                controller: 'chooseCtrl'
            }
        }
    })
    .state('app.check', {
        url: "/check",
        views: {
            'haceloContent': {
                templateUrl: "templates/check-photo.html",
                controller: 'checkCrtl'
            }
        }
    })
    .state('app.confirm', {
        url: "/confirm",
        views: {
            'haceloContent': {
                templateUrl: "templates/confirm.html",
                controller: 'confirmCtrl'
            }
        }
    })
    .state('app.added', {
        url: "/added",
        views: {
            'haceloContent': {
                templateUrl: "templates/added-cart.html",
                controller: 'addedCartCtrl'
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
    .state('app.cart-empty', {
        url: "/cart-empty",
        views: {
            'haceloContent': {
                templateUrl: "templates/cart-empty.html",
                controller: 'cartEmptyCtrl'
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
});