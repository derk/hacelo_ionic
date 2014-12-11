/**
 * Created by joseph on 30/11/2014.
 */
services.service('StorageService', ['$window', function ($window) {
    var storage = $window.localStorage,
        prefix = "hacelo";

    this.save = function(pCartData) {
        var saved = true;
        try {
            storage.setItem(prefix, angular.toJson(pCartData, false));
        } catch (e) {
            saved = false;
        }
        return saved;
    };

    this.load = function() {
        return angular.fromJson(storage.getItem(prefix));
    };

    this.clear = function() {
        this.save("");
    };
}]);