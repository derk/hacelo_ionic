services.service('FileReader', ['$q', '$timeout', 'ImageFactory', function ($q, $timeout, ImageFactory){
    var gallery;

    /**
     * Helper of processFolder
     * Filter the given entries list.
     * Remove any entry that we are not interested to work.
     * @param {Array} List of entries to process
     * @returns {Array} filtered array
     */
    var removeInvalidEntries = function (list2Clean){
        var clean = [],
            len = list2Clean.length,
            /**
             * Indicate how deep we will go in the saning process
             * @type {number}
             */
            folderDeep = 3;

        for (var i=0; i < len; i++) {
            var valid = !0; // indicate if this entry is valid

            //==================== Start entry validations ====================

            if (list2Clean[i].isFile) {// validations for files ONLY

                // remove any file that is not an image
                if ( (/(?:jpg|jpeg|png)/i).test( list2Clean[i].name.split('.').pop() ) === !1 ) {valid = !1;}

            } else if (list2Clean[i].isDirectory) {// validations for directories ONLY

                // remove any folder named `Android`. This is because this folder holds many cache images
                if (list2Clean[i].name === 'Android') {valid = !1;}
                // I don't what to process folders that exceed the deep required
                if (list2Clean[i].fullPath.split('/').length-1 > folderDeep) {valid = !1;}

            }
            // file and directory validations

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
     * @param {FileEntry} Cordova´s FileEntry instance of  the image to add
     * @param {PhoneLoadedImg} Valid instance of the image
     */
    var addImage2Gallery = function (fileEntry, phoneLoadedImg) {
        var albumName = fileEntry.fullPath.split('/').slice(-2)[0],
            albumExists = !1,
            albumIndex = 0;

        for (var i = gallery.albums.length - 1; i >= 0; i--) {
            if (gallery.albums[i].name === albumName) {
                albumExists = !0;
                albumIndex = i;
            }
        }
        if (albumExists === !1)  {
            gallery.add( ImageFactory.getAlbum(albumName) );
            albumIndex = gallery.albums.length-1;
        }

        phoneLoadedImg.gallery = albumName;
        gallery.albums[albumIndex].add(phoneLoadedImg);
    };

    /**
     * Helper of processFolder
     * Check if this image has a valid size
     * because we don't want to have an image with something like
     * 10px of width and 30px of height.
     * If the file pass the check is added to the gallery list as an PhoneLoadedImg object
     * @param {FileEntry} Cordova´s FileEntry instance to process
     * @returns {Deferred} Angular´s $q promise
     */
    var processImage = function (fileEntry) {
        var deferred = $q.defer(),
            phoneLoadedImg = ImageFactory.getPhoneLoadedImg(fileEntry.nativeURL);

        $timeout(function () {
            addImage2Gallery(fileEntry, phoneLoadedImg);
            deferred.resolve(phoneLoadedImg);
        }, 0, !1);

        return deferred.promise;
    };

    /**
     * Scan the given DirectoryEntry looking for images
     * If found a folder call it self passing the new folder to scan as parameter
     * @param {DirectoryEntry} Cordova´s DirectoryEntry instance to process
     * @returns {Deferred} Angular´s $q promise
     */
    var processFolder = function (dirEntry) {
        var deferred = $q.defer();

        dirEntry.createReader().readEntries(function (dirtyEntries) {
            var cleanEntries = removeInvalidEntries(dirtyEntries);

            // if there is nothing to process just return
            if(cleanEntries.length === 0) {
                return deferred.resolve(dirEntry);
            }

            // See https://github.com/caolan/async#eacharr-iterator-callback for documentation details
            async.each(cleanEntries, function (entry, callback) {
                var successCB = function () {
                    callback();
                };

                if (entry.isFile) {
                    processImage(entry).then(successCB);
                } else if (entry.isDirectory) {
                    processFolder(entry).then(successCB);
                }

            }, function () {
                deferred.resolve(dirEntry);
            });

        }, Log('Unable to read entries of: ' + dirEntry.name));

        return deferred.promise;
    };

    /**
     * Kick start
     * Request access to the file system an then start the scanning process
     * @returns {Deferred} Angular´s $q promise
     */
    this.scanFileSystem = function () {
        var deferred = $q.defer();

        gallery = ImageFactory.getGallery();
        fileSystemSingleton.load(function (fileSystem){
            processFolder(fileSystem.root).then(function () {
                deferred.resolve(gallery);
            });
        }, Log('Unable to get access to the FileSystem'));

        return deferred.promise;
    };

}]);
