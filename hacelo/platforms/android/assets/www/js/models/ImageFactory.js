models.factory('ImageFactory', ['$q', function ($q) {
    function ImageWrapper (source) {
        this.origin = "phone";
        this.images = source;
        this.toPrint = false;

        if (angular.isObject(source)) {
            this.origin = "instagram";
        } else if (angular.isString(source)) {
            this._phoneSource = source;
            this.toPrint = true;
            this.deferred = $q.defer();
            // most of this values cannot be filled without load the image
            // So this values will be filled later when the image is loaded
            this.images = {
                "thumbnail": {
                    "url": "",
                    // the generated thumbnail will have this width
                    "width": 150,
                    "height": 0
                },
                "standard_resolution": {
                    "url": source,
                    "width": 0,
                    "height": 0
                }
            }
        }
    }

    ImageWrapper.prototype = {
        constructor: ImageWrapper,

        phoneImageInit: function(){
            var self = this,
                imgs = this.images;
            fabric.Image.fromURL(this._phoneSource, function(oImg) {
                // Setting standard_resolution values
                imgs.standard_resolution.width = oImg.getWidth();
                imgs.standard_resolution.height = oImg.getHeight();
                // Setting thumbnail values
                oImg.scaleToWidth(imgs.thumbnail.width);
                imgs.thumbnail.url = oImg.toDataURL({"format": "jpeg"});
                imgs.thumbnail.height = oImg.getHeight();
                // All done here. Now notify the controller with success response
                self.deferred.resolve(self);
            });

            return this.deferred.promise;
        }
    };

    return ImageWrapper;
}]);