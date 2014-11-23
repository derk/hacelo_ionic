models.factory('SelectedImagesFactory', ['$filter', function ($filter) {
    /**
     * A simple service that returns the array of selected images.
     */
    var selectedImages = [];
    var category = [];
    var settings = [];

    return {
        setSelectedImages: function(pSelectedImages) {
            if (angular.isArray(pSelectedImages)) {
                selectedImages = pSelectedImages;
            }
        },
        addItem: function(pItem) {
            if (angular.isObject(pItem)) {
                angular.copy(pItem, selectedImages);
            }
        },
        addItems: function(pItems) {
            if (angular.isArray(pItems)) {
                angular.copy(pItems, selectedImages);
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
        },
        setCategory: function(id){
            category = id;
        },
        getCategory: function(){
            return category;
        },
        setSettings: function(id){
            settings = id;
        },
        getSettings: function(){
            return settings;
        }
    };
}]);