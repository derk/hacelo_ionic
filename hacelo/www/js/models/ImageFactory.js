models.factory('ImageFactory', [function () {
    function ImageWrapper (source) {
        var self = this;
        this.origin = "phone";
        this.images;
        this.toPrint = false;

        if (angular.isObject(source)) {
            this.origin = "instagram";
            this.images = source;
        } else if (angular.isString(source)) {
            this.images = {
                "low_resolution": {
                    "url": source,
                    "width": 306,
                    "height": 306
                },
                "thumbnail": {
                    "url": source,
                    "width": 150,
                    "height": 150
                },
                "standard_resolution": {
                    "url": source,
                    "width": 640,
                    "height": 640
                }
            }
        }
    }

    return ImageWrapper;
}])