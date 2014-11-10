/* Instagram para controlar la pantalla de isntagram
 * $scope - Scope de la pantalla
 * Nacion_Service - Servicio de datos de nacion, service.js
 */
controllers.controller('InstagramCrtl', function($scope, Nacion_Service) {
    $scope.instagram_pics = Nacion_Service.get_entire_ins_pics();
    $scope.picked_pics = Nacion_Service.get_instagram_pics_on_queue();
    $scope.load_more = Nacion_Service.getNextUrl();
    Nacion_Service.hide();
    console.log($scope.load_more);

    $scope.pick_song = function(index, data) {
        if ($scope.instagram_pics[index].picked) {
            $scope.instagram_pics[index].picked = false;
            var index = $scope.picked_pics.indexOf(data);
            $scope.picked_pics.splice(index, 1);
        } else {
            $scope.instagram_pics[index].picked = true;
            $scope.picked_pics.push(data);
        }
    };

    $scope.insert_into_queue = function() {
        Nacion_Service.set_instagram_pics_on_queue($scope.picked_pics);
        window.picked = $scope.picked_pics;
        window.history.back();
    };

    $scope.loadMore = function(){
        var instagram_v = new Instagram();
            instagram_v.loadMore($scope.load_more);
    };

    document.addEventListener('finish', function(e) {
        //Open the loading popup
        Nacion_Service.show(hacelo.messages.Loading);
        //little timeout to ensure the pop up to appear
        setTimeout(function() {
            var nextPage = e.detail;
            var array = [];
            for (var el = 0; el < nextPage.length; el++) {
                var obj = {
                    "img": nextPage[el],
                    "picked": false
                };
                array.push(obj);
            }
            $scope.instagram_pics = $scope.instagram_pics.concat(array);
            console.debug(array);
            Nacion_Service.set_entire_ins_pics($scope.instagram_pics);
            Nacion_Service.hide();

            Nacion_Service.setNextUrl('');
            $scope.load_more = Nacion_Service.getNextUrl();
        }, 100);

    });

    document.addEventListener('pagination', function(e) {
        Nacion_Service.setNextUrl(e.detail);
        $scope.load_more = Nacion_Service.getNextUrl();
    });
});