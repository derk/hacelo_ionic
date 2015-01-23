services.service('Utils', ['$q', '$timeout', function ($q, $timeout) {
    /**
 * Converts image URLs to dataURL schema using Javascript only.
 *
 * @param {String} url Location of the image file
 * @param {Function} success Callback function that will handle successful responses. This function should take one parameter
 *                            <code>dataURL</code> which will be a type of <code>String</code>.
 * @param {Function} error Error handler.
 *
 * @example
 * var onSuccess = function(e){
 *  document.body.appendChild(e.image);
 *  alert(e.data);
 * };
 *
 * var onError = function(e){
 *  alert(e.message);
 * };
 *
 * getImageDataURL('myimage.png', onSuccess, onError);
 *
 */
this.getImageDataURL = function(url, x, y) {
    
    var defer = $q.defer();
        var data, canvas, ctx;
        var img = new Image();
        img.onload = function(){
            // Create the canvas element.
            canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            // Get '2d' context and draw the image.
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            // Get canvas data URL
            try{
                console.log("got it");
                data = canvas.toDataURL();
                defer.resolve({image:img, data:data, x:x, y:y});
            }catch(e){
                console.log("broke");
                defer.reject(e);
            }
        }
        // Load image URL.
        try{
            img.src = url;
        }catch(e){
            console.log("broke this shit");
            defer.reject(e);
        }

    
    return defer.promise;

};

this.shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

}]);
