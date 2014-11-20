models.factory('Market', ['$filter','SelectedImagesFactory', function ($filter,SelectedImagesFactory) {
	/**
	 * A simple service that returns the array of selected images.
	 */
     var model;

     function insertInfo(obj, categoryName, subCategoryName, size, quantity, price){
        model = {
            'order_id': Math.floor((Math.random() * 100) + 1),
            'category':categoryName,
            'subCategory':subCategoryName,
            'size':size.width+'x'+size.height,
            'items':obj,
            'quantity':quantity,
            'price':price
        };
     }

	return {
		
        insertMarket : function(model) {
            var category = SelectedImagesFactory.getCategory(),
                setting = SelectedImagesFactory.getSettings(),
                promise = false,
                price = 0,
                quantity = 0,
                totalPrice = 0;

            angular.forEach(model, function(value){
                quantity = quantity + value.quantity;
            });

            if(quantity <= setting.prices.first_items.quantity){
                price = price = setting.prices.first_items.price;;
            } else {
                var d = quantity - setting.prices.first_items.quantity;
                price = setting.prices.first_items.price + (d * setting.prices.additional.price);
            }

            insertInfo(model, category.name, setting.name, setting.real_size, quantity, price);

            return true;
        },

        getCurrentModel: function() {
            return model;
        }

	};
}]);