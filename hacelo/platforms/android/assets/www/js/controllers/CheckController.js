/* ChooseCrtl para controlar la pantalla de escoger
 * $scope - Scope de la pantalla
 * Nacion_Service - Servicio de datos de nacion, service.js
 */
controllers.controller('checkCtrl', function($scope,$ionicPopup, Nacion_Service) {
    //Variables for using on the app
    $scope.images = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp_xyq9C4GVc79lShg4Uo5gTZoBPdimQEHQKHn6cjibxe69Im-A','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp_xyq9C4GVc79lShg4Uo5gTZoBPdimQEHQKHn6cjibxe69Im-A'];
    $scope.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp_xyq9C4GVc79lShg4Uo5gTZoBPdimQEHQKHn6cjibxe69Im-A';

    $scope.crop = function ($index) {
        $scope.showPopup($index);
    };

    $scope.showPopup = function($index) {
      $scope.data = {}
      console.log($index);
      $scope.img = $scope.images[$index];

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: ' <img id="cropArea" src="{{img}}" alt="$index">',
        title: 'Cortar la Fotografía',
        subTitle: 'Selecciona el area a cortar',
        scope: $scope,
        buttons: [
          { text: 'Cancelar'
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
             myPopup.close();
            }
          },
        ]
      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });

      setTimeout(function(){
        $scope.executeCrop();
      },1000);
     };

     $scope.executeCrop = function () {
        var dkrm = new Darkroom('#cropArea', {
          // Size options
          minWidth: 100,
          minHeight: 100,
          maxWidth: 650,
          maxHeight: 500,

          plugins: {
            //save: false,
            crop: {
              quickCropKey: 67, //key "c"
              //minHeight: 50,
              //minWidth: 50,
              //ratio: 1
            }
          },
          init: function() {
            var cropPlugin = this.getPlugin('crop');
            cropPlugin.selectZone(170, 25, 300, 300);
            //cropPlugin.requireFocus();
          }
        });
     }
});