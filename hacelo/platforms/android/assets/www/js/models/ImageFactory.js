models.factory('ImageFactory', [function () {
	function Image (URI) {
		this.uri = URI;
		this.base64Encoded;
		this.width;
		this.height;
	}

	Image.prototype.getBase64 = function() {
		// body...
	};

	Image.prototype.mathHeigth = function(newWidth) {
		return newWidth / (width / height);
	};

	Image.prototype.getThumbnail = function(expectedWidth) {
		// body...
	};

	return Image;
}])