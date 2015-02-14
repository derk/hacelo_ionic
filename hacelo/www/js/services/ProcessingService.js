services.service('Processing', ['$http', '$q', function ($http, $q) {
	
	var url = "https://grooveshark-raiam1234.c9.io/workspace/public/nacion-copy.php";

	/*
	 * create a blob from png 
	 **/
	this.dataURItoBlob = function (dataURI) {
	  var byteString = atob(dataURI.split(',')[1]);
	  var ab = new ArrayBuffer(byteString.length);
	  var ia = new Uint8Array(ab);
	  for (var i = 0; i < byteString.length; i++) {
	    ia[i] = byteString.charCodeAt(i);
	  }
	    return new Blob([ab], { type: 'image/png' });
	};



	/*
	 * Upload images to FTP by sending a blob file
	 **/
	this.upload = function(formData) {
		var defer = $q.defer();
		var cache = {
			cache: false,
			contentType: false,
			processData: false,
			data: formData, 
			error: function(e){defer.reject(e)}, 
			success: function(e){console.log(e);defer.resolve(e)},
			url: url, 
			type: "POST",
			xhr : function () {
		        var xhr = new window.XMLHttpRequest();
		        xhr.upload.addEventListener("progress", function (evt) {
		            if (evt.lengthComputable) {
		                var percentComplete = evt.loaded / evt.total;
		                console.log(percentComplete);
		                defer.notify(percentComplete);
		                if (percentComplete === 1) {
		                    defer.resolve(true);
		                }
		            }
		        }, false);
		        return xhr;
		    }
		};

        $.ajax(cache);

        return defer.promise;
	};


}])