models.factory('SelectedImagesFactory', ['$filter', function ($filter) {
    /**
     * A simple service that returns the array of selected images.
     * Also store the selected product with his parent product line
     */
    var selectedImages = [],
        imageGallery = [],
        currentGallery = {},
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
        getByGallery: function(pGallery){
            return $filter('filter')(selectedImages, {gallery: pGallery});
        },
        getPrintItemsCount: function () {
            /**
             * Return how many items the user want to print
             * This is because .length does not return the correct value
             * */
            var aux = this.getToPrintOnes(),
                count = 0;

            for (var i = aux.length - 1; i >= 0; i--) {
                count += aux[i].quantity;
            }

            return count;
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
        setCurrentGallery: function(obj){
            currentGallery = obj;
        },
        getCurrentGallery: function() {
            return currentGallery;
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
