/* ChooseCrtl para controlar la pantalla de escoger
 * $scope - Scope de la pantalla
 * Nacion_Service - Servicio de datos de nacion, service.js
 */
controllers.controller('chooseCtrl', function($scope, Nacion_Service) {
    //Variables for using on the app
    $scope.username = '';
    $scope.instagram_pics = Nacion_Service.get_entire_ins_pics();
    $scope.all_pics_for_print = Nacion_Service.get_instagram_pics_on_queue();
    console.debug($scope.all_pics_for_print);

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
        console.log(Nacion_Service.getNextUrl());
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
            console.debug(array);
            Nacion_Service.set_entire_ins_pics($scope.instagram_pics);
            $scope.$apply();
            if ($scope.instagram_pics.length > 0) {
                window.location.hash = "#/app/instagram";
            };
        }, 100);

    });
});