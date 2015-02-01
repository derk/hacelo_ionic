/**
 * Created by joseph on 22/12/2014.
 */
controllers.service('ScreenHelper', ['$window', function ($window) {
    var info,
        init = function() {
            $window.plugins.aboutScreen.getInfo(function (screenInfo) {
                console.log("aboutScreen.getInfo", screenInfo);
                info = screenInfo;
            }, function () {
                info = {
                    height: $window.screen.height,
                    width: $window.screen.width
                }
            });
        };

    this.getInfo = function() {
        return info;
    };

    this.inchToPixel = function (inch) {
        inch = 1;


    }

    ionic.Platform.ready(init);
}]);