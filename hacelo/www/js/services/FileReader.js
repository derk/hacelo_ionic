services.service('FileReader', ['$window', '$q', 'Utils', function($window, $q, Utils){
	this.getFileSystem = function(){
		var defer = $q.defer();
		$window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
			function(fileSystem){ // success get file system
				root = fileSystem.root;
				listDir(root).then(function(e){
					defer.resolve(e);
				});
			}, function(evt){ // error get file system
				console.log("File System Error: "+evt.target.error.code);
			}
		);
		return defer.promise;

	}

	this.hasImage = function(entry){
		var a = new DirManager(),
			b = [],
			comp = [],
			defer = $q.defer(),
			cont = 0,
			response = {name: entry.name,photos : []};
		window.b = [];
		a.list(entry.name+"/", function(e){
			window.e = e;
			if(e.length == 0){
				defer.resolve(response);
			} else {
				angular.forEach(e, function(v){
					if (v.indexOf('png') > -1 || v.indexOf('jpg') > -1 || v.indexOf('jpeg') > -1 ) {
						var c = {url:entry.nativeURL+v}
						response.photos.push(c);
						comp.push(v);

						if(Utils.compareArray(e, comp)){
							defer.resolve(response);
						}
					} else if(v.split(".").length  == 1){
						getImages(entry.nativeURL+v, entry.name+"/"+v).then(function(c){
							response.photos = response.photos.concat(c);
							window.b.push(response);
							comp.push(v);
							if(Utils.compareArray(e, comp)){
								defer.resolve(response);
							}
						});

					} else {
						comp.push(v);
						if(Utils.compareArray(e, comp)){
							defer.resolve(response);
						}
					}
				});
			}
		}, function(){});

		return defer.promise;
	};

	function getImages (path, album) {
		//console.log(album);
		var array = [];
		var defer = $q.defer();
		var cont = 0;
		var a = new DirManager();
		var got = [];

		a.list(album+"/", function(e){
			window.whatsapp = window.whatsapp || [];
			window.whatsapp.push({name: album, files: e});
			if(e.length == 0){
				defer.resolve(array);
			} else {
				angular.forEach(e, function(v, i){
					if (v.indexOf('png') > -1 || v.indexOf('jpg') > -1 || v.indexOf('jpeg') > -1) {
						var c = {url:path + "/" + v};
						array.push(c);
						got.push(v);
						if(Utils.compareArray(e, got)){
							defer.resolve(array);
						}
					} else if(v.split(".").length  == 1){
						getImages(path + "/" + v, album + "/" + v).then(function(e){
							got.push(v);
							array.concat(e);

							if(Utils.compareArray(e, got)){
								defer.resolve(array);
							}
						});
					} else {
						got.push(v);
						if(Utils.compareArray(e, got)){
							defer.resolve(array);
						}
					}
				});
			}

		}, function(){});

		return defer.promise;
	}

	/*
	 hacer un array para guardar los lugares y las cosas, luego posteriormetne ordenarlos y hacer un compare cada vez que el mae entre en un ciclo.
	 */
	function listDir(directoryEntry){
		var defer = $q.defer();
		var array = [];

		//if( !directoryEntry.isDirectory ) console.log('listDir incorrect type');

		currentDir = directoryEntry; // set current directory
		directoryEntry.getParent(function(par){ // success get parent
			/*console.log(par);*/}, function(error){ // error get parent
			console.log('Get parent error: '+error.code);
		});

		var directoryReader = directoryEntry.createReader();
		directoryReader.readEntries(function(entries){
			//console.log(entries);
			for(var i in entries){
				if(entries[i].isDirectory){
					array.push(entries[i])
				}
			}
			//console.log(array);
			defer.resolve(array);
		}, function(error){
			defer.resolve(false);
		});

		return defer.promise;
	}

// ==================================================================================================================================================
// ==================================================================================================================================================


	/**
	 * Helper of processEntries
	 * Remove any folder or file from the given entry list
	 * that we do not want to list
	 * Return the list of remaining folder/files
	 * */
	var removeHiddenStuff = function(list2Clean){
		var clean = [];
		for (var i = list2Clean.length - 1; i >= 0; i--) {
			var valid = !0; // flag that indicate if this entry is valid

			// Start entry validations
			if ( list2Clean[i].name.charAt(0) === '.' ) {valid = !1;}
			if (list2Clean[i].name === 'Android') {valid = !1;}
			// End entry validations

			if(valid) {
				clean.push(list2Clean[i]);
			}
		}
		list2Clean = null; // trash collector help
		return clean;
	};

	/**
	 * Helper of isImage
	 * Add the given image to their respective gallery
	 * First check if the gallery in which this image reside
	 * is already in the gallery list.
	 * If yes add this image to it, if not create a new gallery
	 * and then add the image to it
	 * */
	var addImage2Gallery = function (fileEntry) {
		console.log(fileEntry);
	};

	/**
	 * Helper of processEntries
	 * Check if the given file is an image.
	 * Valid image formant: JPG, JPEG, PNG.
	 * If file pass the check is added to the gallery list
	 * */
	var isImage = function(fileEntry) {
		if ((/\.(?:jpg|jpeg|png)$/i).test(fileEntry.name)) {
			addImage2Gallery(fileEntry);
		}
	};

	/**
	 * Walk through the entry list checking two things:
	 * If is a folder, create a reader and call this function again.
	 * If is a file, call the isImage function
	 * */
	var processEntries = function(entries) {
		entries = removeHiddenStuff(entries);

		for (var i=0; i < entries.length; i++) {
			if (entries[i].isFile) {
				isImage(entries[i]);

			} else if (entries[i].isDirectory) {
				entries[i].createReader().readEntries(processEntries, Log('fail'));
			}
		}
	};

	this.test = function () {
		/**
		 * Kick start
		 * Request access to the file system an then start the scanning process
		 * */
		fileSystemSingleton.load(function(fileSystem){
			fileSystem.root.createReader().readEntries(processEntries, Log('fail'))
		}, Log('fail'));
	};

}]);