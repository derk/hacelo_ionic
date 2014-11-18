models.factory('SelectedImagesFactory', ['$filter', function ($filter) {
	/**
	 * A simple service that returns the array of selected images.
	 */
	var selectedImages = [];

	return {
		setSelectedImages: function(pSelectedImages) {
			if (angular.isArray(pSelectedImages)) {
				selectedImages = pSelectedImages;
			}
		},
        addItem: function(pItem) {
			if (angular.isObject(pItem)) {
				selectedImages.push(pItem);
			}
		},
		getInstagramOnes: function() {
			return $filter('filter')(selectedImages, {origin:"instagram"});
		},
		getPhoneOnes: function() {
            return $filter('filter')(selectedImages, {origin:"phone"});
        },
        getToPrintOnes: function() {
            return $filter('filter')(selectedImages, {toPrint:true});
        },
        getAll: function() {
            return selectedImages;
        },
        getOne: function(id){
            return selectedImages[id];
        }
	};
}]);