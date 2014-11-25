models.factory('SelectedImagesFactory', ['$filter', function ($filter) {
    /**
     * A simple service that returns the array of selected images.
     * Also store the selected product with his parent product line
     */
    var selectedImages = [];
    var category = {};
    var product = {};
    var prints = [];

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
        prepareQuantity: function() {
            angular.forEach(this.getToPrintOnes(), function(value){
                if (!value.hasOwnProperty('quantity')) {value.quantity = 1;}
            }); 
        },
        setPrintPhotos: function(pData) {
            prints = pData;
        },
        getAll: function() {
            return selectedImages;
        },
        getOne: function(id){
            return selectedImages[id];
        },
        setProductLine: function(pCategory){
            category = pCategory;
        },
        getProductLine: function(){
            return category;
        },
        setProduct: function(pProduct){
            product = pProduct;
        },
        getProduct: function(){
            return product;
        }
    };
}]);