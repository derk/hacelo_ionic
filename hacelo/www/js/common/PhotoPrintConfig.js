commons.constant('PhotoPrintConfig', {
    "products": [
        /*
         * here we hold the information related to every product line product.
         * And inside of it all the products for that line.
         * */
        {
            id: "pictures",
            "name": "Fotografias",
            "images": "img/fotografias/PORTADA_FOTOGRAFIAS/portada_fotografia.png",
            "products": [
                {
                    "name": "4x6",
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
                            "height": 700
                        },
                        "minimum": {
                            "width": 300,
                            "height": 450,
                            // 1.5 = horizontal = marco = fut, 0.5 = vertical = puerta
                            "aspect": "portrait"
                        }
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
                    },
                    "images": "img/fotografias/6X4/6X4_Categoria/6X4_categoria.png",
                    "slider": [
                        {   "images":"img/fotografias/6X4/4_4/1.png"},
                        {   "images":"img/fotografias/6X4/4_4/2.png"},
                        {   "images":"img/fotografias/6X4/4_4/3.png"},
                        {   "images":"img/fotografias/6X4/4_4/4.png"}
                    ],
                    "weight": 120
                },
                {
                    "name": "5x7",
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
                            "height": 700
                        },
                        "minimum": {
                            "width": 375,
                            "height": 525,
                            "aspect": "portrait"
                        }
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
                    },
                    "images": "img/fotografias/7X5/7X5_Categoria/7X5_categoria.png",
                    "slider": [
                        {   "images":"img/fotografias/7X5/4_4/1.png"},
                        {   "images":"img/fotografias/7X5/4_4/2.png"},
                        {   "images":"img/fotografias/7X5/4_4/3.png"},
                        {   "images":"img/fotografias/7X5/4_4/4.png"}
                    ],
                    "weight": 120
                },
                {
                    "name": "8x10",
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
                            "height": 700
                        },
                        "minimum": {
                            "width": 600,
                            "height": 750,
                            "aspect": "portrait"
                        }
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
                    },
                    "images": "img/fotografias/10X8/10X8_Categoria/10X8_categoria.png",
                    "slider": [
                        {   "images":"img/fotografias/10X8/4_4/1.png"},
                        {   "images":"img/fotografias/10X8/4_4/2.png"},
                        {   "images":"img/fotografias/10X8/4_4/3.png"},
                        {   "images":"img/fotografias/10X8/4_4/4.png"}
                    ],
                    "weight": 120
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "quadrate",
            "name": "Cuadradas",
            "images": "img/cuadradas/PORTADA_CUADRADAS/portada_cuadradas.png",
            "products": [
                {
                    "name": "4x4",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 4,
                        "height": 4
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 500,
                            "height": 500
                        },
                        "minimum": {
                            "width": 300,
                            "height": 300,
                            "aspect": "square"
                        }
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
                    },
                    "images": "img/cuadradas/4X4/4X4_Categoria/4X4_categoria.png",
                    "slider": [
                        {   "images":"img/cuadradas/4X4/4_4/1.png"},
                        {   "images":"img/cuadradas/4X4/4_4/2.png"},
                        {   "images":"img/cuadradas/4X4/4_4/3.png"},
                        {   "images":"img/cuadradas/4X4/4_4/4.png"}
                    ],
                    "weight": 120
                },
                {
                    "name": "8x8",
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
                            "height": 600
                        },
                        "minimum": {
                            "width": 600,
                            "height": 600,
                            "aspect": "square"
                        }
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
                    },
                    "images": "img/cuadradas/8X8/8X8_Categoria/8x8_categoria.png",
                    "slider": [
                        {   "images":"img/cuadradas/8X8/4_4/1.png"},
                        {   "images":"img/cuadradas/8X8/4_4/2.png"},
                        {   "images":"img/cuadradas/8X8/4_4/3.png"},
                        {   "images":"img/cuadradas/8X8/4_4/4.png"}
                    ],
                    "weight": 120
                },
                {
                    "name": "10x10",
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
                            "height": 600
                        },
                        "minimum": {
                            "width": 750,
                            "height": 750,
                            "aspect": "square"
                        }
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
                    },
                    "images": "img/cuadradas/10X10/10X10_Categoria/10X10_categoria.png",
                    "slider": [
                        {   "images":"img/cuadradas/10X10/4_4/1.png"},
                        {   "images":"img/cuadradas/10X10/4_4/2.png"},
                        {   "images":"img/cuadradas/10X10/4_4/3.png"},
                        {   "images":"img/cuadradas/10X10/4_4/4.png"}
                    ],
                    "weight": 120
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "photobook",
            "name": "Photobook",
            "images": "img/cuadradas/PORTADA_CUADRADAS/portada_cuadradas.png",
            "message":"",
            "cover":"",
            "mandatory":true,
            "products": [
                {
                    "name": "8.5x11",
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
                            "height": 500
                        },
                        "minimum": {
                            "width": 637,
                            "height": 825,
                            "aspect": "portrait"

                        }
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
                    },
                    "images": "img/cuadradas/10X10/10X10_Categoria/10X10_categoria.png",
                    "slider": [
                        {   "images":"img/cuadradas/10X10/4_4/1.png"},
                        {   "images":"img/cuadradas/10X10/4_4/2.png"},
                        {   "images":"img/cuadradas/10X10/4_4/3.png"},
                        {   "images":"img/cuadradas/10X10/4_4/4.png"}
                    ],
                    "weight": 120
                },
                {
                    "name": "12x9",
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
                            "height": 600
                        },
                        "minimum": {
                            "width": 900,
                            "height": 675,
                            "aspect": "landscape"
                        }
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
                    },
                    "images": "img/cuadradas/10X10/10X10_Categoria/10X10_categoria.png",
                    "slider": [
                        {   "images":"img/cuadradas/10X10/4_4/1.png"},
                        {   "images":"img/cuadradas/10X10/4_4/2.png"},
                        {   "images":"img/cuadradas/10X10/4_4/3.png"},
                        {   "images":"img/cuadradas/10X10/4_4/4.png"}
                    ],
                    "weight": 120
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "woodFrame",
            "name": "Marco de Madera",
            "images": "img/marcos/14X20/14X20_Categoria/14X20_categoria.png",
            "products": [
                {
                    "name": "4x4",
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
                            "height": 500
                        },
                        "minimum": {
                            "width": 300,
                            "height": 300,
                            "aspect": "square"
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
                    },
                    "images": "img/marcos/4X4/4X4_Categoria/4X4_categoria.png",
                    "slider": [
                        {   "images":"img/marcos/4X4/4_4/1.png"},
                        {   "images":"img/marcos/4X4/4_4/2.png"},
                        {   "images":"img/marcos/4X4/4_4/3.png"},
                        {   "images":"img/marcos/4X4/4_4/4.png"}
                    ],
                    "weight": 500
                },
                {
                    "name": "11x17",
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
                            "height": 600
                        },
                        "minimum": {
                            "width": 825,
                            "height": 1275,
                            "aspect": "portrait"
                        }
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
                    },
                    "images": "img/marcos/11X17/11X17_Categoria/11X17_categoria.png",
                    "slider": [
                        {   "images":"img/marcos/11X17/4_4/1.png"},
                        {   "images":"img/marcos/11X17/4_4/2.png"},
                        {   "images":"img/marcos/11X17/4_4/3.png"},
                        {   "images":"img/marcos/11X17/4_4/4.png"}
                    ],
                    "weight": 2000
                },
                {
                    "name": "14x20",
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
                            "height": 600
                        },
                        "minimum": {
                            "width": 1050,
                            "height": 1500,
                            "aspect": "portrait"
                        }
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
                    },
                    "images": "img/marcos/14X20/14X20_Categoria/14X20_categoria.png",
                    "slider": [
                        {   "images":"img/marcos/14X20/4_4/1.png"},
                        {   "images":"img/marcos/14X20/4_4/2.png"},
                        {   "images":"img/marcos/14X20/4_4/3.png"},
                        {   "images":"img/marcos/14X20/4_4/4.png"}
                    ],
                    "weight": 2500
                },
                {
                    "name": "20x29",
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
                            "height": 600
                        },
                        "minimum": {
                            "width": 1500,
                            "height": 2175,
                            "aspect": "portrait"
                        }
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
                    },
                    "images": "img/marcos/20X29/20X29_Categoria/20X29_categoria.png",
                    "slider": [
                        {   "images":"img/marcos/20X29/4_4/1.png"},
                        {   "images":"img/marcos/20X29/4_4/2.png"},
                        {   "images":"img/marcos/20X29/4_4/3.png"},
                        {   "images":"img/marcos/20X29/4_4/4.png"}
                    ],
                    "weight": 4200
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "photostrips",
            "name": "Photostrips",
            "isStrip":"true",
            "images": "img/photostrips/Photostrips_Categoria/photostrips_categoria.png",
            "products": [
                {
                    "name": "4.25x17.78",
                    "real_size": {
                        // this measures NEEDS to be in inches.
                        // Use dot for decimals like 9.5 X 12
                        "width": 4.25,
                        "height": 17.78
                    },
                    "pixel_size": {
                        // any measure inside here should to be in pixels
                        "optimal": {
                            "width": 408,
                            "height": 1706
                        },
                        "minimum": {
                            "width": 333,
                            "height": 1333,
                            "aspect": "portrait"
                        }
                    },
                    "prices": {
                        "first_items": {
                            "quantity": 36,
                            // use `.` for decimals
                            // for example one dollar with fifty cents = 1.50
                            // do not separate big numbers like 20,000.50
                            // just use 20000.50
                            "price": 4999
                        },
                        "additional": {
                            "price": 1000
                        }
                    },
                    "images": "img/photostrips/Photostrips_Categoria/photostrips_categoria.png",
                    "slider": [
                        {   "images":"img/photostrips/4_4/1.png"},
                        {   "images":"img/photostrips/4_4/2.png"},
                        {   "images":"img/photostrips/4_4/3.png"},
                        {   "images":"img/photostrips/4_4/4.png"}
                    ],
                    "weight": 120
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "poster",
            "name": "Poster",
            "images": "img/poster/Poster_Categoria/poster_categoria.png",
            "products": [
                {
                    "name": "20.1x29.1",
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
                            "height": 1100
                        },
                        "minimum": {
                            "width": 1507,
                            "height": 2182,
                            "aspect": "portrait"
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
                    },
                    "images": "img/poster/Poster_Categoria/poster_categoria.png",
                    "slider": [
                        {   "images":"img/poster/4_4/1.png"},
                        {   "images":"img/poster/4_4/2.png"},
                        {   "images":"img/poster/4_4/3.png"},
                        {   "images":"img/poster/4_4/4.png"}
                    ],
                    "weight": 120
                }
            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        },

        {
            id: "largeFormat",
            "name": "Gran Formato",
            "images": "img/gran_formato/20X29/20X29_Categoria/20X29_categoria.png",
            "products": [
                {
                    "name": "11x17",
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
                            "height": 1100
                        },
                        "minimum": {
                            "width": 825,
                            "height": 1275,
                            "aspect": "portrait"
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
                    },
                    "images": "img/gran_formato/11X17/11X17_Categoria/11X17_categoria.png",
                    "slider": [
                        {   "images":"img/gran_formato/11X17/4_4/1.png"},
                        {   "images":"img/gran_formato/11X17/4_4/2.png"},
                        {   "images":"img/gran_formato/11X17/4_4/3.png"},
                        {   "images":"img/gran_formato/11X17/4_4/4.png"}
                    ],
                    "weight": 120
                },
                {
                    "name": "14x20",
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
                            "height": 1500
                        },
                        "minimum": {
                            "width": 1050,
                            "height": 1500,
                            "aspect": "portrait"
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
                    },
                    "images": "img/gran_formato/14X20/14X20_Categoria/14X20_categoria.png",
                    "slider": [
                        {   "images":"img/gran_formato/14X20/4_4/1.png"},
                        {   "images":"img/gran_formato/14X20/4_4/2.png"},
                        {   "images":"img/gran_formato/14X20/4_4/3.png"},
                        {   "images":"img/gran_formato/14X20/4_4/4.png"}
                    ],
                    "weight": 120
                },
                {
                    "name": "20.1 x 29.1",
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
                            "height": 1500
                        },
                        "minimum": {
                            "width": 1507,
                            "height": 2181,
                            "aspect": "portrait"
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
                    },
                    "images": "img/gran_formato/20X29/20X29_Categoria/20X29_categoria.png",
                    "slider": [
                        {   "images":"img/gran_formato/20X29/4_4/1.png"},
                        {   "images":"img/gran_formato/20X29/4_4/2.png"},
                        {   "images":"img/gran_formato/20X29/4_4/3.png"},
                        {   "images":"img/gran_formato/20X29/4_4/4.png"}
                    ],
                    "weight": 120
                }

            ],
            "coupons": [
                {
                    // showed in the UI for visual feedback
                    "name": "My discount code",
                    // will match what the user entered
                    "code": "1234_5678_9012_3456"
                }
            ]
        }
    ]
});