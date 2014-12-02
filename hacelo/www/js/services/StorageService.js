/**
 * Created by joseph on 30/11/2014.
 */
services.service('StorageService', ['$window', function ($window) {
    var storage = $window.localStorage,
        prefix = "hacelo";

    this.save = function(pCartData) {
        var saved = true;
        if (angular.isObject(pCartData)) {
            try {
                storage.setItem(prefix, angular.toJson(pCartData, false));
            } catch (e) {
                saved = false;
            }
        } else {
            saved = false;
        }
        return saved;
    };

    this.load = function() {
        if (angular.isDefined(storage.getItem(prefix))) {
            return angular.fromJson(storage.getItem(prefix));
        } else {
            return angular.fromJson(this.save({}))
        }
    };

    this.clear = function() {
        storage.clear();
    };

    this.deleteNode = function ($index) {
        console.log($index);
        var market = this.load().market;
        console.log(market);
        market.splice($index, 1);
        console.log(market);
        this.save(market);
    };
}]);