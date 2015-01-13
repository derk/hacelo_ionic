/**
 * Created by joseph on 30/11/2014.
 */
services.service('StorageService', ['$window','$q', function ($window, $q) {
    var storage = $window.localStorage,
        prefix = "hacelo";

    this.save = function(pCartData) {
        var saved = true;
        try {
            storage.setItem(prefix, angular.toJson(pCartData, false));
        } catch (e) {
            saved = false;
        }
        this.saveToDisk(pCartData);
        return saved;
    };

    this.load = function() {
        var self = this;
        document.addEventListener('deviceready', function(){

            console.log(self.getDataFromDisk());
        }, false);
        
        return angular.fromJson(storage.getItem(prefix));
    };

    this.clear = function() {
        this.save("");
    };

    this.saveToDisk = function(pCartData){
        var b = new FileManager(),
            a = new DirManager();

        a.create_r('Printea',Log('created successfully'));
        b.write_file('Printea/','shopping.txt', angular.toJson(pCartData, false) ,Log('wrote sucessful!'));
    };

    this.getDataFromDisk = function(){
        var defer = $q.defer();
        var b = new FileManager(),
            c = "" ;
        b.read_file('Printea/','shopping.txt',function(e){c = e;},function(e){defer.resolve(e)});

        return c;
    };
}]);