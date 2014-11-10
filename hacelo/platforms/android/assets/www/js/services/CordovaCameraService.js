services.service('CordovaCameraService', ['$window','$q','ImageFactory','MessageService','$ionicPopup', function ($window,$q,ImageFactory,MessageService,$ionicPopup) {
    var cam = $window.navigator.camera,
        cameraOptions = {
            quality : 100,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            /*allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false*/
        };

    this.getPhonePic = function() {
        var q = $q.defer();
        cam.getPicture(function(result) {
            q.resolve(result);
        }, function(result) {
            q.reject(result);
        }, cameraOptions);

        return q.promise;
    };
}])