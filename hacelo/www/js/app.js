// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.service'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
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
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })
    .state('app.index', {
      url: "/index",
      views: {
        'menuContent' :{
          templateUrl: "templates/index.html",
          controller: 'indexCtrl'
        }
      }
    })
    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.instagram', {
      url: "/instagram",
      views: {
        'menuContent' :{
          templateUrl: "templates/instagram.html",
          controller: 'instagramCrtl'
        }
      }
    })
    .state('app.products', {
      url: "/products",
      views: {
        'menuContent' :{
          templateUrl: "templates/product.html",
          controller: 'productsCtrl'
        }
      }
    })
    .state('app.photo', {
      url: "/photo",
      views: {
        'menuContent' :{
          templateUrl: "templates/photo.html",
          controller: 'photoCtrl'
        }
      }
    })
    .state('app.choose', {
      url: "/choose",
      views: {
        'menuContent' :{
          templateUrl: "templates/choose.html",
          controller: 'chooseCtrl'
        }
      }
    })
    .state('app.check', {
      url: "/check",
      views: {
        'menuContent' :{
          templateUrl: "templates/check-photo.html",
          controller: 'checkCrtl'
        }
      }
    })
    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    })
    .state('app.confirm', {
      url: "/confirm",
      views: {
        'menuContent' :{
          templateUrl: "templates/confirm.html",
          controller: 'confirmCtrl'
        }
      }
    })
    .state('app.added', {
      url: "/added",
      views: {
        'menuContent' :{
          templateUrl: "templates/added-cart.html",
          controller: 'addedCartCtrl'
        }
      }
    })
    .state('app.cart', {
      url: "/cart",
      views: {
        'menuContent' :{
          templateUrl: "templates/cart.html",
          controller: 'cartCtrl'
        }
      }
    })
    .state('app.cart-checkout', {
      url: "/cart-checkout",
      views: {
        'menuContent' :{
          templateUrl: "templates/cart-checkout.html",
          controller: 'cartCheckoutCtrl'
        }
      }
    })
    .state('app.cart-empty', {
      url: "/cart-empty",
      views: {
        'menuContent' :{
          templateUrl: "templates/cart-empty.html",
          controller: 'cartEmptyCtrl'
        }
      }
    })
    .state('app.congrats', {
      url: "/congrats",
      views: {
        'menuContent' :{
          templateUrl: "templates/congrats.html",
          controller: 'congratsCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/index');
});

