commons.constant('PhotoPrintConfig', {
	"products": {
		// here we hold the information related to every single product
		// `photo`, `photo_album` and `poster` will have similar structure
		"Fotografias": {
			"name":"Fotografias",
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
			"name":"Cuadradas",
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
			"name":"Photobook",
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
			"name":"Marco de Madera",
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
			"name":"Photostrips",
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
			"name":"Poster",
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
			"name":"Gran Formato",
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