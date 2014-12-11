/**
 * Created by joseph on 30/11/2014.
 */
directives.directive('whenLoaded', ['$parse', '$timeout', function ($parse, $timeout) {
    var directiveName = "whenLoaded";
    return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs) {
            iElement.load(function() {
                var fns = $parse(iAttrs[directiveName])(scope);
                for (var i = 0; i < fns.length; i++) {
                    fns[i]();
                }
            });
        }
    };
}]);