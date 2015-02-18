services.service('CartService', ['$http', '$q', function ($http, $q) {
    // Private stuff

    var api = "http://www.codabi.com/api/e1eadb3ffeca4f8788be5b7355d2517d/";
    var model = {
        "UNKNOWN" : {"hasError" : true, "Message" : "El Codigo no es valido."},
        "EATEN" :   {"hasError" : true, "Message" : "Codigo previamente utilizado"},
        "FOUND" :   {"hasError" : false, "Message" : "Su codigo es valido"},
        "ALREADY_EATEN" : {"hasError": true, "Message" : "Su codigo ya ha sido utilizado."},
        "DONE" : {"hasError" : false, "Message" : "Exito"}
    };

    this.redeem = function (code, redeem) {
        var defer = $q.defer();
        var url = api + code;
        angular.isDefined(redeem) ? url += "/eat/" : url += "/check/";

        $http.get(url)
            .success(function(e){
                model[e].code = code;
                defer.resolve(model[e]);
            }).error(function(e){
                defer.reject({error: e, code: code});
            });

        return defer.promise;
    };

}]);