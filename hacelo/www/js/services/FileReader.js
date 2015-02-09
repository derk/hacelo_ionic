services.service('FileReader', ['$window', '$q', 'ImageFactory', function ($window, $q, ImageFactory){
    var processFolder;
    var galleries = [];
    var cont = 1;
    /**
     * Helper of processFolder
     * Filter the given entries list.
     * Remove any entry that we are not interested to work.
     * @param  {Array : array to process}
     * @return {Array : filtered array}
     */
    var removeInvalidEntries = function (list2Clean){
        var clean = [],
            len = list2Clean.length;

        for (var i=0; i < len; i++) {
            var valid = !0; // flag that indicate if this entry is valid

            //==================== Start entry validations ====================

            if (list2Clean[i].isFile) {// validations for files ONLY

                // remove any file that is not an image
                if ( (/\.(?:jpg|jpeg|png)$/i).test(list2Clean[i].name) === !1 ) {valid = !1;}

            } else if (list2Clean[i].isDirectory) {// validations for directories ONLY

                // remove any folder named `Android`. This is because this folder holds many cache images
                if (list2Clean[i].name === 'Android') {valid = !1;}

            }
            // both files and directory validations

            // Remove any item that is hidden.
            if ( list2Clean[i].name.charAt(0) === '.' ) {valid = !1;}

            //==================== End entry validations ====================

            if(valid) {
                clean.push(list2Clean[i]);
            }
        }
        list2Clean = null; // garbage collector help
        return clean;
    };

    var firstItems = function (list2Clean) {
        var clean = [],
            len = list2Clean.length;

        for (var i=0; i < len; i++) {
            var valid = !0; // flag that indicate if this entry is valid

            //==================== Start entry validations ====================

            if (list2Clean[i].isFile) {// validations for files ONLY

                // remove any file that is not an image
                if ( (/\.(?:jpg|jpeg|png)$/i).test(list2Clean[i].name) === !1 ) {valid = !1;}

            } else if (list2Clean[i].isDirectory) {// validations for directories ONLY

                // remove any folder named `Android`. This is because this folder holds many cache images
                if (list2Clean[i].name === 'Android' || list2Clean[i].name != 'Pictures') {
                        valid = !1;
                }

            }
            // both files and directory validations

            // Remove any item that is hidden.
            if ( list2Clean[i].name.charAt(0) === '.' ) {valid = !1;}

            //==================== End entry validations ====================

            if(valid) {
                clean.push(list2Clean[i]);
            }
        }
        list2Clean = null; // garbage collector help
        return clean;
    };

    /**
     * Helper of processImage
     * This function takes care of checking if the given image
     * gallery of which it belong and needs to be added to it.
     * If there no gallery with that name, a new one will be created
     * 
     * @param {FileEntry : to extract the gallery name}
     * @param {PhoneLoadedImage : instance of the image, will be used later by the UI}
     */
    var addImage2Gallery = function (fileEntry, phoneLoadedImg) {
        var galleryName = fileEntry.fullPath.split('/').slice(-2)[0],
            galleryExists = false,
            galleryIndex = 0;

        for (var i=0; i < galleries.length; i++){
            if (galleries[i].name === galleryName) {
                galleryExists = true;
                galleryIndex = i;
            }
        }
        if (galleryExists === false)  {
            galleries.push({
                name: galleryName,
                images: []
            });
            galleryIndex = galleries.length-1;
        }

        galleries[galleryIndex].images.push(phoneLoadedImg);
      //  console.log();
    };

    /**
     * Helper of processFolder
     * Check if this image has a valid size
     * because we don't want to have an image with something like
     * 10px of width and 30px of height.
     * If the file pass the check is added to the gallery list as an PhoneLoadedImg object
     * */
    var processImage = function (fileEntry) {
        var deferred = $q.defer(),
            phoneLoadedImg = ImageFactory.getPhoneLoadedImg(fileEntry.nativeURL);

            phoneLoadedImg.imageInit().then(function (img) {
                addImage2Gallery(fileEntry, phoneLoadedImg);
                deferred.resolve(img);
            });

        return deferred.promise;
    };

    var processFolder = function (dirEntry) {
        var deferred = $q.defer();

        dirEntry.createReader().readEntries(function (dirtyEntries) {
            if(cont == 1){
                console.log(firstItems(dirtyEntries));
                var cleanEntries = firstItems(dirtyEntries);
                window.e = dirtyEntries;
                cont = 0;
            } else {
                var cleanEntries = removeInvalidEntries(dirtyEntries);
            }
            if(cleanEntries.length===0) {
                return deferred.resolve(dirEntry);
            }

            async.each(cleanEntries, function (entry, callback) {
                var successCB = function () {
                    callback();
                };

                if (entry.isFile) {
                    processImage(entry).then(successCB);

                } else if (entry.isDirectory) {
                    processFolder(entry).then(successCB);
                }

            }, function (err) {
                deferred.resolve(dirEntry);
            });

        }, Log('Unable to read entries of: ' + dirEntry.name));

        return deferred.promise;
    };

    /**
     * Kick start
     * Request access to the file system an then start the scanning process
     * */
    this.scanFileSystem = function () {
        var deferred = $q.defer();

        fileSystemSingleton.load(function (fileSystem){
            processFolder(fileSystem.root).then(function (res) {
                deferred.resolve(galleries);
            });
        }, Log('Unable to get access to the FileSystem'));

        return deferred.promise;
    };

}]);
