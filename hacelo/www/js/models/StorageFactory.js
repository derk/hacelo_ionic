models.factory('StorageFactory', ['$window', function ($window) {
	var storage = $window.localStorage;
	var prefix = "hacelo";

	var addStructure = function() {
		if(!storage.getItem(prefix)){
			saveMarket([]);
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

	var pDeleteNode = function ($index) {
		var market = load().market;
		market.splice($index, 1);
		saveMarket(market);
	};

	var saveMarket = function(newObj) {
		return storage.setItem(prefix, angular.toJson({"market":newObj}));
	};

	var load = function() {
		return angular.fromJson(storage.getItem(prefix));
	};

	var destroy = function() {
		return storage[prefix] = '';
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

		deleteNode: function ($index){
			pDeleteNode($index);
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