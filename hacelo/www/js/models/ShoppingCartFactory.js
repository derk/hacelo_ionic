/**
 * Created by joseph on 29/11/2014.
 */
models.factory('ShoppingCartFactory', ['StorageService', 'ImageFactory', function (StorageService, ImageFactory) {
    var shoppingCart,
        actualOrder;

    function Order (pProductLine, pProduct, pItems){
        // ---
        // PRIVATE ATTRIBUTES.
        // ---
        var self = this;
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
        var restoreImages = function () {
            for (var i = 0; i < pItems.length; i++) {
                self.items.push(ImageFactory.restoreImage(pItems[i]));
            }
        };

        // ---
        // PUBLIC ATTRIBUTES.
        // ---
        this.id = makeId();
        this.productLine = pProductLine;
        this.product = pProduct;
        this.items = [];
        restoreImages(); // ensure that every object loaded has their correct instance

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
        // PRIVATE ATTRIBUTES.
        // ---
        var self = this;
        // ---
        // PRIVATE METHODS.
        // ---
        var restoreOrders = function () {
            if(angular.isDefined(pOrders)){
                for (var i = 0, j = pOrders.length; i < j; i++) {
                    self.orders.push(new Order(pOrders[i].productLine, pOrders[i].product, pOrders[i].items));
                }
            }
        }
        // ---
        // PUBLIC ATTRIBUTES.
        // ---
        this.customer = (angular.isObject(pCustomer))? pCustomer : {
            name: "",
            firstName: "",
            secondSurname: "",
            phone: "",
            address: {
                province: "",
                canton: "",
                district: ""
            }
        };
        this.orders = [];
        restoreOrders(); // ensure that every object loaded has their correct instance

        // ---
        // PUBLIC METHODS.
        // ---
        this.addOrder = function(DummyOrder){
            if((DummyOrder instanceof Order) === false) {return;}
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

        this.computeSubTotal = function () {
            var subTotal = 0;
            for (var i = this.orders.length - 1; i >= 0; i--) {
                subTotal += this.orders[i].computeSubTotal();
            }
            return subTotal;
        }
    }

    return {
        saveShoppingCart: function(){
            return StorageService.save(shoppingCart);
        },
        loadShoppingCart: function(){
            /*
            * Load any data stored
            * then check if some shopping cart was already created
            * if not create a new one and save it or load the previews one
            * and finally return the loaded/created shopping cart
            * */
            var lastShoppingCart;

            if (angular.isUndefined(shoppingCart)) {
                lastShoppingCart = StorageService.load();
                if(!angular.isObject(lastShoppingCart)){
                    shoppingCart = new ShoppingCart();
                    this.saveShoppingCart();
                } else {
                    shoppingCart = new ShoppingCart(lastShoppingCart.customer, lastShoppingCart.orders);
                }
            }
            return shoppingCart;
        },
        removeOrder: function (pOrderId) {
            shoppingCart.removeOrder(pOrderId);
            this.saveShoppingCart();
        },
        setActualOrder: function(pActualOrder){
            actualOrder = pActualOrder;
        },
        getActualOrder: function(){
            return actualOrder;
        }
    };
}]);