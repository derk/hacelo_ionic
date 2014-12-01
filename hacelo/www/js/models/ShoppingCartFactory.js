/**
 * Created by joseph on 29/11/2014.
 */
models.factory('ShoppingCartFactory', ['StorageService', function (StorageService) {
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
        var getNumberOfItems = function () {
            var numberOfItems = 0;
            for (var i = self.items.length - 1; i >= 0; i--) {
                numberOfItems += self.items[i].quantity;
            }
            return numberOfItems;
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
        this.computeSubTotal = function () {
            var subTotal = 0,
                numberOfItems = getNumberOfItems(),
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
        this.customer = pCustomer || {
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
        this.orders = pOrders || [];

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
        this.removeOrder = function(pOrderRemove){
            var i = angular.element.inArray(pOrderRemove, this.orders);
            if (i !== -1 || i > -1) {
                this.orders = this.orders.splice(i, 1);
            }
        };
    }

    return {
        saveShoppingCart: function(){
            console.log(shoppingCart);
            return StorageService.save(shoppingCart);
        },
        loadShoppingCart: function(){
            /*
            * Load any data stored
            * then check if some shopping cart was already created
            * if not create a new one or load the previews one
            * and finally return the loaded/created shopping cart
            * */
            var lastShoppingCart = StorageService.load();
            if(angular.element.isEmptyObject(lastShoppingCart)){
                shoppingCart = new ShoppingCart();
            } else {
                shoppingCart = new ShoppingCart(lastShoppingCart.customer, lastShoppingCart.orders)
            }
            return shoppingCart;
        },
        setActualOrder: function(pActualOrder){
            actualOrder = pActualOrder;
        },
        getActualOrder: function(){
            return actualOrder;
        }
    };
}]);