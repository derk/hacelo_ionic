models.factory('ImageFactory', ['$q', function ($q) {
    function ImageWrapper (pOrigin, pOriginalSource, pImages, pToPrint, pQuantity) {
        this.origin = pOrigin;
        this._originalSource = pOriginalSource;
        this.images = pImages;
        this.toPrint = pToPrint || false;
        this.quantity = pQuantity || 0;

        return this;
    }
    // ---
    // STATIC ATTRIBUTES.
    // ---
    ImageWrapper.sources = {
        INS: "instagram",
        PHN: "phone"
    };

    // Class used as an abstraction of images loaded from phone gallery
    function PhoneLoadedImg (uri, gallery) {
        ImageWrapper.call(this, ImageWrapper.sources.PHN, uri, {}, false);
        this.images.thumbnail = {
            "url": "",
            // the generated thumbnail will have this width
            "width": 150,
            "height": 0
        };
        this.images.standard_resolution = {
            "url": uri,
            "width": 0,
            "height": 0
        };

        this.gallery = gallery;
        this._originalSource = uri;

        this.imageInit = function(){
            var self = this,
                deferred = $q.defer();
            fabric.Image.fromURL(this._originalSource, function(oImg) {
                var imgs = self.images;
                // Setting standard_resolution values
                imgs.standard_resolution.width = oImg.getWidth();
                imgs.standard_resolution.height = oImg.getHeight();
                // Setting thumbnail values
                oImg.scaleToWidth(imgs.thumbnail.width);
                imgs.thumbnail.url = oImg.toDataURL({"format": "png"});
                imgs.thumbnail.height = oImg.getHeight();
                // All done here. Now notify the controller with success response
                deferred.resolve(self);
            });

            return deferred.promise;
        };
    }
    PhoneLoadedImg.prototype = new ImageWrapper();
    PhoneLoadedImg.prototype.constructor = PhoneLoadedImg;

    // Class used as an abstraction of images loaded from Instagram
    function InstagramLoadedImg (imagesObj) {
        ImageWrapper.call(this, ImageWrapper.sources.INS, imagesObj, angular.copy(imagesObj,{}));
    }
    InstagramLoadedImg.prototype = new ImageWrapper();
    InstagramLoadedImg.prototype.constructor = InstagramLoadedImg;

    return {
        getPhoneLoadedImg: function (pUri) {
            return new PhoneLoadedImg(pUri);
        },
        getInstagramLoadedImg: function (pImagesObj) {
            return new InstagramLoadedImg(pImagesObj);
        },
        restoreImage: function(pObj){
            var restoredImage;
            switch (pObj.origin) {
                case ImageWrapper.sources.PHN:
                    restoredImage = this.getPhoneLoadedImg(pObj._originalSource);
                    break;
                case ImageWrapper.sources.INS:
                    restoredImage = this.getInstagramLoadedImg(pObj._originalSource);
                    break;
            }
            restoredImage.images = pObj.images;
            restoredImage.toPrint = pObj.toPrint;
            restoredImage.quantity = pObj.quantity;
            return restoredImage;
        }
    };
}]);
