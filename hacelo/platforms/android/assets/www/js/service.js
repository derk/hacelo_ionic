angular.module('starter.service', []).
service('Nacion_Service',['$ionicLoading',function($ionicLoading){
	this.username = '';
	this.instagram_pics = [];
  this.instagram_pics_on_queue = [];

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

    this.get_instagram_pics_on_queue = function(){
      return this.instagram_pics_on_queue;
    };
}]);