models.factory('SelectedImagesFactory', ['$filter', function ($filter) {
    /**
     * A simple service that returns the array of selected images.
     * Also store the selected product with his parent product line
     */
    var selectedImages = [],
        imagesAfterEdited = [],
        productLine = {},
        product = {};

    return {
        addItem: function(pItem) {
            if (angular.isObject(pItem)) {
                angular.copy(pItem, selectedImages);
            }
        },
        getInstagramOnes: function() {
            return $filter('filter')(selectedImages, {origin:"instagram"});
        },
        getToPrintOnes: function() {
            return $filter('filter')(selectedImages, {toPrint:true});
        },
        getAll: function() {
            return selectedImages;
        },
        getOne: function(id){
            return this.getToPrintOnes()[id];
        },
        setProductLine: function(pProductLine){
            productLine = pProductLine;
        },
        getProductLine: function(){
            return productLine;
        },
        setProduct: function(pProduct){
            product = pProduct;
        },
        getProduct: function(){
            return product;
        },
        setImagesAfterEdited: function(pImagesAfterEdited){
            imagesAfterEdited = pImagesAfterEdited;
        },
        getImagesAfterEdited: function(){
            return imagesAfterEdited;
        }
    };
}]);
