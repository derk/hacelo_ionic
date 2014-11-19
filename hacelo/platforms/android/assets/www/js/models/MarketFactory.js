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