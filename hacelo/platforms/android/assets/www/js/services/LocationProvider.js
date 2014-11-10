services.service('LocationPrvdr', ['$http', function ($http) {
	var costaRica;

	var init = function() {
		$http.get('js/common/costa-rica.json').
			success(function(data, status, headers, config) {
				costaRica = angular.fromJson(data);
			}).
			error(function(data, status, headers, config) {
				console.log("Costa Rica JSON not found");
			});
	};

	var iterate = function(obj) {
		result = [];
		angular.forEach(obj, function(value, key, obj) {
			result.push({
				id: key,
				name: value.title
			});
		});
		return result;
	};

	this.getProvinces = function() {
		return iterate(costaRica.provincias);
	};

	this.getCantons = function(provinceID) {
		return iterate(costaRica.provincias[provinceID].cantones);
	};

	this.getDistricts = function(provinceID, cantonID) {
		return iterate(costaRica.provincias[provinceID].cantones[cantonID].distritos);
	};

	init();
}])