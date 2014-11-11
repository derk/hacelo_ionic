commons.constant('PhotoPrintConfig', {
	"products": {
		// here we hold the information related to every single product
		// `photo`, `photo-album` and `poster` will have similar structure
		"photo": {
			"printing-sizes": [
				{
					"real-size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 5,
						"height": 7
					},
					"pixel-size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 500,
							"height": 700,
						},
						"minimum": {
							"width": 375,
							"height": 525,			
						},
					},
					"prices": {
						"first-items": {
							"quantity": 24,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 800
						},
						"additional": {
							"price": 1000
						}
					}
				},
				{
					"real-size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 8.5,
						"height": 11
					},
					"pixel-size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 850,
							"height": 1100,
						},
						"minimum": {
							"width": 637,
							"height": 825,			
						},
					},
					"prices": {
						"first-items": {
							"quantity": 24,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 900
						},
						"additional": {
							"price": 1100
						}
					}
				},
			],
			"coupons": [
				{
					// showed in the UI for visual feedback
					"name": "My discount code",
					// will match what the user entered
					"code": "1234-5678-9012-3456"
				},
			]
		},
		"photo-album": {
			"printing-sizes": [
				{
					"real-size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 3,
						"height": 5
					},
					"pixel-size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 300,
							"height": 500,
						},
						"minimum": {
							"width": 225,
							"height": 375,			
						},
					},
					"prices": {
						"first-items": {
							"quantity": 12,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 600
						},
						"additional": {
							"price": 800
						}
					}
				},
				{
					"real-size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 4,
						"height": 6
					},
					"pixel-size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 400,
							"height": 600,
						},
						"minimum": {
							"width": 300,
							"height": 450,			
						},
					},
					"prices": {
						"first-items": {
							"quantity": 18,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 650.25
						},
						"additional": {
							"price": 850.25
						}
					}
				},
			],
			"coupons": [
				{
					// showed in the UI for visual feedback
					"name": "My discount code",
					// will match what the user entered
					"code": "1234-5678-9012-3456"
				},
			]
		},
		"poster": {
			"printing-sizes": [
				{
					"real-size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 18,
						"height": 11
					},
					"pixel-size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 1800,
							"height": 1100,
						},
						"minimum": {
							"width": 1350,
							"height": 825,			
						},
					},
					"prices": {
						"first-items": {
							"quantity": 5,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 1250
						},
						"additional": {
							"price": 1575
						}
					}
				},
				{
					"real-size": {
						// this measures NEEDS to be in inches.
						// Use dot for decimals like 9.5 X 12
						"width": 11,
						"height": 17
					},
					"pixel-size": {
						// any measure inside here should to be in pixels
						"optimal": {
							"width": 1100,
							"height": 1700,
						},
						"minimum": {
							"width": 825,
							"height": 1275,
						},
					},
					"prices": {
						"first-items": {
							"quantity": 2,
							// use `.` for decimals 
							// for example one dollar with fifty cents = 1.50
							// do not separate big numbers like 20,000.50
							// just use 20000.50
							"price": 1450
						},
						"additional": {
							"price": 1550
						}
					}
				},
			],
			"coupons": [
				{
					// showed in the UI for visual feedback
					"name": "My discount code",
					// will match what the user entered
					"code": "1234-5678-9012-3456"
				},
			]
		},
	}
});