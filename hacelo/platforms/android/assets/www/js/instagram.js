    /*
     *
     * Instagram class for getting entire things
     *
     */

      
     'use-strict';

    window.messages ={
      "EMPTY":"No hay iamgenes la cuenta!",
      "NO_EXIST":"El usuario no existe!",
      "FILL":"Por favor, llenar los campos!"
     }
    /*
     * Instagram constructor
     */
    window.Instagram = function(){

      this.user_url = "https://api.instagram.com/v1/users/";
      this.client_id = "70a2ae9262fc4805a5571e8036695a4d";
      this.redirect_uri="http://www.wikipedia.org/";
      this.scope = "likes+comments";
      this.url = "https://api.instagram.com/oauth/authorize/?client_id="+this.client_id+"&redirect_uri="+this.redirect_uri+"&response_type=code&scope="+this.scope;
      this.access_token = "";
      this.user_id = "";
      this.img = "";
      this.tab = {};
      this.img_template = {"images":[]};
      this.canvas_width = $(window).width()-20;
      this.array_angular = [];
      this.current_hosted_service = "http://www.luisrojascr.com/lab/test/nacion_instagram.php";
      this.code = '';

    };

    /*
     *
     * Instagram prototypal inheritance.
     *
     */
      window.Instagram.prototype = {

      init : function(){
        //this.tab = window.open(encodeURI(this.url), '_blank', 'location=yes,clearcache=no');
        this.tab = window.open(encodeURI(this.url), '_blank', 'location=yes');
        this.bind_events();
      },

      bind_events : function(){
        var self = this;
        this.tab.addEventListener('loadstop', function(e){
          var el = e.url.split("code=");
          var error = e.url.split('error=');
          console.log(el);
          console.log(error);
          if(typeof error[1] != "undefined"){
            console.log('aca');
            self.error_callback();
          } else {
            if(typeof el[1] != "undefined"){
              console.log('allaa');
              self.code = el[1];
              self.found_access_code(el);
            }
            
          }
          
        });
      },

      fetch : function(url, data, callback){
        var self = this;
        $.ajax({
          url: url,
          type: 'GET',
          data:data,
          crossDomain: true,
          dataType: 'jsonp',
          jsonpCallback:'callback',
          success: function(e) { callback(e, self); },
          error: function(jqXHR, textStatus, errorThrown ) { console.debug(jqXHR);console.debug(errorThrown); }
        });
      },

      insert_images : function(response , self){
        console.debug(response);
        $('.images-hidden *').remove();
        setTimeout(function(){
          if(response.data.length<=0){
            hacelo.alert(messages["EMPTY"]);
            createEvent('_EMPTY');
          } else {
              var array = new Array(), 
              obj = new Object(),
              img = '',
              counter = 0,
              count = '',
              img_encode = null;

              for(var els = 0;els<response.data.length;els++){
                  obj = {"url":response.data[els].images.standard_resolution};
                  array.push(obj);
                  img+="<img class='img_test' src='"+response.data[els].images.standard_resolution.url+"' id='image_id_"+counter+"'/>"         
                  counter++;
              }
              self.img_template["images"] = array;
              $(img).appendTo(".images-hidden");

              setTimeout(function(){
                count = $(".img_test").length;
                img_encode = $(".img_test");
                for(var x = 0; x < count;x++){
                  console.debug(img_encode[x].id);
                  console.log(self.convert_img_to_encode(img_encode[x].id));
                  self.array_angular.push(self.convert_img_to_encode(img_encode[x].id));
                }
                self.createEvent('finish',self.array_angular);
              },400);
          }
        },100);
      },

      get_user_id : function(data, scope){
        console.log('----------------');
        console.log(data);
        if(data.data <= 0){
          hacelo.alert(messages['NO_EXIST']);
        } else {
          var self = scope; 
          self.user_id = data.user.id;
          self.access_token = data.access_token;
          self.fetch("https://api.instagram.com/v1/users/"+self.user_id+"/media/recent",'access_token='+self.access_token,self.insert_images);
        }
        
      },

      found_access_code : function(data){
          if(data.length == 2){
            this.tab.close();
            this.fetch_post(this.current_hosted_service,this.code,this.get_user_id);
            //this.fetch('https://api.instagram.com/v1/users/search',"q="+this.username+"&access_token="+this.access_token,this.get_user_id);
          }
      },

      error_callback : function(){
        this.tab.close();
      },
      
      fetch_post : function(url, data, callback){
        var self = this;
        $.post( url, { code: data })
        .done(function( data ) {
          callback(data,self);
        });
      },


      convert_img_to_encode : function(id){
        var img = document.getElementById(id);
        var canvas = document.createElement("canvas");
        var height, width, ratio;
        width = img.width;
        height = img.height;
        ratio = width/height;
        ratio = this.canvas_width/ratio;
        canvas.width = this.canvas_width;
        canvas.height = ratio;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0,this.canvas_width,ratio);
        $(canvas).appendTo(".images-hidden");
        window.dataURL = canvas.toDataURL("image/png");
        $('<img src="'+window.dataURL+'"/>').appendTo(".images-hidden");
        return window.dataURL;
      },

      createEvent : function(text,data){
        var event;
          if(data !=undefined){
            event = new CustomEvent(text,{'detail':data});
          }else {
            event = new CustomEvent(text);
          }
          document.dispatchEvent(event);
      }

    };

    
    window.Instagram = window.Instagram || {};
