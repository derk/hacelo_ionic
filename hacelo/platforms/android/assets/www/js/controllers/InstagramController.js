/* Instagram para controlar la pantalla de isntagram
 * $scope - Scope de la pantalla
 * Nacion_Service - Servicio de datos de nacion, service.js
 */
controllers.controller('InstagramCrtl', function($scope, Nacion_Service) {
    $scope.instagram_pics = Nacion_Service.get_entire_ins_pics();
    $scope.picked_pics = Nacion_Service.get_instagram_pics_on_queue();
    Nacion_Service.hide();

    $scope.pick_song = function(index, data) {
        if ($scope.instagram_pics[index].picked) {
            $scope.instagram_pics[index].picked = false;
            var index = $scope.picked_pics.indexOf(data);
            $scope.picked_pics.splice(index, 1);
        } else {
            $scope.instagram_pics[index].picked = true;
            $scope.picked_pics.push(data);
        }
        console.debug($scope.picked_pics.length);
    };

    $scope.insert_into_queue = function() {
        Nacion_Service.set_instagram_pics_on_queue($scope.picked_pics);
        window.picked = $scope.picked_pics;
        window.history.back();
    };
});