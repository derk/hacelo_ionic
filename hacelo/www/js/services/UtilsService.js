services.service('Utils', ['$q', '$timeout', '$filter', function ($q, $timeout, $filter) {
    /**
     * Converts image URLs to dataURL schema using Javascript only.
     *
     * @param {String} url Location of the image file
     * @param {Function} success Callback function that will handle successful responses. This function should take one parameter
     *                            <code>dataURL</code> which will be a type of <code>String</code>.
     * @param {Function} error Error handler.
     *
     * getImageDataURL('myimage.png', onSuccess, onError);
     *
     */
    this.getImageDataURL = function(url, x, y, obj) {
    
    var defer = $q.defer();
        var data, canvas, ctx;
        var img = new Image();
        var max = 2000;
        img.onload = function(){
            // Create the canvas element.
            canvas = document.createElement('canvas');
            // Get '2d' context and draw the image.
            ctx = canvas.getContext("2d");


            console.log(obj);
            // if (img.width > max || img.height > max) {
              // canvas.width = max;
              // canvas.height = (max * img.height) /img.width;
              // ctx.drawImage(img, 0, 0, max, (max * img.height) /img.width);
            // } else {
            //   canvas.width = img.width;
            //   canvas.height = img.height;
            //   ctx.drawImage(img, 0, 0, img.width, img.height);
            // }

              canvas.width = obj.width;
              canvas.height = (obj.width * img.height) /img.width;
              ctx.drawImage(img, 0, 0, obj.width, (obj.width * img.height) /img.width);

            try{
                // console.log("got it");
                data = canvas.toDataURL();
                window.r = data;
                defer.resolve({data:data, x:x, y:y});
            }catch(e){
                // console.log("broke");
                defer.reject(e);
            }
        }
        // Load image URL.
        try{
            img.src = url;
        }catch(e){
            // console.log("broke this shit");
            defer.reject(e);
        }

    
    return defer.promise;

};


this.create64 = function(url){

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

this.compareArray = function(a, b) {
    var a = a.sort(),
        b = b.sort();
        
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};
}]);
