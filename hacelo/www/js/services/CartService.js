services.service('CartService', ['$http', '$q', function ($http, $q) {
    // Private stuff

    var api = "http://www.codabi.com/api/e1eadb3ffeca4f8788be5b7355d2517d/"
    this.redeem = function (code) {
        var defer = $q.defer();

        $http.get(api + code +"/eat/")
            .success(function(e){
                defer.resolve(e);
            }).error(function(e){
                defer.resolve(false);
            });

        return defer.promise;
    };

}]);