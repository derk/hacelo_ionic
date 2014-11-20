models.factory('StorageFactory', ['$window', function ($window) {
	var storage = $window.localStorage;
	var prefix = "hacelo";

	var addStructure = function() {
		if(!storage.getItem(prefix)){
			saveMarket({"market":[]});
		}
	};

	this.setPrefix = function(newPrefix) {
		prefix = newPrefix;
	};

	var save = function(newObj) {
		var model = load(),
			json = null;
	
		if(model.hasOwnProperty('market')){
			model.market.push(newObj);
			storage.setItem(prefix, angular.toJson(model));
			return true;
		} else {
			return false;
		}
	};

	var saveMarket = function(newJson) {
		return storage.setItem(prefix, angular.toJson(newJson));
	};

	var load = function() {
		return angular.fromJson(storage.getItem(prefix));
	};

	var destroy = function() {
		return storage.removeItem(prefix);
	};

	addStructure();


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