models.factory('SelectedImagesFactory', ['$filter', function ($filter) {
    /**
     * A simple service that returns the array of selected images.
     * Also store the selected product with his parent product line
     */
    var selectedImages = [],
        imageGallery = [],
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
        clearAndAdd : function(items){
            var notPrint = $filter('filter')(selectedImages, {toPrint:false});; 
            var print = notPrint.concat(items);
            selectedImages = print;
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
        setGallery: function(gallery){
            imageGallery = gallery;
        },
        getGallery: function(){
            return imageGallery;
        },
        getProduct: function(){
            return product;
        },
        clearImages: function () {
            selectedImages = null; // helping garbage collector
            selectedImages = [];
        },
        clearSelection: function () {
            this.clearImages();
            productLine = {};
            product = {};
        }
    };
}]);
