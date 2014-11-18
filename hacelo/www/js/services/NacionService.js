services.service('Nacion_Service',['$ionicLoading',function($ionicLoading){
  this.username = '';
  this.instagram_pics = [];
  this.instagram_pics_on_queue = [];
  this.loadMore = '';

  this.show = function(text) {
    $ionicLoading.show({
      template: text
    });
  };
  this.hide = function(){
    $ionicLoading.hide();
  };


  this.alert = function(){
    alert('test');
  };

  this.set_username = function(data){
    this.username = data;
  };

  this.setNextUrl = function(url){
    this.loadMore = url;
  };

  this.getNextUrl = function(){
    return this.loadMore;
  };

  this.createEvent = function(text,data){
        var event;
          if(data !=undefined){
            event = new CustomEvent(text,{'detail':data});
          }else {
            event = new CustomEvent(text);
          }
          document.dispatchEvent(event);
    };
    this.set_entire_ins_pics = function(data){
      this.instagram_pics = data;
    };

    this.get_entire_ins_pics = function(){
      return this.instagram_pics;
    };

    this.set_instagram_pics_on_queue = function(data){
      this.instagram_pics_on_queue = data;
    };

    this.addImageQueue = function (data) {
      var promise = same(this.instagram_pics_on_queue, data);
        if(promise == -1){
          this.instagram_pics_on_queue.push(data);
        } else {
          this.instagram_pics_on_queue.splice(promise, 1);
        }
    };

    this.get_instagram_pics_on_queue = function(){
      return this.instagram_pics_on_queue;
    };

    function same(parent, data) {
        var object = -1;
        for(var el in parent){
             if( JSON.stringify(parent[el]) == JSON.stringify(data) ){
                object = el;
            }
        }
        return object;
    }
}]);