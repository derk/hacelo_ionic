angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicLoading, Nacion_Service) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.user ={
    "instagra_username":"Raiam"
  };
  $scope.validate = false;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.insert_url = function(){
    if($scope.validate == false){
      $scope.validate = true;
      Nacion_Service.set_username($scope.user.instagra_username);
      $timeout(function() {
        $scope.closeLogin();
        Nacion_Service.createEvent('update-username',$scope.user.instagra_username);
      }, 1000);
    }
    
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  alert($stateParams);

})
.controller('productsCtrl', function($scope, $stateParams) {
})
.controller('photoCtrl', function($scope, $stateParams) {
})
.controller('indexCtrl', function($scope, $stateParams) {
})

/* Instagram para controlar la pantalla de isntagram
 * $scope - Scope de la pantalla
 * Nacion_Service - Servicio de datos de nacion, service.js
 */
.controller('instagramCrtl',function($scope, Nacion_Service){
  $scope.instagram_pics = Nacion_Service.get_entire_ins_pics();
  $scope.picked_pics = Nacion_Service.get_instagram_pics_on_queue();
  Nacion_Service.hide();

  $scope.pick_song = function(index, data){
    if($scope.instagram_pics[index].picked){
      $scope.instagram_pics[index].picked = false;
      var index = $scope.picked_pics.indexOf(data);
      $scope.picked_pics.splice(index,1);
    } else {
      $scope.instagram_pics[index].picked = true;
      $scope.picked_pics.push(data);
    }
    console.debug($scope.picked_pics.length);
  };

  $scope.insert_into_queue = function(){
    Nacion_Service.set_instagram_pics_on_queue($scope.picked_pics);
    window.picked = $scope.picked_pics;
    window.history.back();
  };

})


/* ChooseCrtl para controlar la pantalla de escoger
 * $scope - Scope de la pantalla
 * Nacion_Service - Servicio de datos de nacion, service.js
 */
.controller('chooseCtrl',function($scope, Nacion_Service) {
  //Variables for using on the app
  $scope.username = '';
  $scope.instagram_pics = Nacion_Service.get_entire_ins_pics();
  $scope.all_pics_for_print = Nacion_Service.get_instagram_pics_on_queue();
  console.debug($scope.all_pics_for_print);

  //Function for init the isntagram
  $scope.init_instagram = function(username){
    var instagram_v = new Instagram(username);
      instagram_v.init();
  };

  //Open the new window with the correct url for using
  $scope.call_popup = function(){
    if(Nacion_Service.get_entire_ins_pics().length <= 0){
      var instagram_v = new Instagram();
      instagram_v.init();
      //$scope.modal.show();
    } else {
      Nacion_Service.show(hacelo.messages.Loading);
      setTimeout(function(){
        window.location.href = '#/app/instagram';
      },500);
      
    }
  };

  //Document listener for when updating username
  document.addEventListener('update-username',function(e){  
    $scope.username = e.detail;
    $scope.init_instagram($scope.username);
  });

  //Listener when the page just got the code and the images as well.
  document.addEventListener('finish',function(e){
    //Open the loading popup
    Nacion_Service.show(hacelo.messages.Loading);
    //little timeout to ensure the pop up to appear
    setTimeout(function(){
      $scope.instagram_pics = e.detail;
      var array = [];
      for (var el = 0;el<$scope.instagram_pics.length;el++){
        var obj  ={"img":$scope.instagram_pics[el],"picked":false};
        array.push(obj);
      }
      $scope.instagram_pics = array;
      console.debug(array);
      Nacion_Service.set_entire_ins_pics($scope.instagram_pics);
      $scope.$apply();
      if($scope.instagram_pics.length >0){
        window.location.hash="#/app/instagram";
      }; 
    },100);
    
  });
})

  /* CheckCrtl para controlar la pantalla de check
   * $scope - Scope de la pantalla
   * Nacion_Service - Servicio de datos de nacion, service.js
   */
.controller('checkCrtl', function($scope, Nacion_Service){
    
})

  /* confirmCrtl para controlar la pantalla de confirm
   * $scope - Scope de la pantalla
   */
.controller('confirmCtrl', function($scope){
    
})

  /* addedCartCtrl para controlar la pantalla de added
   * $scope - Scope de la pantalla
   */
.controller('addedCartCtrl', function($scope){
    
})

  /* CartCtrl para controlar la pantalla de carrito
   * $scope - Scope de la pantalla
   */
.controller('CartCtrl', function($scope){
})

  /* cartCheckoutCtrl para controlar la pantalla de carrito form
   * $scope - Scope de la pantalla
   */
.controller('cartCheckoutCtrl', function($scope){
})

  /* cartEmptyCtrl para controlar la pantalla de carrito vacio
   * $scope - Scope de la pantalla
   */
.controller('cartEmptyCtrl', function($scope){
})

  /* congratsCtrl para controlar la pantalla de felicidades
   * $scope - Scope de la pantalla
   */
.controller('congratsCtrl', function($scope){
});


