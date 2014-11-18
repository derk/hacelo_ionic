/* ChooseCrtl para controlar la pantalla de escoger
 * $scope - Scope de la pantalla
 * Nacion_Service - Servicio de datos de nacion, service.js
 */
controllers.controller('checkCtrl', function($scope,$ionicPopup, $timeout, Nacion_Service) {
    //Variables for using on the app
    //$scope.images = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp_xyq9C4GVc79lShg4Uo5gTZoBPdimQEHQKHn6cjibxe69Im-A','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp_xyq9C4GVc79lShg4Uo5gTZoBPdimQEHQKHn6cjibxe69Im-A'];
    $scope.images = Nacion_Service.get_instagram_pics_on_queue();
    $scope.dkrm;

    $scope.crop = function ($index) {
        $scope.showPopup($index);
    };

    $scope.showPopup = function($index) {
      $scope.data = {}
      $scope.img = $scope.images[$index].images.low_resolution;

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: ' <img id="cropArea" src="{{img.url}}" width="{{img.width}}" alt="$index">',
        title: 'Cortar la Fotografía',
        subTitle: 'Selecciona el area a cortar',
        scope: $scope,
        buttons: [
          { 
            text: 'Cancelar'
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
                console.log($scope.images[$index].images.low_resolution.url);
                $scope.images[$index].images.low_resolution.url = $scope.dkrm.snapshotImage();
                console.log($scope.images[$index].images.low_resolution.url);
                myPopup.close();
            }
          },
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });

      $timeout(function(){
        $scope.executeCrop();
      },100);
     };



     $scope.executeCrop = function () {
        $scope.dkrm = new Darkroom('#cropArea', {
          minWidth: 100,
          minHeight: 100,
          maxWidth: 650,
          maxHeight: 500,

          plugins: {
            crop: {
              quickCropKey: 67
            }
          },

          init: function() {
            var cropPlugin = this.getPlugin('crop');
            cropPlugin.selectZone(170, 25, 300, 300);
          }
        });
     };


});