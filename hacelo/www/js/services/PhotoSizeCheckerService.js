/**
 * Created by joseph on 24/11/2014.
 */
services.service('PhotoSizeChecker', ['SelectedImagesFactory', function (SelectedImagesFactory) {
    var self = this,
        actualProduct,
        minimumSize,
        imageDimensions;

    var meetsOrientation = function(){
        var expectedOrientation = self.getOrientation(minimumSize.width, minimumSize.height),
            imageOrientation = self.getOrientation(imageDimensions.width, imageDimensions.height);
        return (expectedOrientation === imageOrientation);
    };

    var meetsArea = function(){
        var minimumArea = self.computeArea(minimumSize.width, minimumSize.height),
            imageArea = self.computeArea(imageDimensions.width, imageDimensions.height);

        return (imageArea >= minimumArea);
    };

    this.getExpectedSize = function(){
        return minimumSize.width+"px x "+ minimumSize.height+"px";
    };

    this.computeArea = function(w, h){
        return ( w*h );
    };

    this.getOrientation = function(width, height){
        var orientation = "square";
        if(width > height) {
            orientation = "landscape";
        } else if(width < height) {
            orientation = "portrait";
        }
        return orientation;
    };

    this.meetsMinimumRequirements = function(ImageWrapper){
        // update global variable
        actualProduct = SelectedImagesFactory.getProduct();
        minimumSize  = actualProduct.pixel_size.minimum;
        imageDimensions = ImageWrapper.images.standard_resolution;
        // then decide if the provided image meets the minimum requirements
        return ( meetsArea() );
    };
}]);