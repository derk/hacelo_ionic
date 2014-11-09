models.factory('StorageFactory', ['$window', function ($window) {
	var storage = $window.localStorage;
	var prefix = "hclDgtl";

	this.setPrefix = function(newPrefix) {
		prefix = newPrefix;
	};

	var save = function(newJson) {
		return storage.setItem(prefix, angular.toJson(newJson, false));
	};

	var load = function() {
		return angular.fromJson(storage.getItem(prefix));
	};

	var destroy = function() {
		return storage.removeItem(prefix);
	};

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