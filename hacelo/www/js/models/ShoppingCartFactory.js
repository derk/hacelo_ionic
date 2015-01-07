/**
 * Created by joseph on 29/11/2014.
 */
models.factory('ShoppingCartFactory', ['StorageService', 'ImageFactory', function (StorageService, ImageFactory) {
    // ---
    // PRIVATE ATTRIBUTES.
    // ---
    var shoppingCart;

    // ---
    // APPLICATION OBJECT MODELS
    // ---
    function Order (pProductLine, pProduct, pItems){
        // ---
        // PRIVATE METHODS.
        // ---
        var makeId = function(){
            // creates unique ID's for orders
            var id = '';
            for (var i = 5 - 1; i >= 0; i--) {
                var rand = (((1 + Math.random()) * 0x10000) | 0).toString(16);
                id += rand;
                id += (i>0)?'-':'';
            }
            return id;
        };

        // ---
        // PUBLIC ATTRIBUTES.
        // ---
        this.id = makeId();
        this.productLine = pProductLine;
        this.product = pProduct;
        this.items = pItems;

        // ---
        // PUBLIC METHODS.
        // ---
        this.getQuantity = function () {
            var numberOfItems = 0;
            for (var i = this.items.length - 1; i >= 0; i--) {
                numberOfItems += this.items[i].quantity;
            }
            return numberOfItems;
        };

        this.computeSubTotal = function () {
            var subTotal = 0,
                numberOfItems = this.getQuantity(),
                firstItems = this.product.prices.first_items,
                additionalItem = this.product.prices.additional;

            if (numberOfItems <= firstItems.quantity) {
                subTotal = firstItems.price;
            } else if (numberOfItems > firstItems.quantity) {
                var numberOfAdditionalItems = numberOfItems - firstItems.quantity;
                subTotal = firstItems.price + (numberOfAdditionalItems * additionalItem.price);
            }

            return subTotal;
        };
    }

    function ShoppingCart(pCustomer, pOrders) {
        // ---
        // PUBLIC ATTRIBUTES.
        // ---
        this.customer = (angular.isObject(pCustomer))? pCustomer : {
            name: "",
            firstName: "",
            secondSurname: "",
            phone: "",
            email: "",
            address: {
                province: "",
                canton: "",
                district: "",
                exacta: ""
            }
        };
        this.orders = pOrders || [];

        this.travel = {
            direction :{
                canton : "",
                distrito : "",
                provincia : "",
                exacta: ""
            }, 
            price : 0
        };

        this.payment = {
            card: "",
            month: "",
            year: "",
            type: ""
        };

        // ---
        // PUBLIC METHODS.
        // ---
        this.addOrder = function(DummyOrder){
            if( (DummyOrder instanceof Order) === false ) {return;}

            this.orders.push(DummyOrder);
            return this.orders[this.orders.length-1];
        };

        this.getDummyOrder = function(pProductLine, pProduct, pItems){
            return new Order(pProductLine, pProduct, pItems);
        };

        this.removeOrder = function(pOrderId){
            for (var i = this.orders.length - 1; i >= 0; i--) {
                if (this.orders[i].id === pOrderId) {
                    this.orders.splice(i,1);
                }
            }
        };

        this.getWeight = function(){
            var weight = 0; 
            for (var i = this.orders.length - 1; i >= 0; i--) {
                weight = this.orders[i].product.weight + weight;
            }

            weight = weight/1000;

            if(weight < 1){
                weight = 1;
            }

            return weight;
        };

        this.computeSubTotal = function () {
            var subTotal = 0;
            for (var i = this.orders.length - 1; i >= 0; i--) {
                subTotal += this.orders[i].computeSubTotal();
            }
            return subTotal;
        };
    }

    // ---
    // FACTORY HELPER METHODS.
    // ---
    var restoreImages = function (pImages2Restore) {
        var restored = [];

        for (var i = 0, j = pImages2Restore.length; i < j; i++) {
            restored.push(ImageFactory.restoreImage(pImages2Restore[i]));
        }

        return restored;
    };

    var restoreOrders = function (pOrders2Restore) {
        var restored = [];

        for (var i = 0, j = pOrders2Restore.length; i < j; i++) {
            restored.push(
                new Order(
                    pOrders2Restore[i].productLine,
                    pOrders2Restore[i].product,
                    restoreImages(pOrders2Restore[i].items)
                )
            );
        }

        return restored;
    };

    return {
        saveShoppingCart: function(){
            return StorageService.save(shoppingCart);
        },
        loadShoppingCart: function(){
            /*
            * Load any data stored
            * then check if some shopping cart was already created
            * if yes load it or create a new one and save it (for future usage)
            * and finally return the loaded/created shopping cart
            * */
            var lastShoppingCart,
                restoredOrders;

            if (angular.isUndefined(shoppingCart)) {
                lastShoppingCart = StorageService.load();

                if(angular.isObject(lastShoppingCart)){
                    restoredOrders = restoreOrders(lastShoppingCart.orders);
                    shoppingCart = new ShoppingCart(lastShoppingCart.customer, restoredOrders);
                } else {
                    shoppingCart = new ShoppingCart();
                    this.saveShoppingCart();
                }
            }
            return shoppingCart;
        },

        removeOrder: function (pOrderId) {
            shoppingCart.removeOrder(pOrderId);
            this.saveShoppingCart();
        },

        savePayment : function(pCard, pMonth, pYear, pType){
            shoppingCart.payment = {
                card: pCard,
                month: pMonth,
                year: pYear,
                type: pType
            };

            this.saveShoppingCart();
        },

        saveTravel : function(money, canton, distrito, provincia, exacta){
            shoppingCart.travel = {
                price : money
            };
  
            this.saveShoppingCart();
        },

        saveCustomer : function(name, secondSurname, phone, email, province, canton, district, exacta){
            shoppingCart.customer = {
                name: name,
                firstName: name,
                secondSurname: secondSurname,
                phone: phone,
                email: email,
                address: {
                    province: province,
                    canton: canton,
                    district: district,
                    exacta: exacta
                }
            };
            this.saveShoppingCart();
        }
    };
}]);