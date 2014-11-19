angular.module('hacelo', [
    'ionic',
    'hacelo.config',
    'hacelo.models',
    'hacelo.controllers',
    'hacelo.providers',
    'hacelo.services'
])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the 
        // accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/index.html",
        controller: 'AppCtrl'
    })
    .state('app.landing', {
        url: "/landing",
        views: {
            'haceloContent': {
                templateUrl: "templates/landing.html"
            }
        }
    })
    .state('app.products', {
        url: "/products",
        views: {
            'haceloContent': {
                templateUrl: "templates/product.html",
                controller: "productCrtl"
            }
        }
    })
    .state('app.category', {
        url: "/category",
        views: {
            'haceloContent': {
                templateUrl: "templates/category.html",
                controller: "categoryCrtl"
            }
        }
    })
    .state('app.info', {
        url: "/info",
        views: {
            'haceloContent': {
                templateUrl: "templates/info.html",
                controller: "infoCtrl"
            }
        }
    })
    .state('app.photo', {
        url: "/photo",
        views: {
            'haceloContent': {
                templateUrl: "templates/photo.html",
                controller: "photoCrtl"
            }
        }
    })
    .state('app.choose', {
        url: "/choose",
        views: {
            'haceloContent': {
                templateUrl: "templates/choose.html",
                controller: 'PhotoSourceCtrl'
            }
        }
    })
    .state('app.check', {
        url: "/check",
        views: {
            'haceloContent': {
                templateUrl: "templates/check-photo.html",
                controller: 'checkCtrl'
            }
        }
    })
    .state('app.confirm', {
        url: "/confirm",
        views: {
            'haceloContent': {
                templateUrl: "templates/confirm.html"
            }
        }
    })
    .state('app.added', {
        url: "/added",
        views: {
            'haceloContent': {
                templateUrl: "templates/added-cart.html",
                controller: 'addedCartCtrl'
            }
        }
    })
    .state('app.cart', {
        url: "/cart",
        views: {
            'haceloContent': {
                templateUrl: "templates/cart.html",
                controller: 'cartCtrl'
            }
        }
    })
    .state('app.cart-checkout', {
        url: "/cart-checkout",
        views: {
            'haceloContent': {
                templateUrl: "templates/cart-checkout.html",
                controller: 'cartCheckoutCtrl'
            }
        }
    })
    .state('app.cart-empty', {
        url: "/cart-empty",
        views: {
            'haceloContent': {
                templateUrl: "templates/cart-empty.html"
            }
        }
    })
    .state('app.payment', {
        url: "/payment",
        views: {
            'haceloContent': {
                templateUrl: "templates/payment.html"
            }
        }
    })
    .state('app.confirm-order', {
        url: "/confirm-order",
        views: {
            'haceloContent': {
                templateUrl: "templates/confirm-order.html"
            }
        }
    })
    .state('app.processing-order', {
        url: "/processing-order",
        views: {
            'haceloContent': {
                templateUrl: "templates/processing-order.html"
            }
        }
    })
    .state('app.order-sent', {
        url: "/order-sent",
        views: {
            'haceloContent': {
                templateUrl: "templates/order-sent.html"
            }
        }
    })
    .state('app.show-love', {
        url: "/show-love",
        views: {
            'haceloContent': {
                templateUrl: "templates/show-love.html"
            }
        }
    })
    .state('app.photobook', {
        url: "/photobook",
        views: {
            'haceloContent': {
                templateUrl: "templates/photobook.html"
            }
        }
    })
    .state('app.share', {
        url: "/share",
        views: {
            'haceloContent': {
                templateUrl: "templates/share.html",
                controller: 'ShareCtrl'
            }
        }
    })
    .state('app.instagram', {
        url: "/instagram",
        views: {
            'haceloContent': {
                templateUrl: "templates/instagram.html",
                controller: 'InstagramCrtl'
            }
        }
    })
    .state('app.congrats', {
        url: "/congrats",
        views: {
            'haceloContent': {
                templateUrl: "templates/congrats.html",
                controller: 'congratsCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/landing');
    // Here we tel to angular that images with `content://` protocol are safe to load
    // more info at: http://goo.gl/8PfN8I
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);    
});
    /*
     * Instagram class for getting entire things
     */
    window.messages = {
        "EMPTY": "No hay iamgenes la cuenta!",
        "NO_EXIST": "El usuario no existe!",
        "FILL": "Por favor, llenar los campos!"
    }
    /*
     * Instagram constructor
     */
    var Instagram = function() {

        this.user_url = "https://api.instagram.com/v1/users/";
        this.client_id = "70a2ae9262fc4805a5571e8036695a4d";
        this.redirect_uri = "http://www.wikipedia.org/";
        this.scope = "likes+comments";
        this.url = "https://api.instagram.com/oauth/authorize/?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_uri + "&response_type=code&scope=" + this.scope;
        this.access_token = "";
        this.user_id = "";
        this.img = "";
        this.tab = {};
        this.img_template = {
            "images": []
        };
        this.canvas_width = $(window).width() - 20;
        this.array_angular = [];
        this.current_hosted_service = "http://www.luisrojascr.com/lab/test/nacion_instagram.php";
        this.code = '';

    };

    /*
     *
     * Instagram prototypal inheritance.
     *
     */
    Instagram.prototype = {

        init: function() {
            //this.tab = w.open(encodeURI(this.url), '_blank', 'location=yes,clearcache=no');
            this.tab = window.open(encodeURI(this.url), '_blank', 'location=yes');
            this.bind_events();
        },

        bind_events: function() {
            var self = this;
            this.tab.addEventListener('loadstart', function(e) {
                var el = e.url.split("code=");
                var error = e.url.split('error=');
                console.log(el);
                console.log(error);
                if (typeof error[1] != "undefined") {
                    self.error_callback();
                } else {
                    if (typeof el[1] != "undefined") {
                        self.code = el[1];
                        self.found_access_code(el);
                    }

                }

            });
        },

        fetch: function(url, data, callback) {
            var self = this;
            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                crossDomain: true,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function(e) {
                    console.log(e);
                    callback(e, self);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.debug(jqXHR);
                    console.debug(errorThrown);
                }
            });
        },

        fetch_new_page: function(url,callback) {
            var self = this;
            $.ajax({
                url: url,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function(e) {
                    console.log(e);
                    callback(e, self);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.debug(jqXHR);
                    console.debug(errorThrown);
                }
            });
        },

        insert_images: function(response, self) {
            var pag = null;
            console.debug(response);
            $('.images-hidden *').remove();
            setTimeout(function() {
                if (response.data.length <= 0) {
                    hacelo.alert(messages["EMPTY"]);
                    createEvent('_EMPTY');
                } else {
                    var array = new Array(),
                        obj = new Object(),
                        img = '',
                        counter = 0,
                        count = '',
                        img_encode = null;

                    for (var els = 0; els < response.data.length; els++) {
                        //obj = {
                            //"url": response.data[els].images.standard_resolution
                        //};
                        array.push(response.data[els].images.standard_resolution);
                        //img += "<img class='img_test' src='" + response.data[els].images.standard_resolution.url + "' id='image_id_" + counter + "'/>"
                        counter++;
                    }


                    self.img_template["images"] = array;

                    if(response.pagination){
                       self.createEvent('pagination', response.pagination.next_url)
                    }

                    self.createEvent('finish', array);

                    
                    // setTimeout(function() {
                    //     count = $(".img_test").length;
                    //     img_encode = $(".img_test");
                    //     for (var x = 0; x < count; x++) {
                    //         console.debug(img_encode[x].id);
                    //         console.log(self.convert_img_to_encode(img_encode[x].id));
                    //         self.array_angular.push(self.convert_img_to_encode(img_encode[x].id));
                    //     }
                    //     self.createEvent('finish', self.array_angular);
                    // }, 400);
                }
            }, 100);
        },

        get_user_id: function(data, scope) {
            if (data.data <= 0) {
                hacelo.alert(messages['NO_EXIST']);
            } else {
                var self = scope;
                self.user_id = data.user.id;
                self.access_token = data.access_token;
                self.fetch("https://api.instagram.com/v1/users/" + self.user_id + "/media/recent", 'access_token=' + self.access_token, self.insert_images);
            }

        },

        loadMore: function(url){
            this.fetch_new_page(url, this.insert_images);
        },

        found_access_code: function(data) {
            if (data.length == 2) {
                this.tab.close();
                this.fetch_post(this.current_hosted_service, this.code, this.get_user_id);
                //this.fetch('https://api.instagram.com/v1/users/search',"q="+this.username+"&access_token="+this.access_token,this.get_user_id);
            }
        },

        error_callback: function() {
            this.tab.close();
        },

        fetch_post: function(url, data, callback) {
            var self = this;
            $.post(url, {
                code: data
            })
                .done(function(data) {
                    callback(data, self);
                });
        },


        convert_img_to_encode: function(id) {
            var img = document.getElementById(id);
            var canvas = document.createElement("canvas");
            var height, width, ratio;
            width = img.width;
            height = img.height;
            ratio = width / height;
            ratio = this.canvas_width / ratio;
            canvas.width = this.canvas_width;
            canvas.height = ratio;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, this.canvas_width, ratio);
            $(canvas).appendTo(".images-hidden");
            window.dataURL = canvas.toDataURL("image/png");
            $('<img src="' + window.dataURL + '"/>').appendTo(".images-hidden");
            return window.dataURL;
        },

        createEvent: function(text, data) {
            var event;
            if (data != undefined) {
                event = new CustomEvent(text, {
                    'detail': data
                });
            } else {
                event = new CustomEvent(text);
            }
            document.dispatchEvent(event);
        }

    };
 (function(){

 	window.hacelo = window.hacelo || {};
 	window.hacelo = {
 		alert : function(string){
 			alert(string);
 		},

 		messages :{
 			"Loading":"<span>Cargando...</span><i class='icon ion-looping'></i>"
 		}
 	};

 })();
var commons = angular.module('hacelo.config', []);
var controllers = angular.module('hacelo.controllers', []);
var models = angular.module('hacelo.models', []);
var providers = angular.module('hacelo.providers', []);
var services = angular.module('hacelo.services', []);
commons.constant('PhotoPrintConfig', {
	"products": {
		// here we hold the information related to every single product
		// `photo`, `photo_album` and `poster` will have similar structure
		"Fotografias": {
			"printing_sizes": [
				{	"name" : "4x6",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 4,
						"height": 6
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 500,
							"height": 700,
						},
						"minimum": {
							"width": 300,
							"height": 450,		
							"aspect": 0.5
						},
					},
					"prices": {
						"first_items": {
							"quantity": 21,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 4999
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{	"name" : "5x7",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 5,
						"height": 7
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 500,
							"height": 700,
						},
						"minimum": {
							"width": 375,
							"height": 525,	
							"aspect": 0.5		
						},
					},
					"prices": {
						"first_items": {
							"quantity": 16,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 5499
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{	"name" : "8x10",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 8,
						"height": 10
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 500,
							"height": 700,
						},
						"minimum": {
							"width": 600,
							"height": 750,		
							"aspect": 0.5	
						},
					},
					"prices": {
						"first_items": {
							"quantity": 6,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 6499
						},
						"additional": {
							"price": 1000
						}
					}
				}
			],
			"coupons": [
				{
					// showed in the UI for visual feedback
					"name": "My discount code",
					// will match what the user entered
					"code": "1234_5678_9012_3456"
				},
			]
		},

		"Cuadradas": {
			"printing_sizes": [
				{	
					"name":"4x4",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 4,
						"height": 4
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 300,
							"height": 500,
						},
						"minimum": {
							"width": 300,
							"height": 300,	
							"aspect": 1		
						},
					},
					"prices": {
						"first_items": {
							"quantity": 35,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 4999
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{
					"name":"8x8",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 8,
						"height": 8
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 600,
							"height": 600,
						},
						"minimum": {
							"width": 600,
							"height": 600,		
							"aspect": 1	
						},
					},
					"prices": {
						"first_items": {
							"quantity": 6,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 5999
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{
					"name":"10x10",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 10,
						"height": 190
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 600,
							"height": 600,
						},
						"minimum": {
							"width": 750,
							"height": 750,	
							"aspect": 1		
						},
					},
					"prices": {
						"first_items": {
							"quantity": 4,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 6999
						},
						"additional": {
							"price": 1000
						}
					}
				}
			],
			"coupons": [
				{
					// showed in the UI for visual feedback
					"name": "My discount code",
					// will match what the user entered
					"code": "1234_5678_9012_3456"
				},
			]
		},

		"Photobook": {
			"printing_sizes": [
				{	
					"name":"8.5x11",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 8.5,
						"height": 11
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 300,
							"height": 500,
						},
						"minimum": {
							"width": 637,
							"height": 825,	
							"aspect": 0.5

						},
					},
					"prices": {
						"first_items": {
							"quantity": 38,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 17499
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{
					"name":"12x9",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 12,
						"height": 9
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 600,
							"height": 600,
						},
						"minimum": {
							"width": 900,
							"height": 675,	
							"aspect": 1.5		
						},
					},
					"prices": {
						"first_items": {
							"quantity": 38,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 19999
						},
						"additional": {
							"price": 1000
						}
					}
				},
			],
			"coupons": [
				{
					// showed in the UI for visual feedback
					"name": "My discount code",
					// will match what the user entered
					"code": "1234_5678_9012_3456"
				},
			]
		},

		"Marco de Madera": {
			"printing_sizes": [
				{	
					"name":"4x4",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 4,
						"height": 4
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 300,
							"height": 500,
						},
						"minimum": {
							"width": 300,
							"height": 300,	
							"aspect": 1		
						},
					},
					"prices": {
						"first_items": {
							"quantity": 1,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 14999
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{
					"name":"8x8",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 8,
						"height": 8
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 600,
							"height": 600,
						},
						"minimum": {
							"width": 600,
							"height": 600,
							"aspect": 1			
						},
					},
					"prices": {
						"first_items": {
							"quantity": 1,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 19999
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{
					"name":"11x17",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 11,
						"height": 17
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 600,
							"height": 600,
						},
						"minimum": {
							"width": 825,
							"height": 1275,
							"aspect": 0.5		
						},
					},
					"prices": {
						"first_items": {
							"quantity": 1,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 31999
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{
					"name":"14x20",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 14,
						"height": 20
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 600,
							"height": 600,
						},
						"minimum": {
							"width": 1050,
							"height": 1500,
							"aspect": 0.5		
						},
					},
					"prices": {
						"first_items": {
							"quantity": 1,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 38999
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{
					"name":"20x29",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 20,
						"height": 29
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 600,
							"height": 600,
						},
						"minimum": {
							"width": 1500,
							"height": 2175,
							"aspect": 0.5		
						},
					},
					"prices": {
						"first_items": {
							"quantity": 1,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 58999
						},
						"additional": {
							"price": 1000
						}
					}
				},
			],
			"coupons": [
				{
					// showed in the UI for visual feedback
					"name": "My discount code",
					// will match what the user entered
					"code": "1234_5678_9012_3456"
				},
			]
		},

		"Photostrips": {
			"printing_sizes": [
				{	
					"name":"4.25x17.78",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 4.25,
						"height": 17.78
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 300,
							"height": 500,
						},
						"minimum": {
							"width": 333,
							"height": 1333,	
							"aspect": 0.5		
						}
					},
					"prices": {
						"first_items": {
							"quantity": 12,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 4999
						},
						"additional": {
							"price": 1000
						}
					}
				}
			],
			"coupons": [
				{
					// showed in the UI for visual feedback
					"name": "My discount code",
					// will match what the user entered
					"code": "1234_5678_9012_3456"
				},
			]
		},
		
		"Poster": {
			"printing_sizes": [
				{
					"name":"20.1x29.1",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 20.1,
						"height": 29.1
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 1800,
							"height": 1100,
						},
						"minimum": {
							"width": 1507,
							"height": 2182,	
							"aspect": 0.5			
						}
					},
					"prices": {
						"first_items": {
							"quantity": 1,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 12999
						},
						"additional": {
							"price": 1575
						}
					}
				},
				
			],
			"coupons": [
				{
					// showed in the UI for visual feedback
					"name": "My discount code",
					// will match what the user entered
					"code": "1234_5678_9012_3456"
				},
			]
		},

		"Gran Formato": {
			"printing_sizes": [
				{
					"name":"11x17",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 11,
						"height": 17
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 1800,
							"height": 1100,
						},
						"minimum": {
							"width": 825,
							"height": 1275,	
							"aspect": 0.5			
						}
					},
					"prices": {
						"first_items": {
							"quantity": 2,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 12999
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{
					"name":"14x20",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 14,
						"height": 20
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 1050,
							"height": 1500,
						},
						"minimum": {
							"width": 1050,
							"height": 1500,	
							"aspect": 0.5		
						}
					},
					"prices": {
						"first_items": {
							"quantity": 2,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 13999
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{
					"name":"20.1 x 29.1",
					"real_size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 20.1,
						"height": 29.1
					},
					"pixel_size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 1050,
							"height": 1500,
						},
						"minimum": {
							"width": 1507,
							"height": 2181,	
							"aspect": 0.5		
						}
					},
					"prices": {
						"first_items": {
							"quantity": 1,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 14999
						},
						"additional": {
							"price": 1000
						}
					}
				}
				
			],
			"coupons": [
				{
					// showed in the UI for visual feedback
					"name": "My discount code",
					// will match what the user entered
					"code": "1234_5678_9012_3456"
				},
			]
		}
	}
});
controllers.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, Nacion_Service) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.user = {
        "instagra_username": "Raiam"
    };
    $scope.validate = false;

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    $scope.insert_url = function() {
        if ($scope.validate == false) {
            $scope.validate = true;
            Nacion_Service.set_username($scope.user.instagra_username);
            $timeout(function() {
                $scope.closeLogin();
                Nacion_Service.createEvent('update-username', $scope.user.instagra_username);
            }, 1000);
        }

    };
    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
});
/* ChooseCrtl para controlar la pantalla de escoger
 * $scope - Scope de la pantalla
 * Nacion_Service - Servicio de datos de nacion, service.js
 */
controllers.controller('checkCtrl', function($scope,$ionicPopup, $timeout, SelectedImagesFactory, Nacion_Service, Market) {
    //Variables for using on the app
    //$scope.images = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp_xyq9C4GVc79lShg4Uo5gTZoBPdimQEHQKHn6cjibxe69Im-A','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp_xyq9C4GVc79lShg4Uo5gTZoBPdimQEHQKHn6cjibxe69Im-A'];
    $scope.images = SelectedImagesFactory.getToPrintOnes();
    $scope.dkrm;

    angular.forEach($scope.images, function(value) {
      value.quantity = 1;
    });

    $scope.crop = function ($index) {
        $scope.showPopup($index);
    };

    $scope.showPopup = function($index) {
      $scope.data = {}
      $scope.img = $scope.images[$index].images.low_resolution;

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: ' <img id="cropArea" src="{{img.url}}" width="{{img.width}}" alt="$index">',
        title: 'Cortar la Fotografía',
        subTitle: 'Selecciona el area a cortar',
        scope: $scope,
        buttons: [
          { 
            text: 'Cancelar'
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
                $scope.images[$index].images.low_resolution.url = $scope.dkrm.snapshotImage();
                myPopup.close();
            }
          },
        ]
      });

      $timeout(function(){
        $scope.executeCrop();
      },100);
     };



     $scope.executeCrop = function () {
        $scope.dkrm = new Darkroom('#cropArea', {
          minWidth: 100,
          minHeight: 100,
          maxWidth: 650,
          maxHeight: 500,

          plugins: {
            crop: {
              quickCropKey: 67
            }
          },

          init: function() {
            var cropPlugin = this.getPlugin('crop');
            cropPlugin.selectZone(170, 25, 300, 300);
          }
        });
     };

     $scope.addToCart = function () {
        Market.insertMarket($scope.images);
     };


});
/* ChooseCrtl para controlar la pantalla de escoger
 * $scope - Scope de la pantalla
 * Nacion_Service - Servicio de datos de nacion, service.js
 */
controllers.controller('chooseCtrl', function($scope, Nacion_Service) {
    //Variables for using on the app
    $scope.username = '';
    $scope.instagram_pics = Nacion_Service.get_entire_ins_pics();
    $scope.all_pics_for_print = Nacion_Service.get_instagram_pics_on_queue();

    //Function for init the isntagram
    $scope.init_instagram = function(username) {
        var instagram_v = new Instagram(username);
        instagram_v.init();
    };

    //Open the new window with the correct url for using
    $scope.call_popup = function() {
        if (Nacion_Service.get_entire_ins_pics().length <= 0) {
            var instagram_v = new Instagram();
            instagram_v.init();
            //$scope.modal.show();
        } else {
            Nacion_Service.show(hacelo.messages.Loading);
            setTimeout(function() {
                window.location.href = '#/app/instagram';
            }, 500);

        }
    };

    //Document listener for when updating username
    document.addEventListener('update-username', function(e) {
        $scope.username = e.detail;
        $scope.init_instagram($scope.username);
    });
    document.addEventListener('pagination', function(e) {
        Nacion_Service.setNextUrl(e.detail);
    });
    //Listener when the page just got the code and the images as well.
    document.addEventListener('finish', function(e) {
        //Open the loading popup
        Nacion_Service.show(hacelo.messages.Loading);
        //little timeout to ensure the pop up to appear
        setTimeout(function() {
            $scope.instagram_pics = e.detail;
            var array = [];
            for (var el = 0; el < $scope.instagram_pics.length; el++) {
                var obj = {
                    "img": $scope.instagram_pics[el],
                    "picked": false
                };
                array.push(obj);
            }
            $scope.instagram_pics = array;
            Nacion_Service.set_entire_ins_pics($scope.instagram_pics);
            $scope.$apply();
            if ($scope.instagram_pics.length > 0) {
                window.location.hash = "#/app/instagram";
            };
        }, 100);

    });
});
/* InfoCtrl Accordion List
 * $scope - Scope de la pantalla
 */

controllers.controller('infoCtrl', function($scope) {

	$scope.toggleGroup = function(group){
		if($scope.isGroupShown(group)){
			$scope.shownGroup = null;
		}else{ 
			$scope.shownGroup = group;	
		}
	};

	$scope.isGroupShown = function(group){
		return $scope.shownGroup === group;
	};

});
/* Instagram para controlar la pantalla de isntagram
 * $scope - Scope de la pantalla
 * Nacion_Service - Servicio de datos de nacion, service.js
 */
controllers.controller('InstagramCrtl', function($scope, Nacion_Service) {
    $scope.instagram_pics = Nacion_Service.get_entire_ins_pics();
    $scope.picked_pics = Nacion_Service.get_instagram_pics_on_queue();
    $scope.load_more = Nacion_Service.getNextUrl();
    Nacion_Service.hide();
    console.log($scope.load_more);

    $scope.pick_song = function(index, data) {
        if ($scope.instagram_pics[index].picked) {
            $scope.instagram_pics[index].picked = false;
            var index = $scope.picked_pics.indexOf(data);
            $scope.picked_pics.splice(index, 1);
        } else {
            $scope.instagram_pics[index].picked = true;
            $scope.picked_pics.push(data);
        }
    };

    $scope.insert_into_queue = function() {
        Nacion_Service.set_instagram_pics_on_queue($scope.picked_pics);
        window.picked = $scope.picked_pics;
        window.history.back();
    };

    $scope.loadMore = function(){
        var instagram_v = new Instagram();
            instagram_v.loadMore($scope.load_more);
    };

    document.addEventListener('finish', function(e) {
        //Open the loading popup
        Nacion_Service.show(hacelo.messages.Loading);
        //little timeout to ensure the pop up to appear
        setTimeout(function() {
            var nextPage = e.detail;
            var array = [];
            for (var el = 0; el < nextPage.length; el++) {
                var obj = {
                    "img": nextPage[el],
                    "picked": false
                };
                array.push(obj);
            }
            $scope.instagram_pics = $scope.instagram_pics.concat(array);
            console.debug(array);
            Nacion_Service.set_entire_ins_pics($scope.instagram_pics);
            Nacion_Service.hide();

            Nacion_Service.setNextUrl('');
            $scope.load_more = Nacion_Service.getNextUrl();
        }, 100);

    });

    document.addEventListener('pagination', function(e) {
        Nacion_Service.setNextUrl(e.detail);
        $scope.load_more = Nacion_Service.getNextUrl();
    });
});
controllers.controller('PhotoSourceCtrl', ['$scope', '$filter', '$ionicPopup', '$ionicLoading', 'SelectedImagesFactory', 'MessageService', 'InstagramService', 'CordovaCameraService', 'ImageFactory','Nacion_Service', function ($scope, $filter, $ionicPopup, $ionicLoading, SelectedImagesFactory, MessageService, InstagramService, CordovaCameraService, ImageFactory, Nacion_Service) {
    var lastInstagramLoad;

    $scope.loading = false;
    $scope.imageStack = [];
    $scope.$watch('loading', function(newVal, oldVal) {// for showing and hiding load spinner
        var cache = angular.isDefined(cache)? cache: MessageService.search("loading");
        if (newVal !== oldVal) {
            if (newVal === true) {
                $ionicLoading.show(cache);
            } else {
                $ionicLoading.hide();
            }
        }
    });
    $scope.$watch('imageStack', function(newVal, oldVal) {// to keep updated the Service
        SelectedImagesFactory.setSelectedImages($scope.imageStack);
    }, true);


    function extractInstagramImages (apiResponse) {
        lastInstagramLoad = apiResponse;
        var filteredResponse = $filter('filter')(apiResponse.data, {type:"image"}),
            j = filteredResponse.length;

        if (j === 0) {
            $ionicPopup.alert(MessageService.search("no-images-found"));
        } else {
            for (var i = 0; i < j; i++) {
                $scope.imageStack.push(new ImageFactory(filteredResponse[i].images));
            }
        }
    }


    function getRecentMedia (){
        $scope.loading = true;
        InstagramService.getRecentMedia()
            .then(function(response) {
                $scope.loading = false;
                if (response.data.meta.code === 400) { // check if token is expired
                    authenticateInstagramUser();
                } else {
                    extractInstagramImages(response.data);
                }
            }, function(err) {
                $scope.loading = false;
                $ionicPopup.alert(MessageService.search("cannot-load-media"));
            });
    }

    function authenticateInstagramUser (){
        InstagramService.auth()
            .then(function(result) {
                getRecentMedia();
            }, function(err) {
                $ionicPopup.alert(MessageService.search("user-denied-access"));
            });
    }

    $scope.instagramImageLoad = function() {
        if (InstagramService.isAuthenticated()){
            getRecentMedia();
        } else {
            authenticateInstagramUser();
        }
    };

    $scope.phoneImageLoad = function() {
        CordovaCameraService.getImage()
            .then(function(result) {
                $scope.imageStack.push(new ImageFactory(result));
            }, function(result) {
                // $ionicPopup.alert(MessageService.search("cordova-load-failed"));
            });
    };

    $scope.logArray = function(){
        console.log($scope.imageStack);
    };

    InstagramService.getRecientTagMedia().then(function(response){
        extractInstagramImages(response.data);
    },function(err){});
}]);
/* InfoCtrl Accordion List
 * $scope - Scope de la pantalla
 */

controllers.controller('productCrtl', function($scope, SelectedImagesFactory, PhotoPrintConfig) {

	$scope.saveOption = function(option) {
		if(PhotoPrintConfig.products.hasOwnProperty(option)){
			SelectedImagesFactory.setCategory(PhotoPrintConfig.products[option]);
		}
	};
});

controllers.controller('categoryCrtl', function($scope, SelectedImagesFactory, PhotoPrintConfig) {
	$scope.options = SelectedImagesFactory.getCategory();

	$scope.pickCategory = function(model) {
		SelectedImagesFactory.setSettings(model);
	};
});

controllers.controller('photoCrtl', function($scope, SelectedImagesFactory, PhotoPrintConfig) {
	$scope.settings = SelectedImagesFactory.getSettings();
});
controllers.controller('ShareCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, Nacion_Service) {
    
    $scope.shareFb = function(){
        window.plugins.socialsharing.shareViaFacebook('http://www.hacelodigital.com/')
    };

    $scope.shareTwitter = function(){
        window.plugins.socialsharing.shareViaTwitter('http://www.hacelodigital.com/')
    };

    $scope.shareEmail = function(){
        window.plugins.socialsharing.shareViaEmail('Hacelo','Hacelo');
    };
});
models.factory('ImageFactory', [function () {
    function ImageWrapper (source) {
        var self = this;
        this.origin = "phone";
        this.images;
        this.toPrint = false;

        if (angular.isObject(source)) {
            this.origin = "instagram";
            this.images = source;
        } else if (angular.isString(source)) {
            this.images = {
                "low_resolution": {
                    "url": source,
                    "width": 306,
                    "height": 306
                },
                "thumbnail": {
                    "url": source,
                    "width": 150,
                    "height": 150
                },
                "standard_resolution": {
                    "url": source,
                    "width": 640,
                    "height": 640
                }
            }
        }
    }

    return ImageWrapper;
}])
models.factory('Market', ['$filter', function ($filter) {
	/**
	 * A simple service that returns the array of selected images.
	 */
     var model = {
        "shop_item":{

        }
     };

	return {
		
        insertMarket : function(model) {
            console.log(model);
        }

	};
}]);
models.factory('SelectedImagesFactory', ['$filter', function ($filter) {
	/**
	 * A simple service that returns the array of selected images.
	 */
	var selectedImages = [];
	var category = [];
	var settings = [];

	return {
		setSelectedImages: function(pSelectedImages) {
			if (angular.isArray(pSelectedImages)) {
				selectedImages = pSelectedImages;
			}
		},
        addItem: function(pItem) {
			if (angular.isObject(pItem)) {
				selectedImages.push(pItem);
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
        getAll: function() {
            return selectedImages;
        },
        getOne: function(id){
            return selectedImages[id];
        },
        setCategory: function(id){
        	category = id;
        },
        getCategory: function(){
        	return category;
        },
        setSettings: function(id){
        	settings = id;
        },
        getSettings: function(){
        	return settings;
        }
	};
}]);
models.factory('StorageFactory', ['$window', function ($window) {
	var storage = $window.localStorage;
	var prefix = "hclDgtl";

	this.setPrefix = function(newPrefix) {
		prefix = newPrefix;
	};

	var save = function(newJson) {
		return storage.setItem(prefix, angular.toJson(newJson, false));
	};

	var load = function() {
		return angular.fromJson(storage.getItem(prefix));
	};

	var destroy = function() {
		return storage.removeItem(prefix);
	};

	return {
		save: function(newJson) {
			return save(newJson);
		},

		load: function() {
			return load();
		},

		destroy: function() {
			return destroy();
		},

		init: function() {
			if (!load()) {
				return save({
					key: 'value'
				});
			}

			return load();
		}
	};
}])
services.service('CordovaCameraService', ['$window','$q','ImageFactory','MessageService','$ionicPopup', function ($window,$q,ImageFactory,MessageService,$ionicPopup) {
    var cam,
        cameraOptions,
        init = function() {
            cam = $window.navigator.camera;
            cameraOptions = {
                quality : 100,
                destinationType : cam.DestinationType.FILE_URI,
                sourceType : cam.PictureSourceType.PHOTOLIBRARY,
                /*allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false*/
            };
        };

    this.getImage = function() {
        var q = $q.defer();
        cam.getPicture(function(result) {
            q.resolve(result);
        }, function(result) {
            q.reject(result);
        }, cameraOptions);

        return q.promise;
    };

    // wait until the device is ready to setup everything
    ionic.Platform.ready(init);
}])
services.service('InstagramService', ['$http', '$window', '$q', function ($http, $window, $q) {
    var self = this,
        user,
        accessToken,
        config = {
            clientId: '70a2ae9262fc4805a5571e8036695a4d',
            redirectUri: 'http://www.wikipedia.org/',
            apiUrl: 'https://api.instagram.com/v1/',
            oauthUrl: 'https://instagram.com/oauth/authorize/?',
            scope: 'basic'
        };

    this.isAuthenticated = function () {
        return angular.isDefined(accessToken);
    };

    var fetch = function (url, params) {
        var prms = {
                client_id: config.clientId,
                callback: 'JSON_CALLBACK'
            };
        if (self.isAuthenticated()) {
            prms.access_token = accessToken;
        }
        var cnfg = {
                url: config.apiUrl + url,
                method: 'jsonp',
                responseType: 'json',
                params: angular.extend(prms, params)
            };

        return $http(cnfg);
    };

    var getUrlParameters = function (parameter, staticURL, decode) {
        /*
        Function: getUrlParameters
        Description: Get the value of URL parameters either from 
                     current URL or static URL
        Author: Tirumal
        URL: www.code-tricks.com
       */
       var currLocation = (staticURL.length)? staticURL : window.location.search,
           parArr = currLocation.split('?')[1].split('&'),
           returnBool = true,
           parr;
       
       for (var i = 0; i < parArr.length; i++){
            parr = parArr[i].split('=');
            if(parr[0] == parameter){
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
                returnBool = true;
            }else{
                returnBool = false;            
            }
       }
       
       if(!returnBool) return false;
    };

    var bindAuthEvents = function(authTab) {
        // This function bind the evens to the instagram autentication screen
        // If every thing goes good then load the user information
        // Also handle how the app respond to an authentication error
        var deferred = $q.defer();
        authTab.addEventListener('loadstart', function(e) {
            if (e.url.search('access_token') !== -1) { // access granted
                accessToken = e.url.substr(e.url.search('access_token')+'access_token='.length);
                authTab.close();
                deferred.resolve({
                    authorized: true
                });
            } else if (e.url.search('error') !== -1) { // The user denied access
                authTab.close();
                deferred.reject({
                    error: getUrlParameters('error',e.url,true),
                    errorReason: getUrlParameters('error_reason',e.url,true),
                    errorDescription: getUrlParameters('error_description',e.url,true)
                });
            }
        });
        return deferred.promise;
    };

    this.auth = function() {
        var options = {
                client_id:      config.clientId,
                redirect_uri:   config.redirectUri,
                scope:          config.scope,
                response_type:  'token'
            },
            authParams = '';

        angular.forEach(options, function(value, key) {
            return authParams += key + '=' + value + '&';
        });
        var authUrl = config.oauthUrl + authParams;

        return bindAuthEvents($window.open(authUrl, '_blank', 'location=yes'));
    };

    this.getRecentMedia = function(params) {
        return fetch('users/self/media/recent', params);
    };

    this.getCurrentUser = function() {
        return fetch('users/self');
    };

    this.getRecientTagMedia = function() {
        return fetch('tags/angularjs/media/recent');
    };
}]);
services.service('LocationPrvdr', ['$http', function ($http) {
	var costaRica;

	var init = function() {
		$http.get('js/common/costa-rica.json').
			success(function(data, status, headers, config) {
				costaRica = angular.fromJson(data);
			}).
			error(function(data, status, headers, config) {
				console.log("Costa Rica JSON not found");
			});
	};

	var iterate = function(obj) {
		result = [];
		angular.forEach(obj, function(value, key, obj) {
			result.push({
				id: key,
				name: value.title
			});
		});
		return result;
	};

	this.getProvinces = function() {
		return iterate(costaRica.provincias);
	};

	this.getCantons = function(provinceID) {
		return iterate(costaRica.provincias[provinceID].cantones);
	};

	this.getDistricts = function(provinceID, cantonID) {
		return iterate(costaRica.provincias[provinceID].cantones[cantonID].distritos);
	};

	init();
}])
services.service('MessageService', ['$http', function ($http) {
    // Private stuff
    var messages =          null,
        messageDBlocation = "js/common/messagesDB.json",
        self =              this,
        callbackResult =    function(data, status, headers, config) {
            messages = data ? angular.fromJson(data) : {};
        },
        initMessages =      function() {
            $http.get(messageDBlocation)
                .success(callbackResult)
                .error(callbackResult);
        };
    this.keyToValue =   function(searchCriteria, obj) {
        var resul;
        if (angular.isDefined(obj[searchCriteria])) {
            return obj[searchCriteria];
        }
        for(var key in obj) {
            if( angular.isObject(obj[key]) ){
                var resul = this.keyToValue(searchCriteria, obj[key]);
            }
            if (angular.isDefined(resul)) break;
        }
        return resul;
    };
    // Public stuff
    this.search = function(msjKey) {
        var resul = this.keyToValue(msjKey, messages);
        return resul;
    };
    // Load the messages from JSON file
    initMessages();
}]);
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